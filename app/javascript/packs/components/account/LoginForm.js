import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../Copyright";
import CircularProgress from '@mui/material/CircularProgress';

import { useNavigate } from "react-router-dom";

import ErrorBlock from '../ErrorBlock';
import { BASE_URL, ENDPOINTS, COMMON_HEADERS, AUTHORIZATION_HEADER, VALID_EMAIL_PATTERN } from '../../constants';
import { setTokenData, setUserData, clearStorage } from '../../store';
import { validateEmail } from '../../store';

export default function LoginForm(props) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    isValidEmail: true,
    isValidPassword: true,
    error: "",
  });

  const handleEmailChange = (event) => {
    setData((data) => ({
      ...data,
      email: event.target.value,
      isValidEmail: validateEmail(event.target.value),
      error: ''
    }));
  };

  const handlePasswordChange = (event) => {
    setData((data) => ({
      ...data,
      password: event.target.value,
      isValidPassword: !(event.target.value === ""),
      error: ''
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (data.isValidPassword && data.isValidEmail) {
      // Prepare the signup form data
      let formData = {
        user: {
          email: data.email,
          password: data.password,
        },
      };

      let url = BASE_URL + ENDPOINTS.LOGIN;
      fetch(url, {
        method: "POST",
        headers: COMMON_HEADERS,
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.ok) {
            // Get token from reponse headers and store it in localStorage
            const headers = response.headers;
            setTokenData(headers.get(AUTHORIZATION_HEADER));

            return response.json();
          } else if (response.status === 401) {
            // Clear the localStorage to make sure noting is there
            clearStorage();
            throw new Error("Wrong email or password.");
          } else {
            // Handle other error scenarios
            throw new Error("Something went wrong.");
          }
        })
        .then((resData) => {
          // Set user data in localStorage to keep user data, stop loading and navigate to homepage. Wooh!
          setUserData(resData.user);
          setLoading(false);
          navigate("/homepage");
        })
        .catch((error) => {
          // In case of any error, set the error message in error field and display it to the user
          setLoading(false);
          setData((data) => ({
            ...data,
            error: error.message,
          }));
        });
    } else {
      // Incase of invalid email or password, show the error message to the user
      setLoading(false);
      setData((data) => ({
        ...data,
        error: "Please enter valid email or password",
      }));
    }
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={data.email}
            onChange={handleEmailChange}
            error={!data.isValidEmail}
            helperText={
              !data.isValidEmail ? "Enter a valid email address." : " "
            }
            pattern={VALID_EMAIL_PATTERN}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={data.password}
            onChange={handlePasswordChange}
            error={!data.isValidPassword}
            helperText={
              !data.isValidPassword
                ? "Enter your password."
                : " "
            }
          />
          {data.error ? (
            <ErrorBlock message={data.error} />
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
            disabled={loading || !(data.isValidEmail && data.isValidPassword)}
          >
            { loading ? <CircularProgress /> : 'Sign In' }
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/sign_up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
