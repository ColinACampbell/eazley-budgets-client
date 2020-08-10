import React from "react"
import env from "./../env/env"
import MainAppBar from "../components/MainAppBar";
import { Grid, Button} from "@material-ui/core";
import ProfilePlaceholder from "./../assets/profile-placeholder.png"
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SimpleAlert from "./../components/alert/SimpleAlert"
import UserDetails from "./../components/UserDetails"

import {OPEN_CONFIRM_MODAL, toggleModal} from "./../redux/actions/nav-actions"
import appStore from "./../redux/store/appStore"
import ConfirmModal from "../components/modal/ConfirmModal";

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo : {},
            delModalOpen : false
        }
        this.deleteUserProfile = this.deleteUserProfile.bind(this)
    }

    componentDidMount() {
        this.getUserInfo();
        appStore.subscribe(()=>{
            console.log(appStore.getState().nav.OPEN_CONFIRM_MODAL)
        })
    }

    getUserInfo() {
        fetch(`${env.API_SERVER}/user/info`, {
            credentials: "include"
        }).then((response) => response.json())
            .then((userInfo) => {
                this.setState({
                    userInfo
                })
            })
    }

    deleteUserProfile()
    {
        fetch(`${env.API_SERVER}/user/delete-profile`,
        {
            credentials : "include",
            method : "DELETE"
        })
        .then((response)=>{
            console.log(response.status)
            if (response.status === 200)
                this.props.history.push("/")
        })
    }

    openDeleteAccountModal()
    {
        appStore.dispatch(toggleModal(OPEN_CONFIRM_MODAL));
    }

    render() {
        console.log(this.state.userInfo)

        return (
            <div>
                <MainAppBar title="My Profile" history={this.props.history} />
                <div style={{ marginTop: "100px" }}>
                    <Grid
                        container
                        justify="space-evenly"
                        alignItems="center">
                        <div>
                            <img src={ProfilePlaceholder} width={200} alt="" />
                        </div>
                        <div>
                            <UserDetails userInfo={this.state.userInfo}/>
                        </div>
                    </Grid>
                </div>

                <ConfirmModal 
                    type="warning"
                    title="Delete User Profile"
                    description="Are you sure that you want to do this ? Please Confirm."
                    onTrue={this.deleteUserProfile}/>

                <Grid style={{marginTop : "30px",marginBottom:"20px"}}
                container
                justify="center">
                    <Accordion style={{width:"90%"}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <SimpleAlert type="warning" title="Danger Zone" />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <Button onClick={this.openDeleteAccountModal}> Delete Account </Button>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </div>
        )
    }
}