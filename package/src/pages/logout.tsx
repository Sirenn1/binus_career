import Container from "@mui/material/Container";
// import { WidgetList } from 'components/widget/widget-list';
// import { WidgetToolbar } from 'components/widget/widget-toolbar';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile, logoutProfile } from "../store/profile/slice";
import { logoutAuthToken } from "../store/authToken/slice";
import { logout } from "../store/auth/slice";
import { selectProfile } from "../store/profile/selector";
import { selectAuthTokenAzureAD } from "../store/authToken/selector";
import { useNavigate } from "react-router-dom";
import { clearError } from "../store/error/slice";

export function Logout() {
  const [isOnEditMode, setIsOnEditMode] = useState(false);
  const profile = useSelector(selectProfile);
  const azureAd = useSelector(selectAuthTokenAzureAD);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutProfile());
    dispatch(logoutAuthToken());
    dispatch(logout());
    dispatch(clearError());
  }, []);

  if (!profile && !azureAd) {
    navigate("/login");
  }

  return (
    <Container maxWidth={false} disableGutters>
      {/* <WidgetToolbar
        isEditor={false}
        isOnEditMode={isOnEditMode}
        setIsOnEditMode={setIsOnEditMode}
      />
      <WidgetList isOnEditMode={isOnEditMode} /> */}
      <div>Ini adalah halaman Logout!!!</div>
    </Container>
  );
}
