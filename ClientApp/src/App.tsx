import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
import Admin from './components/Admin';
import RegisterPICAndCompany from './components/RegisterPICAndCompany';
import Form from './components/Form';
import { FooterPublicRoutes } from './components/layout/Footer';
import { Header } from './components/layout/public-routes/Header';
import { SideMenuPublicRoute } from './components/layout/SideMenu';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

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
    const [mobileMenu, setMobileMenu] = useState<boolean>(false);

    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    minHeight: '100vh',
                    backgroundColor: '#f5f5f5'  
                }}>
                    <Header mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
                    {mobileMenu && <div style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,.6784313725490196)',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        zIndex: 1
                    }}></div>}
                    <SideMenuPublicRoute mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
                    <div style={{ flex: '1' }}>
                        <Routes>
                            {/* Public routes */}
                            <Route path="/" element={<Welcome />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            
                            {/* Protected routes */}
                            <Route path="/admin" element={
                                <ProtectedRoute requireAdmin={true}>
                                    <Admin />
                                </ProtectedRoute>
                            } />
                            <Route path="/registerPICAndCompany" element={
                                <ProtectedRoute>
                                    <RegisterPICAndCompany />
                                </ProtectedRoute>
                            } />
                            <Route path="/Form" element={
                                <ProtectedRoute>
                                    <Form />
                                </ProtectedRoute>
                            } />
                        </Routes>
                    </div>
                    <FooterPublicRoutes />
                </div>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;
