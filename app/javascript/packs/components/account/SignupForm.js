import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../Copyright";
import CircularProgress from '@mui/material/CircularProgress';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { useNavigate } from "react-router-dom";

import ErrorBlock from '../ErrorBlock';
import { BASE_URL, ENDPOINTS, COMMON_HEADERS, AUTHORIZATION_HEADER, VALID_EMAIL_PATTERN } from '../../constants';
import { setTokenData, setUserData, clearStorage } from '../../store';
import { validateEmail, validatePasswordLength } from '../../store';

export default function SignupForm(props) {
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
      isValidPassword: validatePasswordLength(event.target.value),
      error: ''
    }));
  };

  const handleSubmit = (event) => {
    setLoading(true)
    event.preventDefault();
    if (validateEmail(data.email) && validatePasswordLength(data.password)) {
      // Prepare sign up form data
      let formData = {
        user: {
          email: data.email,
          password: data.password,
        },
      };

      let url = BASE_URL + ENDPOINTS.SIGN_UP;

      fetch(url, {
        method: "POST",
        headers: COMMON_HEADERS,
        body: JSON.stringify(formData),
      })
      .then((response) => {
        if (response.ok) {
          // Set user token in localStorage
          const headers = response.headers;
          setTokenData(headers.get(AUTHORIZATION_HEADER));
          
          return response.json();
        } else if (response.status === 401) {
          // Clear the user session/data incase of 401 error
          clearStorage();
          setLoading(false);
          throw new Error("Wrong email or password.");
        } else {
          // Handle other error scenarios
          throw new Error("Something went wrong.");
        }
      })
      .then((resData) => {
        // Set the user data and navigate to homepage
        setUserData(resData.user);
        setLoading(false);
        navigate("/homepage");
      })
      .catch((error) => {
        // Incase of any error, show it to the user
        setLoading(false);
        setData((data) => ({
          ...data,
          error: error.message,
        }));
      });
    } else {
      // Show error message when invalid email or password entered
      setData((data) => ({
        ...data,
        error: "Please enter valid email or password",
      }));
      setLoading(false);
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
          <ExitToAppIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={data.password}
                onChange={handlePasswordChange}
                error={!data.isValidPassword}
                helperText={
                  !data.isValidPassword
                    ? "Enter a valid password, should contain atleast 8 charaters."
                    : " "
                }
              />
            </Grid>
          </Grid>
          {data.error ? (
            <ErrorBlock message={data.error} />
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            { loading ? <CircularProgress /> : 'Sign Up' }
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
