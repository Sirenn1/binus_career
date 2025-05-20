import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
import Admin from './components/Admin';
import RegisterPICAndCompany from './components/RegisterPICAndCompany';
import Form from './components/Form';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#028ed5', 
    },
    secondary: {
      main: '#f48d0c', 
    },
  },
});

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/registerPICAndCompany" element={<RegisterPICAndCompany />} />
                <Route path="/Form" element={<Form />} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;
