import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import "./Dashboard.css";


function Dashboard() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);

    // useEffect runs once when component mounts
    useEffect(() => {
        // This checks whether the user is logged in or not
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            // If user is not logged in, redirect to Login page
            if (!user) {
                navigate("/");
                return;
            }

            //  Fetch user data from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));

            // If user document exists, extract and set username
            if (userDoc.exists()) {
                setUsername(userDoc.data().name);
            }

            // Stop loading after data is fetched
            setLoading(false);
        });

        // Cleanup function to unsubscribe from auth listener
        return () => unsubscribe();

    }, [navigate]);   // Dependency array ensures effect runs once

    // Function to log the user out
    const logout = async () => {
        await signOut(auth);
        navigate("/");  // Redirect user to Login page after logout
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <h1>Welcome, {username} </h1>
                <p className="dashboard-text">
                    You have successfully logged in.
                </p>

                <button className="logout-btn" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;