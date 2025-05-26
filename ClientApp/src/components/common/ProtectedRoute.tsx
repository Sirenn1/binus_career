import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { CircularProgress, Box } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireGuest?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireGuest = false,
}) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 64px)', // Account for header height
          width: '100%',
          backgroundColor: '#f5f5f5'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // For guest-only routes (login, register)
  if (requireGuest) {
    return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
  }

  // For protected routes (default behavior)
  if (requireAuth) {
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" state={{ from: location }} replace />;
  }

  // For public routes
  return <>{children}</>;
}; 