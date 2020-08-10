import React from "react"
import { Modal, Paper, Button, TextField } from "@material-ui/core"
import SimpleAlert from "./../alert/SimpleAlert"
import {updateTransactions} from "./../../redux/actions/http-actions"
import appStore from "./../../redux/store/appStore"
import {toggleModal, CLOSE_TRANS_MODAL} from "./../../redux/actions/nav-actions"
import env from "./../../env/env"


const paperStyle = {
    backgroundColor: "white",
    width: "400px",
    minHeight: "250px",
    maxHeight: "300px",
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

export default class TransactionModal extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            submitSuccess : false,
            accountInfo : {},
            amount : 0
        }

        this.handleAmountChange = this.handleAmountChange.bind(this)
        this.createTransaction = this.createTransaction.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({
            accountInfo : nextProps.accountInfo
        })
    }

    componentDidMount()
    {
        let isModalOpen = appStore.getState().nav.OPEN_TRANS_MODAL

        this.setState({
            isModalOpen
        })

        appStore.subscribe(()=>{
            let isModalOpen = appStore.getState().nav.OPEN_TRANS_MODAL
            this.setState({
                isModalOpen
            })
        })
    }

    closeModal()
    {
        appStore.dispatch(toggleModal(CLOSE_TRANS_MODAL))
        this.setState({
            submitSuccess : false
        })
    }

    handleAmountChange(event)
    {
        let amount = event.target.value
        this.setState({
            amount
        })
    }

    createTransaction()
    {
        let accountID = this.state.accountInfo.id
        let amount = `${this.state.amount}` // convert it to a string
        let accountType = this.state.accountInfo.accountType

        fetch(`${env.API_SERVER}/transaction/create`,
        {
            method : "POST",
            body : JSON.stringify({accountID,amount,accountType}),
            headers : {
                "content-type" : "application/json"
            },
            credentials : "include"
        }).then((response)=>{

            if (response.status === 201)
            {
                appStore.dispatch(updateTransactions())

                this.setState({
                    submitSuccess : response.ok
                })
            }
        })
    }

    render()
    {
        let alert 
        if (this.state.submitSuccess)
            alert = <SimpleAlert type="success" title="Account Created" description="Account was created successfully !!" />
        else 
            alert = <span></span>

        return(
            <Modal open={this.state.isModalOpen || false} style={modalStyle}>
                <Paper elevation={10} style={paperStyle}>
                    <div style={{ textAlign: "center" }}>
                        <h1> Add Transaction </h1>
                    </div>
                    
                    <div style={paperRow}>
                        <TextField variant="outlined" label="Funds Amount" placeholder="Funds To Start With" type="number"
                        onChange={this.handleAmountChange}/>
                    </div>

                    {alert}

                    <div style={paperRow}>
                        <Button style={{margin:"10px"}} variant="contained" color="primary" disabled={this.state.submitSuccess} onClick={this.createTransaction}> Add </Button>
                        <Button style={{margin:"10px"}} variant="outlined" onClick={this.closeModal}> Close </Button>
                    </div>

                </Paper>
            </Modal>
        )
    }
}