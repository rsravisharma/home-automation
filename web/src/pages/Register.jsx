import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
  Paper,
  Checkbox,
  FormHelperText 
} from '@mui/material';
// import { useState } from "react";
import * as AuthService from "../services/auth.service";
import { useSnackbar } from 'notistack';
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup
    .string('Enter your name')
    .required('Name is required'),
  username: yup
    .string('Enter your username')
    .required('Username is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  // phoneNumber: yup
  //   .string('Enter your phone number')
  //   .required('Phone Number is required'),
  password: yup
    .string('Enter your password')
    .required('Password is required'),
});

const Register = () => {
  // const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  // const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: 'admin',
      username: 'admin',
      email:"admin@iot.com",
      // phoneNumber:"987654321",
      password: '12345678',
      policy: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      AuthService.signUp(values.name, values.username, values.email, values.password).then(res => {
        enqueueSnackbar(res.message, { variant: "success" })
      }).catch(err => {
        enqueueSnackbar(err.message, { variant: "error" })
      })
    },
  });


  return (
    <>
      <Helmet>
        <title>Register | IoTwebsite</title>
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
                  variant="body2"
                >
                  Create new account
                </Typography>
              </Box>
              {/* <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="First name"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Last name"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  variant="outlined"
                /> */}
              <TextField
                fullWidth
                label="Name"
                margin="normal"
                name="name"
                onBlur={formik.handleBlur}
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                label="User Name"
                margin="normal"
                name="username"
                onBlur={formik.handleBlur}
                variant="outlined"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                fullWidth
                label="Email Address"
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                type="email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                label="Password"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                type="password"
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              {/* <TextField
                fullWidth
                label="Phone Number"
                margin="normal"
                name="phoneNumber"
                onBlur={formik.handleBlur}
                type="number"
                variant="outlined"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              /> */}
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  ml: -1
                }}
              >
                <Checkbox
                  checked={formik.values.policy}
                  name="policy"
                  onChange={formik.handleChange}
                />
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  I have read the
                  {' '}
                  <Link
                    color="primary"
                    component={RouterLink}
                    to="#"
                    underline="always"
                    variant="body2"
                  >
                    Terms and Conditions
                  </Link>
                </Typography>
              </Box>
              {Boolean(formik.touched.policy && formik.errors.policy) && (
                <FormHelperText error>
                  {formik.errors.policy}
                </FormHelperText>
              )}
              <Box sx={{ py: 2 }}>
              <Button type="submit" sx={{ width: "100%" }} variant="contained" color="primary">
                  Sign up now
                </Button>
              </Box>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                Have an account?
                {' '}
                <Link
                  component={RouterLink}
                  to="/login"
                  variant="h7"
                >
                  Sign in
                </Link>
              </Typography>
            </form>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default Register;
