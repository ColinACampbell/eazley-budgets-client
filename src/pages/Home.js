import React from "react";
import HomeAppBar from "./../components/HomeAppBar"
import { Grid } from "@material-ui/core"
import PersonalFinance from "./../assets/personal-finance.png"

class Home extends React.Component {
    render() {
        return (
            <div>
                <HomeAppBar history={this.props.history}/>
                <Grid container justify="space-evenly" style={{paddingTop:"10px"}}
                alignItems="center">
                    <img src={PersonalFinance} alt="" width={550}/>
                    <div style={{padding:"10px"}}>
                        <h1 style={{fontSize:"300%"}}> Eazley Budgets !! </h1>
                        <h2 style={{color:"#1976d2",fontSize:"300%"}}> Simple, Fast & Light Weight ! </h2>
                        <p style={{lineHeight:"1.8", fontFamily:"Segoe UI,Frutiger,Frutiger Linotype,Dejavu Sans,Helvetica Neue,Arial,sans-serif"}}> 
                            Take your budgeting experience to the web. <br/>
                            No more counting dimes in your head or sifting through spreadsheets
                            <br/> 
                            Eazley Budgets is here to make it easier for you. 
                            <br/>
                            Just a few clicks and some consistency and you're all set 😀.
                        </p>
                        <small> 
                            * DISCLAIMER : This is a hobby project to showcase the developer's skill set. <br/>
                            Please tread along carefully as certain aspects where focused on such as design practices and principles. <br/>
                            This is not a perfect project and there will be bugs. <br/>
                            If you are experiencing any you can contact colina.campbell.jr@gmail.com to report it <br/>
                            <a href="https://github.com/ColinACampbell/eazley-budgets-client" style={{textDecoration:"none"}}> Source code ( Font End )  </a>
                        </small>
                    </div>
                </Grid>
            </div>
        )
    }
}

export default Home;