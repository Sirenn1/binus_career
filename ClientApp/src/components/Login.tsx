import React, { useState, FormEvent } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ModalAlert } from "./common/modal-alert";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material";

type UserType = {
    id: number;
    username: string;
    email: string;
    isAdmin: boolean;
    isApproved: boolean;
};

type LoginResponse = {
    user: UserType;
    message: string;
};

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showNotApprovedModal, setShowNotApprovedModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorModal, setShowErrorModal] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const res = await axios.post<LoginResponse>("/api/auth/login", form);
            const user = res.data.user;

            if (!user.isApproved) {
                setShowNotApprovedModal(true);
                setLoading(false);
                return;
            }

            if (user.isAdmin) {
                navigate("/admin");
            } else {
                navigate("/registerPICAndCompany");
            }
        } catch (err: any) {
            setErrorMessage("Login failed: " + (err.response?.data || err.message));
            setShowErrorModal(true);
            setLoading(false);
        }
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: "linear-gradient(180deg, #028ed5, #014365)",
                padding: { xs: "20px", md: "40px" }
            }}
        >
            <Container maxWidth="sm">
                <Card elevation={5} sx={{ borderRadius: "12px", overflow: "hidden" }}>
                    <CardContent sx={{ p: 0 }}>
                        <Box sx={{ p: 4, textAlign: "center" }}>
                            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                                Welcome Back
                            </Typography>
                            <Typography variant="body1" color="textSecondary" mb={3}>
                                Sign in to continue to BINUS Career
                            </Typography>

                            <form onSubmit={handleSubmit}>
                                <Stack spacing={3}>
                                    <TextField
                                        fullWidth
                                        label="Username"
                                        variant="outlined"
                                        required
                                        value={form.username}
                                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Person color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        variant="outlined"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Lock color="action" />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handlePasswordVisibility} edge="end">
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        fullWidth
                                        disabled={loading}
                                        sx={{ 
                                            py: 1.5, 
                                            textTransform: "none", 
                                            fontSize: "16px",
                                            fontWeight: 600 
                                        }}
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                                    </Button>
                                </Stack>
                            </form>

                            <Divider sx={{ my: 3 }}>
                                <Typography variant="body2" color="textSecondary">
                                    OR
                                </Typography>
                            </Divider>

                            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                                <Typography variant="body2">
                                    Don't have an account?
                                </Typography>
                                <Button
                                    component={Link}
                                    to="/register"
                                    variant="outlined"
                                    color="primary"
                                    sx={{ textTransform: "none" }}
                                >
                                    Sign Up
                                </Button>
                            </Stack>
                        </Box>
                    </CardContent>
                </Card>
            </Container>

            <ModalAlert
                variant="info"
                open={showNotApprovedModal}
                title="Account Not Approved"
                message="Your account is pending approval. Please contact an administrator for assistance."
                buttonTitle="OK"
                onClose={() => setShowNotApprovedModal(false)}
            />

            <ModalAlert
                variant="failed"
                open={showErrorModal}
                title="Login Failed"
                message={errorMessage}
                buttonTitle="OK"
                onClose={() => setShowErrorModal(false)}
            />
        </Box>
    );
}
