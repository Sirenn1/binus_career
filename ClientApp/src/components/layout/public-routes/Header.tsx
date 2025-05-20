import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { layoutPublicStyle } from "../../../styles/layout/public-routes";
import { MobileMenuProps } from "../../../types/mobile-menu";

export function Header({ mobileMenu, setMobileMenu }: MobileMenuProps) {
  return (
    <Stack
      component="header"
      direction="row"
      justifyContent="space-between"
      sx={{ minHeight: "110px", width: "100%" }}
    >
      <Box sx={{ display: "flex", alignItems: "start" }}>
        <Box
          component="img"
          src="/assets/logo/logo-pita-biru.svg"
          alt="logo_pita_biru"
          sx={layoutPublicStyle.headerImgPitaBiru}
        />
        <Box
          component="img"
          src="/assets/logo/Logo-Binus-University-Universitas-Bina-Nusantara-Original-PNG.png"
          alt="logo_binus"
          sx={layoutPublicStyle.headerImgLogoBinus}
        />
        <Box
          component="img"
          src="/assets/logo/Logo-BINUS-Alumni.png"
          alt="logo_binus_alumni"
          sx={layoutPublicStyle.headerImgLogoBinusAlumni}
        />
      </Box>

      <Box sx={layoutPublicStyle.headerBox}>
        <MenuIcon
          sx={layoutPublicStyle.headerBoxIcon}
          onClick={() => setMobileMenu?.(!mobileMenu)}
        />
      </Box>
    </Stack>
  );
} 