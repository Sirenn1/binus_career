import React, { useState, FormEvent } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

type UserType = {
    id: number;
    username: string;
    email: string;
    isAdmin: boolean;
    isApproved: boolean;
};

type LoginResponse = {
    user: UserType;
    message: string;
};

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post<LoginResponse>("/api/auth/login", form);
            const user = res.data.user;

            if (!user.isApproved) {
                alert("Your account is not approved yet.");
                return;
            }

            if (user.isAdmin) {
                navigate("/admin");
            } else {
                navigate("/home");
            }
        } catch (err: any) {
            alert("Login failed: " + (err.response?.data || err.message));
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, username: e.target.value }))
                    }
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, password: e.target.value }))
                    }
                />
                <button type="submit">Login</button>
            </form>

            <div>
                Don't have an account? <Link to="/register">Register here</Link>
            </div>
        </div>
    );
}
