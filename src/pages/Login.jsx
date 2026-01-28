import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    // Function triggered when login form is submitted
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Authenticate user using Firebase Authentication
            await signInWithEmailAndPassword(auth, email, password);
            // Show success message
            alert("Login successful");
            navigate("/dashboard");  // Redirect user to Dashboard page after successful login
        }
        catch (error) {
            // Show error message if authentication fails
            alert("Invalid email or password");
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-card" onSubmit={handleLogin}>
                <h2>Welcome Back</h2>
                <p className="subtitle">Login to your account</p>

                <div className="input-group">
                    <input type="email" required onChange={(e) => setEmail(e.target.value)} />
                    <label>Email</label>
                </div>

                <div className="input-group">
                    <input type="password" required onChange={(e) => setPassword(e.target.value)} />
                    <label>Password</label>
                </div>

                <button className="signup-btn">Login</button>

                <p className="footer-text">
                    New user? <Link to="/signup">Signup</Link>
                </p>
            </form>
        </div>
    );
}
export default Login;