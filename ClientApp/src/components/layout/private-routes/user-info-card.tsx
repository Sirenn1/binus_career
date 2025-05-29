import Face from "@mui/icons-material/Face";
import { Stack, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ProfileUser, OrganizationRole } from "../../../store/profile/types";
import { layoutPrivateStyle } from "../../../styles/layout/private-routes";
import { AdminMenuProps } from "../../../types/admin-menu";
import { ApiService } from "../../../constants/ApiService";
import apiClient from "../../../config/api-client";

interface ApiResponse<T> {
  data: T;
}

interface RootState {
  profile: {
    userProfile: ProfileUser | null;
    activeRole: OrganizationRole | null;
  };
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export function UserInfoCard({ adminMenu, modulOpen }: AdminMenuProps) {
  const [organizationRoles, setOrganizationRoles] = useState<OrganizationRole[]>([]);
  const [modalChangeRoles, setModalChangeRoles] = useState(false);
  const isSmall = useMediaQuery("(max-width:600px)");
  const userProfile = useSelector((state: RootState) => state.profile.userProfile);
  const activeRole = useSelector((state: RootState) => state.profile.activeRole);

  const getUserRole = async () => {
    if (!userProfile?.userId) return;
    
    const response = await apiClient.get<ApiResponse<OrganizationRole[]>>(
      `${ApiService.user}/${userProfile.userId}/role`
    );
    setOrganizationRoles(response.data.data);
  };

  const sideMenuCardModul = isSmall
    ? adminMenu
      ? { display: "none" }
      : layoutPrivateStyle.cardBox2
    : modulOpen
    ? !adminMenu
      ? layoutPrivateStyle.cardBox2
      : { display: "none" }
    : adminMenu
    ? layoutPrivateStyle.cardBox2
    : { display: "none" };

  const sideMenuCardButtonModul = isSmall
    ? adminMenu
      ? { display: "none" }
      : layoutPrivateStyle.cardButton
    : modulOpen
    ? !adminMenu
      ? layoutPrivateStyle.cardButton
      : { display: "none" }
    : adminMenu
    ? layoutPrivateStyle.cardButton
    : { display: "none" };

  const sideMenuCardTitle = isSmall
    ? adminMenu
      ? { display: "none" }
      : { fontSize: "14px" }
    : modulOpen
    ? !adminMenu
      ? { fontSize: "14px" }
      : { display: "none" }
    : adminMenu
    ? { fontSize: "14px" }
    : { display: "none" };

  return (
    <Box sx={layoutPrivateStyle.card}>
      <Box sx={layoutPrivateStyle.cardBox1}>
        <Stack
          direction="row"
          alignItems="center"
          gap="5px"
          sx={{ color: "white" }}
        >
          <Face sx={{ fontSize: "22px" }} />
          <Typography sx={sideMenuCardTitle}>Role</Typography>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            getUserRole();
            setModalChangeRoles?.(!modalChangeRoles);
          }}
          sx={layoutPrivateStyle.cardButton}
        >
          <Typography sx={{ fontSize: "10px" }}>Change</Typography>
        </Button>
      </Box>

      <Box sx={layoutPrivateStyle.cardBox2}>
        <Typography component="span" sx={layoutPrivateStyle.cardBoxTypography1}>
          {userProfile?.fullName}
        </Typography>
        <Typography component="span" sx={layoutPrivateStyle.cardBoxTypography2}>
          {activeRole?.roleName}
        </Typography>
        <Typography component="span" sx={layoutPrivateStyle.cardBoxTypography2}>
          {userProfile?.position}
        </Typography>
      </Box>

      {/* OverlayChangeRole and ModulChangeRole components would be rendered here */}
    </Box>
  );
}
