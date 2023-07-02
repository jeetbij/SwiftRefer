import React, { useState } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';

import ErrorBlock from '../ErrorBlock';

import { BASE_URL, ENDPOINTS, COMMON_HEADERS } from '../../constants';
import { getTokenData, validateEmail } from '../../store';


export default function ReferralForm(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        email: '',
        isValidEmail: true,
        error: ''
      })
    
    const handleEmailChange = (event) => {
        setData((data) => ({
          email: event.target.value,
          isValidEmail: validateEmail(event.target.value),
          error: ''
        }));
    };

    const sendReferral = (e) => {
        setIsLoading(true);
        // Clear the error incase present any
        setData((data) => ({
          ...data,
          error: '',
        }));
        e.preventDefault();
        // Validate data and send request
        if (validateEmail(data.email) && data.isValidEmail) {
          // Form data
          let formData = {
            email: data.email
          };
    
          let url = BASE_URL + ENDPOINTS.REFERRALS;
          fetch(url, {
            method: "POST",
            headers: {
              ...COMMON_HEADERS,
              Authorization: getTokenData(),
            },
            body: JSON.stringify(formData),
          })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else if (response.status === 422) {
              throw new Error("You have already referred the email id.");
            } else {
              // Handle other error scenarios
              throw new Error("Something went wrong.");
            }
          })
          .then((responseData) => {
            // Append the latest referral data to the referrals data
            props.setReferralData([
              responseData.data.referral,
              ...props.referralData
            ])
            setData({
              ...data,
              email: '',
              error: ''
            })
            setIsLoading(false);
          })
          .catch((error) => {
            // Show error to the user
            setData((data) => ({
              ...data,
              error: error.message,
            }));
            setIsLoading(false);
          });
        } else {
          setData((data) => ({
            ...data,
            error: "Please enter valid email.",
          }));
          setIsLoading(false);
        }
    }

    return (
        <>
        <Typography variant="h6" component="h3">
            Send Referral
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
                    />
                </Grid>
            </Grid>
            { data.error ? (
                <ErrorBlock message={ data.error }/>
                ) : null
            }
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={sendReferral}
                disabled={isLoading}
            >
              { isLoading ? <CircularProgress /> : 'Send Referral' }
            </Button>
        </Box>
        </>
    )
}
