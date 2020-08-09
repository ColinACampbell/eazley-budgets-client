import React from "react"
import {Button, Grid, TextField, LinearProgress} from "@material-ui/core"
import HomeAppBar from "./../components/HomeAppBar"
import { Link } from "react-router-dom"
import env from "./../env/env"


// TODO : Add logic for sign up

export default class Signup extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            userEmail : "",
            password : "",
            confirmPassword: "",
            firstName: "",
            lastName : "",
            wrongPasswords : false,
            passHelperText: "",
            inRequest: false, // represents whether an http request is being sent ( asynchronious )
            emailError : false,
            emailHelperText : ""
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

        // bind this to functions
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfPassword = this.onChangeConfPassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.checkPasswords = this.checkPasswords.bind(this);
        this.signup = this.signup.bind(this)
    }

    onChangeFirstName(event)
    {
        this.setState({
            firstName : event.target.value
        })
    }

    onChangeLastName(event)
    {
        this.setState({
            lastName : event.target.value
        })
    }

    onChangeEmail(event)
    {
        this.setState({
            userEmail : event.target.value
        })
    }

    onChangePassword(event)
    {
        this.setState({
            password : event.target.value
        })
    }
    
    onChangeConfPassword(event)
    {
        this.setState({
            confirmPassword : event.target.value
        })
    }

    checkPasswords()
    {
        if (this.state.confirmPassword.length > 0)
        {
            if (this.state.password === this.state.confirmPassword)
            {
                this.setState({
                    wrongPasswords : false
                })
                return true
            } else {
                this.setState({
                    wrongPasswords : true,
                    passHelperText : "Passwords don't match"
                })
                return false
            }
        } else {
            this.setState({
                wrongPasswords : true,
                passHelperText : "Please confirm your password"
            })
            return false
        }
    }

    signup()
    {
        this.checkPasswords();
        console.log(this.state.wrongPasswords)

        if (!this.checkPasswords())
            return
    
        this.setState({
            inRequest : true
        })

        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const userEmail = this.state.userEmail;
        const password = this.state.password;

        fetch(`${env.API_SERVER}/user/sign-up`,
        {
            method : "POST",
            credentials : "include",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                firstName,
                lastName,
                userEmail,
                password
            })
        })
        .then((response)=>{
            this.setState({
                inRequest : false
            })
            if (response.status === 409 || response.status === 500 )
            {
                this.setState({
                    emailError : true,
                    emailHelperText : "This email already exists"
                })
            } else if (response.status === 201) {
                this.props.history.push("/dashboard")
            }
        })
    }

    render()
    {


        const progress = this.state.inRequest ? <LinearProgress/> : <div/>

        return(
            <div>
                <HomeAppBar history={this.props.history}/>
                <Grid container justify="center" alignContent="center" style={{height:"calc( 100vh - 200px )"}}>
                    <form noValidate autoComplete="off" style={this.styles.form}>
                        <h1 style={{textAlign:"center"}}> SIGN UP </h1>
                        
                        <div style={this.styles.inputContainer}>
                            <TextField style={this.styles.inputText} id="outlined-basic" label="First Name" variant="outlined" type="text" 
                            value={this.state.firstName}
                            onChange={this.onChangeFirstName}
                            placeholder="Enter First Name"/>
                        </div>

                        <div style={this.styles.inputContainer}>
                            <TextField style={this.styles.inputText} id="outlined-basic" label="Last Name" variant="outlined" type="text" 
                            value={this.state.lastName}
                            onChange={this.onChangeLastName}
                            placeholder="Enter Last Name"/>
                        </div>
                        <div style={this.styles.inputContainer}>
                            <TextField style={this.styles.inputText} id="outlined-basic" label="Email" variant="outlined" type="email" 
                            value={this.state.userEmail}
                            onChange={this.onChangeEmail}
                            placeholder="Enter Email"
                            error={this.state.emailError}
                            helperText={this.state.emailHelperText}/>
                        </div>

                        <div style={this.styles.inputContainer}>
                            <TextField style={this.styles.inputText} id="outlined-basic" label="Password" variant="outlined" type="password" 
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            placeholder="Create Password"/>
                        </div>

                        <div style={this.styles.inputContainer}>
                            <TextField style={this.styles.inputText} id="outlined-basic" label="Confirm Password" variant="outlined" type="password" 
                            value={this.state.confirmPassword}
                            onChange={this.onChangeConfPassword}
                            placeholder="Confirm Your Password"
                            error={this.state.wrongPasswords}
                            helperText={this.state.passHelperText}/>
                        </div>

                        <div>
                            {progress}
                        </div>

                        <div style={this.styles.inputContainer}>
                            <Button color="primary" variant="contained" onClick={this.signup}> Sign Up </Button>
                        </div>

                        <div style={{textAlign:"center"}}>
                            <small> Already have any account ? Login <Link to="/login"> here </Link> </small>
                        </div>
                        
                    </form>
                </Grid>
            </div>
        )
    }
}