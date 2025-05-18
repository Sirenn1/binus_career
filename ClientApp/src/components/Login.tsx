import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ModalAlert } from "./common/modal-alert";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Stack,
    TextField,
    Typography,
    CircularProgress,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material";

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
            const res = await axios.post("/api/auth/login", form);
            const user = res.data.user;

            if (!user.isApproved) {
                setShowNotApprovedModal(true);
                setLoading(false);
                return;
            }

            user.isAdmin ? navigate("/admin") : navigate("/registerPICAndCompany");
        } catch (err: any) {
            setErrorMessage("Login failed: " + (err.response?.data || err.message));
            setShowErrorModal(true);
            setLoading(false);
        }
    };

    const handlePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#ffffff",
                padding: "20px"
            }}
        >
            <Container maxWidth="xs">
                <Card elevation={3} sx={{ borderRadius: "16px", px: 3, py: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                        <Box>
                            <img src="/assets/logo/logo-binusuniv-binusmaya.svg" style={{ height: 50 }} />
                        </Box>
                    </Box>

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Name"
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
    sx={{ py: 1.5, fontWeight: 600, fontSize: "16px" }}
>
    {loading ? <CircularProgress size={24} color="inherit" /> : "SIGN IN"}
</Button>

<Typography variant="body2" align="center">
    Don't have an account?{" "}
    <a href="/register" style={{ color: "#1976d2", textDecoration: "none", fontWeight: 500 }}>
        Register here
    </a>
</Typography>
                            
                            
                        </Stack>
                    </form>
                </Card>

                

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
            </Container>
        </Box>
    );
}