import React from 'react';

const Register = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h2>Register</h2>
            <form>
                <div>
                    <label>Username:</label><br />
                    <input type="text" name="username" />
                </div>
                <div>
                    <label>Email:</label><br />
                    <input type="email" name="email" />
                </div>
                <div>
                    <label>Password:</label><br />
                    <input type="password" name="password" />
                </div>
                <div>
                    <label>Confirm Password:</label><br />
                    <input type="password" name="confirmPassword" />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
