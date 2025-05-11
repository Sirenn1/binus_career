import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/auth/login", form);
            alert(res.data.message);
        } catch (err) {
            alert("Login failed: " + err.response.data);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button type="submit">Login</button>
            </form>

            <div>
                Don't have an account? <Link to="/register">Register here</Link>
            </div>
        </div>
    );
}
