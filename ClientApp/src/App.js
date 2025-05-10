import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Login from './components/Login';
import Register from './components/Register';
import LoginContent from './components/Welcome';

function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginContent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

        </Routes>
    );
}

export default App;
