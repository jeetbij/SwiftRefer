import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import { BASE_URL, ENDPOINTS, COMMON_HEADERS } from '../constants';
import { getTokenData } from '../store';
import Header from "./Header";
import ReferralForm from './referral/ReferralForm';
import Referrals from './referral/Referrals';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));

export default function HomePage() {

  const [referralData, setReferralData] = useState([]);

  useEffect(() => {
    // Fetch referral data on component load
    const fetchData = async () => {
      let url = BASE_URL + ENDPOINTS.REFERRALS;
      fetch(url, {
        method: "GET",
        headers: {
          ...COMMON_HEADERS,
          Authorization: getTokenData(),
        },
      })
      .then((response) => {
        if (response.ok) {
          // If response is 200 ok, return the data
          return response.json();
        } else {
          // Handle other error scenarios
          throw new Error("Something went wrong.");
        }
      })
      .then((resData) => {
        // Get the referrals data and set it in the state
        const data = resData.data.referrals;
        setReferralData(data);
      })
      .catch((error) => {
        console.log("Error", error.message);
      });
    };

    fetchData();
  }, []);

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          <Item>
            <ReferralForm referralData={referralData} setReferralData={setReferralData} />
          </Item>

          <Item>
            <Referrals referralData={referralData} />
          </Item>
        </Stack>
      </Box>
    </Container>
  );
}
