import { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock
} from "@mui/icons-material";
import { ModalAlert } from "./common/modal-alert";

axios.defaults.baseURL = "https://localhost:44453";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setShowErrorModal(true);
      return;
    }

    if (form.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      setShowErrorModal(true);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/Auth/register", {
        username: form.username,
        email: form.email,
        password: form.password
      });
      setSuccessMessage(res.data?.message || "Registration successful!");
      setShowSuccessModal(true);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Registration failed";
      setErrorMessage(msg);
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

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
            <img src="/assets/logo/logo-binusuniv-binusmaya.svg" style={{ height: 50 }} />
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
                  )
                }}
              />

              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  )
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
                  )
                }}
                helperText="Password must be at least 8 characters long"
              />

              <TextField
                fullWidth
                label="Confirm Password"
                variant="outlined"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                error={form.password !== form.confirmPassword && form.confirmPassword !== ""}
                helperText={form.password !== form.confirmPassword && form.confirmPassword !== "" ? "Passwords do not match" : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleConfirmPasswordVisibility} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={loading || form.password !== form.confirmPassword}
                sx={{ py: 1.5, fontWeight: 600, fontSize: "16px" }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "REGISTER"}
              </Button>

              <Typography variant="body2" align="center">
                Already have an account?{" "}
                <a href="/login" style={{ color: "#1976d2", textDecoration: "none", fontWeight: 500 }}>
                  Sign in here
                </a>
              </Typography>
            </Stack>
          </form>
        </Card>

        <ModalAlert
          variant="success"
          open={showSuccessModal}
          title="Registration Successful"
          message={successMessage}
          buttonTitle="OK"
          onClose={() => {
            setShowSuccessModal(false);
            navigate("/login");
          }}
        />

        <ModalAlert
          variant="failed"
          open={showErrorModal}
          title="Registration Failed"
          message={errorMessage}
          buttonTitle="OK"
          onClose={() => setShowErrorModal(false)}
        />
      </Container>
    </Box>
  );
}
