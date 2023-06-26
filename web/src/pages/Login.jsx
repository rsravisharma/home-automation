import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  Stack,
  InputAdornment,
  Paper,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import connect_config from '../utils/config.json';
import { useState } from "react";
import { useSnackbar } from 'notistack';
import * as AuthService from "../services/auth.service";
import * as yup from "yup";

const validationSchema = yup.object({
  username: yup
    .string('Enter your Username')
    .required('Username is required'),
  password: yup
    .string('Enter your password')
    .required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: 'admin',
      password: '12345678',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      AuthService.signIn(values.username, values.password).then(res => {
        enqueueSnackbar(res.message, { variant: "success" })
      }).catch(err => {
        enqueueSnackbar(err.message, { variant: "error" })
      })
    },
  });

  return (
    <>
      <Helmet>
        <title>Login | IoTwebsite</title>
      </Helmet>
      <Box sx={{
        height: "100%", width: "100%",
        display: "flex", alignItems: "center",
        justifyContent: "center",
        // backgroundColor: colors.blueGrey[900],
        backgroundImage: `linear-gradient(to bottom right, rgba(120,120,0,0.7), rgba(0,0,120,0.7))`,
        /* Created with https://www.css-gradient.com */
        // background: "#FEFEFD",
        // background: "linear-gradient(to bottom right, #FFF9ED, #FEFEFD)",
      }}>
        <Box sx={{ maxWidth: 350, flexGrow: 1, }} textAlign="center">
          <Paper sx={{ p: 4, py: 6, mt: 2 }}>


            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ mb: 0 }}>
                <Typography
                  color="textPrimary"
                  variant="h2"
                >
                  Sign in
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  Sign in on the IoT platform
                </Typography>
              </Box>
              {/* <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography>
                </Box> */}
              <Stack spacing={3}>
                <Box>
                  <TextField
                    label="Username"
                    variant="standard"
                    fullWidth
                    id="username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                  />

                </Box>

                <TextField
                  label="Password"
                  variant="standard"
                  fullWidth
                  id="password"
                  name="password"
                  type={showPassword ? "tex" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    endAdornment: (<InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={e => setShowPassword(!showPassword)}
                        onMouseDown={e => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>)
                  }}
                />

                <Button type="submit" sx={{ width: "100%" }} variant="contained" color="primary">LOGIN</Button>
              </Stack>
              <Typography
                color="textSecondary"
                variant="body2"
                mt={2}
              >
                Don't have an account?
                {' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  variant="h7"
                >
                  Sign Up
                </Link>
              </Typography>
            </form>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default Login;
