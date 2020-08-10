import React from "react"
import { Grid, Button, Menu, MenuItem } from "@material-ui/core";
import {Add} from "@material-ui/icons"
import  AccountModal from "./modal/AccountModal";
import { TableCell, TableHead, Table, TableContainer, TableRow , TableBody, Paper} from "@material-ui/core";
import { OPEN_MODAL, CLOSE_MODAL, toggleModal } from "./../redux/actions/nav-actions"
import appStore from "../redux/store/appStore"



class Accounts extends React.Component {

    constructor(props) {
        super(props)

        const rows = this.mapDataToRows(this.props)

        this.state = {
            isAccModalOpen : false,
            rows : rows,
            anchorEl : null
        }
        
        this.toggleAddAccountModal = this.toggleAddAccountModal.bind(this)
        this.handleAccountClick = this.handleAccountClick.bind(this)
        this.handleContextMenu = this.handleContextMenu.bind(this)
        this.handleOnMenuClose = this.handleOnMenuClose.bind(this)
    }

    componentWillReceiveProps(nextProps)
    {
        const rows = this.mapDataToRows(nextProps)

        this.setState({
            rows
        })
    }

    mapDataToRows(props)
    {
        let rows = props.accounts.map((account)=>{
            return this.createData(
                account.id,
                account.accountName,
                account.accountType,
                account.funds,
                account.description,
                "No")
        })
        return rows;
    }

    toggleAddAccountModal()
    {
        // Toggles the account
        appStore.subscribe(()=>{

            let isAccModalOpen = appStore.getState().nav.OPEN_ACC_MODAL;
            this.setState({
                isAccModalOpen
            })
        })

        let operation = this.state.isAccModalOpen ? CLOSE_MODAL : OPEN_MODAL;

        appStore.dispatch(toggleModal(operation));   
    }

    createData(id,accountName, type, funds, description, hasLimitReached) {
        return { id,accountName, type, funds, description, hasLimitReached };
    }

    handleAccountClick(accountID)
    {
        this.props.history.push(`/dashboard/account/${accountID}`)
    }

    handleContextMenu(event)
    {
        event.preventDefault()
        this.setState({
            anchorEl : event.currentTarget
        })
    }

    handleOnMenuClose()
    {
        this.setState({
            anchorEl : null
        })
    }

    render() {
        return (
            <Grid container justify="flex-start">

                <div style={{ width: "100%" }}>

                    <h1 style={{ textAlign: "center" }}> Accounts </h1>

                    <div style={{padding:"10px", justifyContent:"flex-end", display:"flex"}}>
                        <Button variant="contained" color="primary" onClick={this.toggleAddAccountModal}> <Add/> </Button>
                    </div>

                    <AccountModal isOpen={this.state.isAccModalOpen}/>

                    <TableContainer component={Paper}>
                        <Table  aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Account Name</TableCell>
                                    <TableCell > Type </TableCell>
                                    <TableCell>Funds</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>  </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.rows.map((account) => (
                                    <TableRow key={account.id} onDoubleClick={()=>this.handleAccountClick(account.id)} onContextMenu={this.handleContextMenu}>
                                        
                                        <TableCell component="th" scope="row">
                                            {account.accountName}
                                        </TableCell>
                                        <TableCell>{account.type}</TableCell>
                                        <TableCell>{account.funds}</TableCell>
                                        <TableCell align="left">{account.description}</TableCell>
                                        <TableCell>
                                            <Menu
                                                id="simple-menu"
                                                keepMounted
                                                anchorEl={this.state.anchorEl}
                                                open={Boolean(this.state.anchorEl)}
                                                onClose={this.handleOnMenuClose}
                                                >
                                                { /** Todo Work on this */}

                                                <MenuItem  onClose={this.handleOnMenuClose} onClick={()=>{this.handleAccountClick(account.id)}}> View Transactions </MenuItem>
                                            </Menu>
                                        </TableCell>
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

export default Accounts