import React from "react"
import MainAppBar from "./../components/MainAppBar"
import TransactionInfo from "./../components/TransactionInfo"
import Transactions from "./../components/Transactions"
import {Paper,Grid} from "@material-ui/core"
import appStore from "./../redux/store/appStore"
import {reset} from "./../redux/actions/http-actions"
import env from "./../env/env"


export default class Account extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            transactions: [],
            accountInfo: {}
        }

        this.authenticateUser();
    }

    componentDidMount() {
        const { match: { params } } = this.props;

        appStore.subscribe(()=>{
            if (appStore.getState().http.update === "transactions")
            {
                this.getAccountInfo(params.id);
                this.getTransactions(params.id)
                appStore.dispatch(reset())
            }
        })

        this.getTransactions(params.id)
        this.getAccountInfo(params.id)
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

    getAccountInfo(accountID)
    {
        fetch(`${env.API_SERVER}/account/info/${accountID}`,{
            credentials : "include"
        })
        .then((response)=>response.json())
        .then((accountInfo)=>{
            this.setState({
                accountInfo
            })
        })
    }

    getTransactions(accountID) 
    {
        fetch(`${env.API_SERVER}/transaction/from-account/${accountID}`,
        {
            credentials : "include"
        })
        .then((response)=>response.json())
        .then((transactions)=>{
            this.setState({
                transactions
            })
        })
    }

    render() 
    {

        let transactionInfo = <TransactionInfo transactions={this.state.transactions} />

        return (
            <div>
                <MainAppBar title="Account" />
                {transactionInfo}
                <Grid container
                justify="center"
                >
                    <Paper style={{padding:"30px"}} variant="outlined" elevation={10}>
                        {this.state.accountInfo.description} 
                    </Paper>  
                </Grid>
                <Transactions transactions={this.state.transactions} accountInfo={this.state.accountInfo} history={this.props.history}/>
            </div>
        )
    }
}