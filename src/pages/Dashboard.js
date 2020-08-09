import React from "react";
import MainAppBar from "../components/MainAppBar"
import AccountInfo from "../components/AccountInfo"
import Accounts from "./../components/Accounts";
import appStore from "./../redux/store/appStore"
import { reset } from "./../redux/actions/http-actions"
import env from "./../env/env"


class Dashboard extends React.Component {


    __isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            accounts: []
        }
        this.authenticateUser()
    }

    componentDidMount() {
        this.__isMounted = true 

        // TODO Work on memory leak 
        // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
        if (this.__isMounted)
        {
            this.getAllAccounts();
            appStore.subscribe(() => {
    
                let updateState = appStore.getState().http.update
                if (updateState === "accounts") {
                    this.getAllAccounts()
                    appStore.dispatch(reset())
                }
            })
        }
    }

    // get accounts
    getAllAccounts() {

        // send api request to get all accounts
        fetch(`${env.API_SERVER}/account/all`,
        {
            credentials: "include",
            headers: {
                "content-type": "application/json"
            }
        }).then((response)=>response.json())
        .then((accounts)=>{
            this.setState({
                accounts
            })
        })
        
    }

    authenticateUser()
    {
        fetch(`${env.API_SERVER}/user/authenticate`,{
            credentials : "include",
            method : "POST"
        })
        .then((response)=>{
            if (response.status === 403)
                this.props.history.push("/login")
        })
    }

    componentWillUnmount()
    {
        this.__isMounted = false
    }

    render() {
        
        const accountInfo = <AccountInfo accounts={this.state.accounts} /> // Account info show summary
        const accounts = <Accounts accounts={this.state.accounts}  history={this.props.history}/>

        return (

            <div>
                <MainAppBar title="Home"/>
                <div>
                    {accountInfo}
                </div>
                <div>
                    {accounts}
                </div>

            </div>
        )
    }

}

export default Dashboard;