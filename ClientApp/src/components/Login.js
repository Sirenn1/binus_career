import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h2>Login</h2>
            <form>
                <div>
                    <label>Username:</label><br />
                    <input type="text" name="username" />
                </div>
                <div>
                    <label>Password:</label><br />
                    <input type="password" name="password" />
                </div>
                <button type="submit">Login</button>
            </form>

            <p style={{ marginTop: '1rem' }}>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;
