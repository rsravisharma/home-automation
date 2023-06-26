import React, { Suspense, useState } from "react";
import { RouterProvider } from 'react-router-dom';
import * as AuthService from "./services/auth.service";
import ThemeProvider from "./theme/Provider";
import routes from './routes';
import { useSelector } from "react-redux";
import Lottie from "lottie-react";
// import Player from "./assets/player.lottie";
import { SnackbarProvider } from 'notistack'
import Player from "./assets/player2.json";
import { Box, CircularProgress } from "@mui/material";

const Login = React.lazy(() => import("./pages/Login"));

function LoadingWrapper() {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh" bgcolor="#fff">
      <Box>
        <CircularProgress />
      </Box>
    </Box>
  )
}

export default function App() {
  const auth = useSelector(state => state.auth);
  const [initializing, setInitializing] = useState(true);

  const verifyToken = async () => {
    AuthService.verify().then(() => {
      AuthService.me();
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setInitializing(false);
    })
  }

  return (

    <ThemeProvider>
      {
        (initializing) ? (
          <Box display="flex" alignItems="center" justifyContent="center" height="100vh" bgcolor="#fff">
            <Box height={100} width={200}>
              <Lottie animationData={Player} loop={false} onComplete={verifyToken} />
            </Box>
          </Box>
        ) : (
          <React.Fragment>
            {
              auth.accessToken ? (
                <RouterProvider router={routes} />
              ) : (
                <Suspense fallback={<LoadingWrapper />}>
                  <Login />
                </Suspense>

              )
            }
          </React.Fragment>
        )
      }
      <SnackbarProvider anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }} />

    </ThemeProvider>
  );
}

