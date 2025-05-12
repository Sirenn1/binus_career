import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

axios.defaults.baseURL = 'https://localhost:44453';

export default function Register() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const apiEndpoint = "/api/Auth/register";

        try {
            console.log("Sending request to:", axios.defaults.baseURL + apiEndpoint);
            console.log("Request data:", form);

            const res = await axios.post(apiEndpoint, form, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            alert(res.data.message);
        } catch (err) {
            console.error("Registration error:", err);

            if (err.response?.status === 404) {
                setError(`Endpoint not found: ${apiEndpoint}. Check your backend API routes.`);
            } else {
                const errorMsg = err.response?.data?.message ||
                    err.response?.data ||
                    err.message ||
                    "Registration failed";

                setError(errorMsg);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>

                {error && <div className="error-message">{error}</div>}
            </form>

            <div className="login-link">
                Already have an account? <Link to="/login">Login here</Link>
            </div>
        </div>
    );
}