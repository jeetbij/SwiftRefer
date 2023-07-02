import React from 'react';
import Alert from "@mui/material/Alert";

export default function ErrorBlock(props) {
    return (
        <Alert variant="outlined" severity="error">
            {props.message}
        </Alert>
    )
}
