import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";


export function Welcome() {
    const navigate = useNavigate(); 

    const handleLogin = () => {
        navigate("/login"); 
    };

    return (
        <Stack component="section" spacing={3} alignItems="center" justifyContent="center" height="100vh">
            <Box>
                <Typography variant="h4" textAlign="center">
                    Welcome to Alumni Dashboard
                </Typography>
                <Typography variant="caption" textAlign="center" display="block" mt={1}>
                    Discover and Unlock Alumni Information and Opportunities with ADA
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Stack direction="column" spacing={2} alignItems="center">
                    <LoadingButton
                        variant="contained"
                        color="info"
                        loadingIndicator={<CircularProgress size="20px" />}
                        onClick={handleLogin}
                    >
                        <Box component="img" src="/assets/logo/microsoft.png" alt="Microsoft" sx={{ width: 20, mr: 1 }} />
                        <Typography fontFamily="Segoe UI" fontSize={15} fontWeight={600}>
                            Sign in with Microsoft
                        </Typography>
                    </LoadingButton>
                </Stack>

                <Typography variant="body2" mt={4} textAlign="center">
                    For More Information, please contact: asutomo@binus.edu, alumni@binus.edu
                </Typography>
                <Typography variant="body2" textAlign="center">
                    ext. 1234, 1235
                </Typography>
            </Box>

            <Box
                component="img"
                src="/assets/image/ilustrasi-login.png"
                alt="Login Illustration"
                sx={{ maxWidth: 400, width: "100%" }}
            />
        </Stack>
    );
}

export default Welcome;
