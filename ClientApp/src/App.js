import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Use Routes and Route for routing
import Login from './components/Login';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} /> {/* Default route for Login */}
        </Routes>
    );
}

export default App;
