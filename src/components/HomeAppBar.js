import React from "react";
import {AppBar,Toolbar, Typography, Button }from "@material-ui/core"
//import MenuIcon from "@material-ui/icons/Menu"


class HomeAppBar extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar style={{justifyContent:"space-between",display:"flex"}}>
                    <Typography variant="h6" >
                        Eazley Budgets
                    </Typography>
                    <div>
                    <Button color="inherit" style={{float:"right"}} onClick={()=> this.props.history.push('/login')}>Login</Button>
                    <Button color="secondary" style={{float:"right"}} onClick={()=> this.props.history.push('/signup')}>Sign Up</Button>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

export default HomeAppBar;