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

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo : {}
        }
    }

    componentDidMount() {
        this.getUserInfo();
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

                <Grid style={{marginTop : "30px",marginBottom:"20px"}}
                container
                justify="center">
                    <Accordion style={{width:"90%"}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <SimpleAlert type="warning" title="Danger Zone" style={{width:"100%"}}/>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <Button> Delete Account </Button>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </div>
        )
    }
}