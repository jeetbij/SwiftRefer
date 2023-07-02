import React from 'react';
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Referral from './Referral';

export default function Referrals(props) {
  return (
    <>
      <Typography variant="h6" component="h3">
        Referrals already sent to
      </Typography>
      <Paper style={{ height: '400px', overflow: 'auto', boxShadow: 'none' }}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {props.referralData.map((obj, i) => (
            <Referral key={'referral-' + obj.id} obj={obj} />
          ))}
        </List>
      </Paper>
    </>
  )
}
