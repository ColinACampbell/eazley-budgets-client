import React from "react";
import HomeAppBar from "../components/HomeAppBar"
import { Grid, TextField, Button } from "@material-ui/core";
import env from "./../env/env"
import {Link} from "react-router-dom"

class Login extends React.Component {


    constructor(props)
    {
        super(props)

        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePass = this.onChangePass.bind(this)
        this.login = this.login.bind(this)

        this.state = {
            userEmail : "",
            userPassword : ""
        }

        this.styles = {
            form : {
                //marginTop: "20px",
                width : "67%"
            },
            inputContainer : {
                padding : "10px",
                width : "100%",
                display:"flex",
                justifyContent:"center"
            },
            inputText : {
                maxWidth : "400px",
                minWidth : "100px",
                width : "100%"
            }
        }
    }

    componentDidMount() {

    }

    onChangeEmail(e)
    {
        //.log(e.target.value)
        this.setState({
            userEmail : e.target.value
        })
    }

    onChangePass(e)
    {
        //.log(e.target.value)
        this.setState({
            userPassword : e.target.value
        })
    }

    async login()
    {
        const email = this.state.userEmail;
        const password = this.state.userPassword;

        const jsonBody = JSON.stringify({email,password});

        // TODO Work on this when server is down
        fetch(`${env.API_SERVER}/user/login`,
        {
            credentials : "include",
            body : jsonBody,
            headers : {
                "content-type" : "application/json"
            },
            method : "POST"
        }).then((response)=>response.json())
        .then((responseBody)=>{
            if (responseBody.status === "pass")
            {
                this.props.history.push('/dashboard')
            } else
            {
                alert("Wrong credentials")
            }
        })        
    }

    render() {
        return (
            <div>
                <HomeAppBar history={this.props.history}/>
                <Grid container justify="center" alignContent="center" style={{height:"calc( 100vh - 200px )"}}>
                    <form noValidate autoComplete="off" style={this.styles.form}>
                        <h1 style={{textAlign:"center"}}> LOGIN </h1>
                        <div style={this.styles.inputContainer}>
                            <TextField style={this.styles.inputText} id="outlined-basic" label="Email" variant="outlined" type="email" 
                            value={this.state.userEmail}
                            onChange={this.onChangeEmail}/>
                        </div>
                        <div style={this.styles.inputContainer}>
                            <TextField style={this.styles.inputText} id="outlined-basic" label="Password" variant="outlined" type="password" 
                            value={this.state.userPassword}
                            onChange={this.onChangePass}/>
                        </div>
                        <div style={this.styles.inputContainer}>
                            <Button color="primary" variant="contained" onClick={this.login}> Login </Button>
                        </div>
                        <div style={{textAlign:"center"}}>
                            <small> Don't have any account ? Sign up <Link to="/signup"> here </Link> </small>
                        </div>
                    </form>
                </Grid>
            </div>

        )
    }
}

export default Login;