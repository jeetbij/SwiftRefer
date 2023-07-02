import React from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import { formatDate } from '../../store';

export default function Referral(props) {
    return (
        <ListItem key={'ref-' + props.obj.id}>
            <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#1976d2" }}>
                    {props.obj.email.substring(0, 1).toUpperCase()}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={props.obj.email}
                secondary={formatDate(props.obj.created_at)}
            />
        </ListItem>
    )
}
