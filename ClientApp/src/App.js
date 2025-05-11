import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

        </Routes>
    );
}

export default App;
