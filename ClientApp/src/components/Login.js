import React from 'react';

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
        </div>
    );
};

export default Login;
