import React from "react";
import SimpleAlert from "../alert/SimpleAlert";
import { Button, Modal, Paper } from "@material-ui/core";
import appStore from "./../../redux/store/appStore"
import {toggleAddAccModal, CLOSE_DEL_AC_MODAL} from "./../../redux/actions/nav-actions"

const paperStyle = {
    backgroundColor: "white",
    width: "400px",
    minHeight: "100px",
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

export default class ConfirmModal extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            isOpen : false,
            onTrue : false
        }
    }
    

    componentWillReceiveProps(nextProps)
    {
        let onTrue = nextProps.onTrue
        this.setState({
            onTrue
        })
    }

    componentDidMount()
    {
        appStore.subscribe(()=>{

            let isOpen = appStore.getState().nav.OPEN_DEL_AC_MODAL
            this.setState({
                isOpen
            })
        })
    }

    closeModal()
    {
        appStore.dispatch(toggleAddAccModal(CLOSE_DEL_AC_MODAL))
    }

    render() {
        return (
            <Modal open={this.state.isOpen} style={modalStyle}>
                <Paper elevation={10} style={paperStyle}>
                    <SimpleAlert
                        type="warning"
                        title="Delete Account"
                        description="Are you sure that you want to do this ? Please Confirm." />
                    

                    <div style={{...paperRow, "padding" : "10px"}}>
                        <div>
                            <Button style={{"margin":"5px"}} onClick={this.state.onTrue}> Yes </Button>
                            <Button style={{"margin":"5px"}} variant="outlined" onClick={this.closeModal}> No </Button>
                        </div> 
                    </div>
                </Paper>
            </Modal>
       )
    }
}