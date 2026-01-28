
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../Firebase";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";


function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const navigate = useNavigate();

    // Function that runs when signup form is submitted
    const handleSignup = async (e) => {
        e.preventDefault();

        //  Validation: Check if any field is empty
        if (!name || !email || !password || !mobile) {
            alert("All fields are required");
            return;
        }

        // Validation: Password length must be at least 6 characters
        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        // Validation: Indian mobile number format
        if (!/^[6-9]\d{9}$/.test(mobile)) {
            alert("Enter valid mobile number");
            return;
        }

        try {
            // Create user account using Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;


            // Save additional user details in Firestore database
            await setDoc(doc(db, "users", user.uid), {
                name,
                email,
                mobile,
                createdAt: new Date(),  // Timestamp for account creation
            });

            // Success message after signup
            alert("Signup successful ");
            navigate("/");   // Redirect user to Login page
        }

        catch (error) {
            // Display error message if signup fail
            alert(error.message);
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-card" onSubmit={handleSignup}>
                <h2>Create Account</h2>
                <p className="subtitle">Sign up to get started</p>

                <div className="input-group">
                    <input type="text" required onChange={(e) => setName(e.target.value)} />
                    <label>Name</label>
                </div>

                <div className="input-group">
                    <input type="email" required onChange={(e) => setEmail(e.target.value)} />
                    <label>Email</label>
                </div>

                <div className="input-group">
                    <input type="password" required onChange={(e) => setPassword(e.target.value)} />
                    <label>Password</label>
                </div>

                <div className="input-group">
                    <input type="text" required onChange={(e) => setMobile(e.target.value)} />
                    <label>Mobile Number</label>
                </div>

                <button className="signup-btn">Signup</button>

                <p className="footer-text">
                    Already have an account? <Link to="/">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;