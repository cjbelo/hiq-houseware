import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import * as Yup from "yup";
import md5 from "md5";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { authenticate, setUser, getIsAuthenticated } from "./Login.slice";
import { users } from "./Login.data";
import logo from "../../media/logo.jpeg";

const Logo = styled.img`
  height: 100px;
`;

const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link href="https://hiqhouseware.app/">HI-Q Houseware</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(getIsAuthenticated);
  const [errMsg, setErrMsg] = useState<string>("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      remember: true,
    },
    validationSchema: Yup.object({
      username: Yup.string().max(255).required("Username is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: (formData) => {
      const { username, password } = formData;
      const user: any = users.find((e: any) => e.username === username && e.password === md5(password));
      if (user) {
        const userData = { ...user };
        // delete userData.password;
        dispatch(authenticate(true));
        dispatch(setUser(userData));
        navigate("/");
      } else {
        setErrMsg("Invalid username and/or password!");
      }
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    formik.handleChange(event);
    errMsg && setErrMsg("");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Logo src={logo} />
        <Typography component="h1" variant="h5">
          HI-Q General Trading System
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          {errMsg && <Alert severity="error">{errMsg}</Alert>}
          <TextField
            error={Boolean(formik.touched.username && formik.errors.username)}
            fullWidth
            helperText={formik.touched.username && formik.errors.username}
            label="Email Address"
            margin="normal"
            name="username"
            onBlur={formik.handleBlur}
            onChange={(e) => handleChange(e)}
            type="text"
            value={formik.values.username}
            variant="outlined"
          />
          <TextField
            error={Boolean(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={formik.handleBlur}
            onChange={(e) => handleChange(e)}
            type="password"
            value={formik.values.password}
            variant="outlined"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                name="remember"
                color="primary"
                onChange={formik.handleChange}
                checked={formik.values.remember}
              />
            }
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Request Access"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};
