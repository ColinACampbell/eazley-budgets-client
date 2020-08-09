import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
/** 
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
**/

class MainAppBar extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {}
    }

    // TODO Fix up the icons in this section
    render() {
        return (
            <AppBar position="fixed">
                <Toolbar style={{justifyContent:"space-between",display:"flex"}}>
                    
                    <Typography variant="h6" noWrap>
                        {this.props.title}
                    </Typography>
                    
                    <div>

                        {/**<IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>

                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>**/}

                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={()=>{this.props.history.push("/my-profile")}}>
                            <AccountCircle />
                        </IconButton>

                        {/**<IconButton
                            aria-label="show more"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>**/}

                    </div>

                </Toolbar>
            </AppBar>
        )
    }
}

export default MainAppBar;
