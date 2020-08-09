import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';


class MainAppBar extends React.Component {

    // TODO Fix up the icons in this section
    render() {
        return (
            <AppBar position="fixed">
                <Toolbar style={{justifyContent:"space-between",display:"flex"}}>
                    
                    <Typography variant="h6" noWrap>
                        Accounts
                    </Typography>
                    
                    <div>

                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>

                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>

                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit">
                            <AccountCircle />
                        </IconButton>

                        <IconButton
                            aria-label="show more"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>

                    </div>

                </Toolbar>
            </AppBar>
        )
    }
}

export default MainAppBar;
