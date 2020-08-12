import React from "react";
import navStore from "../../redux/store/appStore"
import { CLOSE_ADD_AC_MODAL, toggleModal } from "../../redux/actions/nav-actions"
import { updateAccounts } from "../../redux/actions/http-actions"
import { Modal, Paper, Button, TextField, InputLabel, Select, MenuItem } from "@material-ui/core"

import env from "./../../env/env"

import SimpleAlert from "../alert/SimpleAlert"
import appStore from "../../redux/store/appStore";

const paperStyle = {
    backgroundColor: "white",
    width: "400px",
    minHeight: "500px",
    maxHeight: "550px",
    display: "flex",
    flexDirection: "column",
}

const modalStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const paperRow = {
    margin: "10px",
    textAlign: "center"
}

class AccountModal extends React.Component {

    constructor(props) 
    {
        super(props)
        this.state = {
            accountType: "NONE",
            accName : "",
            accFunds: 0,
            accDescription : "",
            creationSuccess: false
        }

        this.handleAccTypeChange = this.handleAccTypeChange.bind(this)
        this.onChangeAccDesc = this.onChangeAccDesc.bind(this)
        this.onChangeAccName = this.onChangeAccName.bind(this)
        this.onChangeFundsAmt = this.onChangeFundsAmt.bind(this)
        this.onCreateAccount = this.onCreateAccount.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
    }

    handleAccTypeChange(e) 
    {
        const accountType = e.target.value
        this.setState({
            accountType,
        })
    }

    onChangeAccName(e)
    {
        this.setState({
            accName : e.target.value
        })
    }

    onChangeFundsAmt(e)
    {
        this.setState({
            accFunds : e.target.value
        })
    }

    // on change funds description
    onChangeAccDesc(e)
    {
        this.setState({
            accDescription : e.target.value
        })
    }


    onCreateAccount()
    {
        fetch(`${env.API_SERVER}/account/create`,{
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(this.state),
            credentials: "include"
        }).then((response)=>{
            if (response.status === 201)
            {
                this.setState({
                    creationSuccess : response.ok // creationSuccess is a bool used to enable or disable controls
                })
            }
        })

        
    }

    onCloseModal()
    {
        navStore.dispatch(toggleModal(CLOSE_ADD_AC_MODAL))
        appStore.dispatch(updateAccounts())
        this.setState({
            creationSuccess : false
        })
    }

    render() {


        let alert 
        if (this.state.creationSuccess)
            alert = <SimpleAlert type="success" title="Account Created" description="Account was created successfully !!" />
        else 
            alert = <span></span>

        return (
            <Modal open={this.props.isOpen} style={modalStyle}>
                <Paper elevation={10} style={paperStyle}>
                    <div style={{ textAlign: "center" }}>
                        <h1> Create Account </h1>
                    </div>
                    <div style={paperRow}>
                        <TextField variant="outlined" label="Account Name" placeholder="Enter Account Name" onChange={this.onChangeAccName}/>
                    </div>
                    <div style={paperRow}>
                        <TextField
                            variant="outlined"
                            label="Description"
                            placeholder="Enter Description"
                            style={{ height: "80px" }}
                            multiline
                            rowsMax={4} 
                            onChange={this.onChangeAccDesc}/>
                    </div>

                    <div style={paperRow}>
                        <InputLabel id="demo-simple-select-outlined-label">Account Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={this.state.accountType}
                            onChange={this.handleAccTypeChange}
                            label="Age">
                            <MenuItem value="NONE">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="DEBIT">Debit</MenuItem>
                            <MenuItem value="CREDIT">Credit</MenuItem>

                        </Select>
                    </div>

                    <div style={paperRow}>
                        <TextField variant="outlined" label="Funds Amount" placeholder="Funds To Start With" type="number" 
                        onChange={this.onChangeFundsAmt}/>
                    </div>

                    {alert}

                    <div style={paperRow}>
                        <Button style={{margin:"10px"}} variant="contained" color="primary" onClick={this.onCreateAccount} disabled={this.state.creationSuccess}> Create </Button>
                        <Button style={{margin:"10px"}} variant="outlined" onClick={this.onCloseModal}> { this.state.creationSuccess ? "Close" : "Cancel"} </Button>
                    </div>

                </Paper>
            </Modal>
        )
    }
}

export default AccountModal;