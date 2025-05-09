/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
import { Box, CircularProgress } from "@mui/material";
import { useRefreshAccessToken } from "../../api/identity";
import { useAuth } from "../../hooks/use-auth";
import useModal from "../../hooks/use-modal";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectAuth } from "../../store/auth/selector";
import {
  selectAuthToken,
  selectAuthTokenAzureAD,
} from "../../store/authToken/selector";
import { setAuthToken, setRefreshToken } from "../../store/authToken/slice";
import { selectProfile, selectProfileActiveRole } from "../../store/profile/selector";
import jwtDecode from "jwt-decode";
import apiClient from "../../config/api-client";
import { ApiService } from "../../constants/ApiService";

interface DecodedToken {
  exp: number;
}

export function AuthProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const { showModal } = useModal();
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const azureADToken = useSelector(selectAuthTokenAzureAD);
  const authToken = useSelector(selectAuthToken);
  const profile = useSelector(selectProfile);
  const activeRole = useSelector(selectProfileActiveRole);

  const dispatch = useDispatch();

  const refreshTokenExp = async () => {
    const response = await apiClient.post(ApiService.refreshToken);
    dispatch(setAuthToken(response.data));
  };

  useEffect(() => {
    let logoutTimeout: NodeJS.Timeout;
    let countdownInterval: NodeJS.Timeout;
  
    if (authToken.myDashboardToken !== "") {
      const decodedToken = jwtDecode<DecodedToken>(authToken.myDashboardToken);
      const currentTime = Date.now() / 1000;
  
      const remainingTime = (decodedToken.exp - currentTime) * 1000;
  
      const timeoutId = setTimeout(() => {
        const hardLimit = 8 * 60 * 60 * 1000; // 8 hour hard limit
        if (remainingTime < -hardLimit) {
          window.location.href = "/logout";
          return;
        }
  
        const popupDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
        const popupStartTime = Date.now(); // Record when popup starts
  
        const updateCountdownMessage = () => {
          const timeElapsedSincePopup = Date.now() - popupStartTime;
          const timeRemaining = popupDuration - timeElapsedSincePopup;
  
          if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            window.location.href = "/logout";
            return;
          }
  
          const minutes = Math.floor(timeRemaining / 1000 / 60);
          const seconds = Math.floor((timeRemaining / 1000) % 60);
  
          showModal({
            title: "Attention!",
            message: `Your session has expired. You will be redirected to the login page in ${minutes} minute(s) and ${seconds} second(s).`,
            options: {
              buttonTitle: "Extend Session",
              variant: "info",
              onOk: () => {
                refreshTokenExp();
                clearTimeout(logoutTimeout);
                clearInterval(countdownInterval);
              },
            },
          });
        };
  
        updateCountdownMessage();
        countdownInterval = setInterval(updateCountdownMessage, 1000);
  
        logoutTimeout = setTimeout(() => {
          clearInterval(countdownInterval);
          window.location.href = "/logout";
        }, popupDuration);
      }, remainingTime);
  
      return () => {
        clearTimeout(timeoutId);
        clearTimeout(logoutTimeout);
        clearInterval(countdownInterval);
      };
    }
  
    return () => {
      clearTimeout(logoutTimeout);
      clearInterval(countdownInterval);
    };
  }, [authToken.myDashboardToken]);
  

  if (!profile) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
