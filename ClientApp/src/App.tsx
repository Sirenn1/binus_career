import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Admin from './components/Admin';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    );
};

export default App;
