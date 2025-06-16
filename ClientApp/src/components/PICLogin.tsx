import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { loginStyle } from "../styles/container/login";
import { useNavigate } from "react-router-dom";

interface LoginError {
    email?: string;
    password?: string;
    general?: string;
}

export const PICLogin: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<LoginError>({});

    const validateForm = (): boolean => {
        const newErrors: LoginError = {};
        
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (): Promise<void> => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        console.log('Attempting login with:', { email }); // Don't log password for security

        try {
            console.log('Making request to:', '/api/PIC/login');
            const response = await fetch('/api/PIC/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', Object.fromEntries(response.headers.entries()));

            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                console.log('Login successful, storing PIC data');
                localStorage.setItem('picData', JSON.stringify(data.pic));
                navigate('/dashboard');
            } else {
                console.error('Login failed:', data);
                setErrors({
                    general: data.message || 'Invalid email or password'
                });
            }
        } catch (error) {
            console.error('Login error details:', {
                error,
                message: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined
            });
            setErrors({
                general: 'An error occurred during login. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack sx={loginStyle.contentStack}>
            <Box sx={loginStyle.contentStackBox}>
                <Typography sx={loginStyle.contentStackBoxTypography1}>
                    Welcome to Binus Career
                </Typography>
                <Typography
                    sx={{
                        textAlign: 'justify',
                        fontSize: '16px',
                        lineHeight: 1.8,
                        color: '#fff',
                        maxWidth: '600px',
                        marginTop: '10px',
                        marginBottom: '20px',
                        fontFamily: 'Segoe UI'
                    }}
                >
                    BINUS CAREER is an authorized job-portal established by Bina Nusantara University.
                    Our aim is to accomplish Bina Nusantara Quality Targets and to assist BINUSIANS
                    in seeking employment & better career chances in accordance to each preferences and abilities.
                </Typography>

                <Box sx={{ 
                    marginTop: '20px', 
                    width: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                }}>
                    {errors.general && (
                        <Typography color="error" sx={{ mb: 2 }}>
                            {errors.general}
                        </Typography>
                    )}
                    
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors({ ...errors, email: undefined, general: undefined });
                        }}
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{
                            ...loginStyle.modalLoginInput,
                            backgroundColor: 'white',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: errors.email ? 'error.main' : 'rgba(0, 0, 0, 0.23)',
                                },
                            },
                        }}
                    />

                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors({ ...errors, password: undefined, general: undefined });
                        }}
                        error={!!errors.password}
                        helperText={errors.password}
                        sx={{
                            ...loginStyle.modalLoginInput,
                            backgroundColor: 'white',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: errors.password ? 'error.main' : 'rgba(0, 0, 0, 0.23)',
                                },
                            },
                        }}
                    />

                    <LoadingButton
                        variant="contained"
                        fullWidth
                        loading={loading}
                        onClick={handleLogin}
                        sx={{
                            height: '45px',
                            backgroundColor: '#FFA500',
                            '&:hover': {
                                backgroundColor: '#CC8400',
                            },
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            textTransform: 'none',
                            borderRadius: '4px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            marginTop: '10px'
                        }}
                    >
                        Login
                    </LoadingButton>
                </Box>
            </Box>

            <Box
                component="img"
                src="/assets/image/ilustrasi-login.png"
                alt="Login Illustration"
                sx={loginStyle.contentStackBoxImg}
            />
        </Stack>
    );
};

export default PICLogin; 