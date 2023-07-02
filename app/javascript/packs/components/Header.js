import React from 'react';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

import { useNavigate } from "react-router-dom";

import { BASE_URL, ENDPOINTS, COMMON_HEADERS } from '../constants';
import { clearStorage, getTokenData, getUserData } from '../store';

export default function Header(props) {
    const navigate = useNavigate();

    const signOut = (e) => {
        e.preventDefault();
        
        let url = BASE_URL + ENDPOINTS.SIGN_OUT;
    
        fetch(url, {
          method: "DELETE",
          headers: {
            ...COMMON_HEADERS,
            Authorization: getTokenData(),
          },
        })
        .then((response) => {
          if (response.ok) {
            // Remove user token from localStorage on sucessful logout
            clearStorage();
            return response.json();
          } else {
            // Handle other error scenarios
            throw new Error("Something went wrong.");
          }
        })
        .then((responseData) => {
          // After logout navigate the user to login page
          navigate("/");
        })
        .catch((error) => {
            // Log out user anyways if any error occurs and navigate to login page
            clearStorage();
            console.log("Error", error.message);
            navigate("/");
        });
    };

    return (
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
          sx={{ marginBottom: 8, justifyContent: "space-between" }}
        >
            <Typography component="h3" variant="h4">
                Homepage
            </Typography>
            <Stack direction="row" useFlexGap flexWrap="wrap" alignItems="center">
                { getUserData() ? <Typography variant="body1" sx={{ marginX: 2 }}>
                    {getUserData().email}</Typography> : null 
                }
                <Link onClick={signOut} sx={{ cursor: "pointer" }}>
                SignOut
                </Link>
            </Stack>
        </Stack>
    )
}
