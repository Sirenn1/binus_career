import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import React from "react";
import { loginStyle } from "../styles/container/login";

export const Welcome: React.FC = () => {
    const navigate = useNavigate(); 

    const handleLogin = (): void => {
        navigate("/login"); 
    };

    return (
        <Stack sx={loginStyle.contentStack}>
            <Box sx={loginStyle.contentStackBox}>
                <Typography sx={loginStyle.contentStackBoxTypography1}>
                    Welcome to Binus Career
                </Typography>
                <Typography sx={loginStyle.contentStackBoxTypography2}>
                    Discover and Unlock Opportunities with Binus Career
                </Typography>
                <Divider sx={loginStyle.contentStackBoxDivider} />

                <LoadingButton
                    variant="contained"
                    sx={{
                        ...loginStyle.contentStackBoxLoginButton,
                        backgroundColor: '#F48D0C', 
                        '&:hover': {
                            backgroundColor: '#D47A08', 
                        },
                        color: 'white',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }}
                    onClick={handleLogin}
                >
                    <Box component="img" src="/assets/logo/microsoft.png" alt="Microsoft" sx={{ width: 20 }} />
                    <Typography fontFamily="Segoe UI" fontSize={15} fontWeight={600} color="white">
                        Sign in with Microsoft
                    </Typography>
                </LoadingButton>

                <Typography sx={loginStyle.contentStackBoxTypography3}>
                    For More Information, please contact: asutomo@binus.edu, career@binus.edu
                </Typography>
                <Typography sx={loginStyle.contentStackBoxTypography4}>
                    ext. 1234, 1235
                </Typography>
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

export default Welcome; 