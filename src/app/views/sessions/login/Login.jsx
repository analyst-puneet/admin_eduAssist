import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { BASE_URL } from "./../../../../main";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled, useTheme } from "@mui/material/styles";

// Global Custom Components
import MatxLogo from "app/components/MatxLogo";
import MatxDivider from "app/components/MatxDivider";
import { Paragraph, Span } from "app/components/Typography";

// Styled Components
const GoogleButton = styled(Button)(({ theme }) => ({
  color: "rgba(0, 0, 0, 0.87)",
  boxShadow: theme.shadows[0],
  backgroundColor: "#e0e0e0",
  "&:hover": { backgroundColor: "#d5d5d5" },
}));

const Logo = styled("div")({
  gap: 10,
  display: "flex",
  alignItems: "center",
  "& span": { fontSize: 26, lineHeight: 1.3, fontWeight: 800 },
});

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#1A2038",
  minHeight: "100vh",
  "& .card": { maxWidth: 800, margin: "1rem" },
  "& .cardLeft": {
    color: "#fff",
    height: "100%",
    display: "flex",
    padding: "32px 56px",
    flexDirection: "column",
    backgroundSize: "cover",
    background: "#161c37 url(/assets/images/bg-3.png) no-repeat",
    [theme.breakpoints.down("sm")]: { minWidth: 200 },
    "& img": { width: 32, height: 32 },
  },
  "& .mainTitle": {
    fontSize: 18,
    lineHeight: 1.3,
    marginBottom: 24,
  },
  "& .item": {
    position: "relative",
    marginBottom: 12,
    paddingLeft: 16,
    "&::after": {
      top: 8,
      left: 0,
      width: 4,
      height: 4,
      content: '""',
      borderRadius: 4,
      position: "absolute",
      backgroundColor: theme.palette.error.main,
    },
  },
}));

// Initial form values
const initialValues = {
  username: "Hemant5567",
  password: "Hemant123",
  remember: true,
};

// Validation schema
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required!"),
});

export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        {
          username: values.username,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        window.location.replace("/");
      }
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("An unexpected error occurred.", { variant: "error" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Root>
      <Card className="card">
        <Grid container>
          <Grid item md={6} xs={12}>
            <div className="cardLeft">
              <Logo>
                <MatxLogo /> <span>MatX Pro</span>
              </Logo>

              <h1 className="mainTitle">Admin Dashboard</h1>

              <div className="features">
                <div className="item">JWT, Firebase & Auth0 Authentication</div>
                <div className="item">Clean & Organized code</div>
                <div className="item">Limitless Pages & Components</div>
              </div>

              <Span flexGrow={1}></Span>

              <a href="https://ui-lib.com/" target="_blank" rel="noopener noreferrer">
                <img src="/assets/images/logos/ui-lib.png" alt="UI Lib Logo" />
              </a>
            </div>
          </Grid>

          <Grid item md={6} xs={12}>
            <Box px={4} pt={4}>
              <GoogleButton
                fullWidth
                variant="contained"
                startIcon={<img src="/assets/images/logos/google.svg" alt="google" />}
              >
                Sign In With Google
              </GoogleButton>
            </Box>

            <MatxDivider sx={{ mt: 3, px: 4 }} text="Or" />

            <Box p={4}>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="username"
                      label="Username"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.username}
                      onChange={handleChange}
                      helperText={touched.username && errors.username}
                      error={Boolean(errors.username && touched.username)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                    />

                    <Box display="flex" justifyContent="space-between">
                      <Box display="flex" alignItems="center" gap={1}>
                        <Checkbox
                          size="small"
                          name="remember"
                          onChange={handleChange}
                          checked={values.remember}
                          sx={{ padding: 0 }}
                        />
                        <Paragraph>Remember Me</Paragraph>
                      </Box>

                      <NavLink to="/session/forgot-password" style={{ color: theme.palette.primary.main }}>
                        Forgot password?
                      </NavLink>
                    </Box>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={isSubmitting}
                      variant="contained"
                      sx={{ my: 2 }}
                    >
                      Login
                    </LoadingButton>

                    <Paragraph>
                      Don't have an account?
                      <NavLink
                        to="/session/signup"
                        style={{
                          marginInlineStart: 5,
                          color: theme.palette.primary.main,
                        }}
                      >
                        Register
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Root>
  );
}
