import React from "react"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from "@material-ui/core/Paper"

export default function UserDetails(props) {
    return (
        <Paper style={{ width: "300px" }}>
            <List component="div" aria-label="secondary mailbox folders">
                <ListItem>
                    <ListItemText primary="First Name" secondary={props.userInfo.firstName} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Last Name" secondary={props.userInfo.lastName} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Email" secondary={props.userInfo.email} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Date Joined" secondary={props.userInfo.dateJoined} />
                </ListItem>
            </List>
        </Paper>
    )
}