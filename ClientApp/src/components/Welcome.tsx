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
                <Divider sx={loginStyle.contentStackBoxDivider} />

                <LoadingButton
                    variant="contained"
                    sx={{
                        ...loginStyle.contentStackBoxLoginButton,
                        marginTop: '20px',
                        backgroundColor: 'white',
                        borderColor: '#ccc',
                        color: '#7E7E7E',
                        width: '400px',
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                            borderColor: '#aaa',
                        },
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                    onClick={handleLogin}
                >
                    <Box component="img" src="/assets/logo/microsoft.png" alt="Microsoft" sx={{ width: 20 }} />
                    <Typography fontFamily="Segoe UI" fontSize={15} fontWeight={600}>
                        SIGN IN AS SUPER ADMIN/JOB SEEKER
                    </Typography>
                </LoadingButton>

                <LoadingButton
                    variant="outlined"
                    sx={{
                        ...loginStyle.contentStackBoxLoginButton,
                        marginTop: '20px',
                        backgroundColor: 'white',
                        borderColor: '#ccc',
                        color: '#7E7E7E',
                        width: '400px',
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                            borderColor: '#aaa',
                        },
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                    onClick={() => navigate('/login-pic')}
                >
                    <Typography fontFamily="Segoe UI" fontSize={13} fontWeight={500}>
                        SIGN IN AS PIC COMPANY
                    </Typography>
                </LoadingButton>
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