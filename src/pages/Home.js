import React from "react";
import HomeAppBar from "./../components/HomeAppBar"
import { Grid } from "@material-ui/core"

class Home extends React.Component {
    render() {
        return (
            <div>
                <HomeAppBar history={this.props.history}/>
                <Grid container justify="space-around" style={{paddingTop:"10px"}}>
                    
                </Grid>
            </div>
        )
    }
}

export default Home;