import React from "react"
import TransactionModal from "./modal/TransactionModal"
import { TableCell, TableHead, Table, TableContainer, TableRow , TableBody, Paper} from "@material-ui/core";
import { Button, Grid } from "@material-ui/core"
import { Add, Delete } from "@material-ui/icons"
import ConfirmModal from "./modal/ConfirmModal";

import env from "./../env/env"
import appStore from "./../redux/store/appStore";
import { toggleModal, OPEN_TRANS_MODAL} from "./../redux/actions/nav-actions"
import { OPEN_CONFIRM_MODAL, CLOSE_CONFIRM_MODAL } from "./../redux/actions/nav-actions"



export default class Transactions extends React.Component
{
    constructor(props)
    {
        super(props)

        let rows = this.mapDataToRow(this.props)

        this.state = {
            rows,
            accountInfo : {}
        }

        this.deleteAccount = this.deleteAccount.bind(this)
    }

    componentWillReceiveProps(nextProps)
    {
        let rows = this.mapDataToRow(nextProps)
        this.setState({
            rows,
            accountInfo : nextProps.accountInfo
        })
    }

    mapDataToRow(props)
    {
        let rows = props.transactions.map((transaction)=>{
            return this.createData(transaction.id,transaction.amount,transaction.date,transaction.time)
        })
        
        return rows
    }

    createData(id, amount, date , time) {
        return { id, amount, date , time};
    }

    openTransactionModal()
    {
        appStore.dispatch(toggleModal(OPEN_TRANS_MODAL))
    }

    openConfirmDeleteAccountModal()
    {
        appStore.dispatch(toggleModal(OPEN_CONFIRM_MODAL))
    }
    

    // TODO : Make this called once
    deleteAccount()
    {
        fetch(`${env.API_SERVER}/account/delete/${this.state.accountInfo.id}`,{
            credentials : "include",
            method : "DELETE"
        }).then((response)=>{
            // redirect the user
            appStore.dispatch(toggleModal(CLOSE_CONFIRM_MODAL))
            this.props.history.push('/dashboard')
        })
    }

    render() {
        return (
            <Grid container justify="flex-start">

                <div style={{ width: "100%" }}>

                    <h1 style={{ textAlign: "center" }}> Transactions </h1>

                    <div style={{padding:"10px", justifyContent:"flex-end", display:"flex"}}>
                        <Button variant="contained" color="primary" onClick={this.openTransactionModal}> <Add/> </Button>
                        <Button color="primary" onClick={this.openConfirmDeleteAccountModal}> <Delete/> </Button>
                    </div>
                    <TransactionModal accountInfo={this.state.accountInfo}/>
                    <ConfirmModal onTrue={this.deleteAccount}/>
                    <TableContainer component={Paper}>
                        <Table  aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell> Amount </TableCell>
                                    <TableCell> Date </TableCell>
                                    <TableCell> Time </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.rows.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell component="th" scope="row">
                                            {transaction.amount}
                                        </TableCell>
                                        <TableCell>{transaction.date}</TableCell>
                                        <TableCell>{transaction.time}</TableCell>
                                        
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer> 
                </div>

            </Grid>
        )
    }
}