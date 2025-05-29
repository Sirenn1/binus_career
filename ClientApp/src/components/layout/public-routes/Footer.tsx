import CopyrightIcon from '@mui/icons-material/Copyright';
import { Typography, Stack } from '@mui/material';
import { layoutPublicStyle } from '../../../styles/layout/public-routes';

const newDate = new Date();

export function FooterPublicRoutes() {
  return (
    <Stack component="footer" sx={layoutPublicStyle.footer}>
      <Stack direction="column" sx={{ width: { xs: '100%', xl: '1750px' } }}>
        <Typography fontSize={16} marginBottom="10px">
          BINUSMAYA
        </Typography>
        <Typography fontSize={12} marginBottom="35px">
          BINUS Higher Education
        </Typography>
        <Typography fontSize={9}>
          Copyright © 2020-{newDate.getFullYear()} BINUS Higher Education. All rights reserved
        </Typography>
      </Stack>
    </Stack>
  );
} 