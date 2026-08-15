import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    const submitData = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await axios.post(
                "https://todo-backend-ocq4.onrender.com/api/auth/login",
                {
                    email,
                    password
                }
            );

            console.log("LOGIN RESPONSE:", response.data);

            // Save token
            localStorage.setItem("token", response.data.token);

            // Save user
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            // Redirect
            navigate("/todo");

        } catch (error) {
            console.log("LOGIN ERROR:", error.response?.data);

            setError(
                error.response?.data?.message || "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div clasName="auth-container">
            <div className="auth-box">
                <h1> Login Account</h1>
                <form onSubmit={submitData}>
                    <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    {error && (
                        <p className="error">{error}</p>
                    )}
                    <button type="submit">{loading ? "Logging in" : "Login"}</button>
                </form>

                <p>Dont have an account ? {""} <Link to="/register"> Register </Link></p>
            </div>
        </div>
    )
}
export default Login;