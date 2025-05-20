import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { useRef } from "react";
import { layoutPublicStyle } from "../../styles/layout/public-routes";
import { MobileMenuProps } from "../../types/mobile-menu";

export function SideMenuPublicRoute({
  mobileMenu,
  setMobileMenu,
}: MobileMenuProps) {
  const containerRef = useRef(null);
  const sideMenu = (
    <Paper elevation={4}>
      <Box sx={layoutPublicStyle.sideMenuPaperBox}>
        <Box sx={layoutPublicStyle.sideMenuBoxIcon}>
          <CloseIcon
            sx={layoutPublicStyle.sideMenuIcon}
            onClick={() => setMobileMenu?.(!mobileMenu)}
          />
        </Box>
        <Box sx={layoutPublicStyle.sideMenuBoxLink}>
          <Link
            href="/login"
            underline="none"
            sx={layoutPublicStyle.sideMenuLink}
          >
            <Typography sx={layoutPublicStyle.sideMenuLinkTypography}>
              Support
            </Typography>
          </Link>
        </Box>
      </Box>
    </Paper>
  );

  return (
    <Box ref={containerRef} sx={layoutPublicStyle.sideMenu}>
      <Slide direction="left" in={mobileMenu}>
        {sideMenu}
      </Slide>
    </Box>
  );
} 