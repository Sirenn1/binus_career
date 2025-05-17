import { useState, FormEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
  Alert,
  Slide
} from "@mui/material";
import { Visibility, VisibilityOff, Person, Email, Lock } from "@mui/icons-material";
import { ModalAlert } from "./common/modal-alert";

axios.defaults.baseURL = 'https://localhost:44453';

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  message: string;
  success: boolean;
}

export default function Register() {
  const [form, setForm] = useState<RegisterForm>({ username: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const apiEndpoint = "/api/Auth/register";

    try {
      console.log("Sending request to:", axios.defaults.baseURL + apiEndpoint);
      console.log("Request data:", form);

      const res = await axios.post<RegisterResponse>(apiEndpoint, form, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setSuccessMessage(res.data.message || "Registration successful! Your account is pending approval.");
      setShowSuccessModal(true);
    } catch (err: any) {
      console.error("Registration error:", err);

      if (err.response?.status === 404) {
        setError(`Endpoint not found: ${apiEndpoint}. Check your backend API routes.`);
      } else {
        const errorMsg = err.response?.data?.message ||
          err.response?.data ||
          err.message ||
          "Registration failed";

        setError(errorMsg);
      }
    } finally {
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
                Create Account
              </Typography>
              <Typography variant="body1" color="textSecondary" mb={3}>
                Sign up to join BINUS Career
              </Typography>

              {error && (
                <Slide direction="down" in={!!error} mountOnEnter unmountOnExit>
                  <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
                    {error}
                  </Alert>
                </Slide>
              )}

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
                    label="Email"
                    type="email"
                    variant="outlined"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="action" />
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
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
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
                  Already have an account?
                </Typography>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  color="primary"
                  sx={{ textTransform: "none" }}
                >
                  Sign In
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>

      {/* Success Modal */}
      <ModalAlert
        variant="success"
        open={showSuccessModal}
        title="Registration Successful"
        message={successMessage}
        buttonTitle="Go to Login"
        onClose={() => {
          setShowSuccessModal(false);
          window.location.href = "/login";
        }}
      />
    </Box>
  );
} 