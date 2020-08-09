import React from "react"
import SummaryComponent from "./SummaryComponent"

export default class TransactionInfo extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            balance : 0,
            balanceColor : "red"
        }
    }

    normalizeProps(props)
    {
        let balance = 0;
        let transactions = props.transactions

        let balances = transactions.map((transaction)=> {
            return transaction.amount
        })

        for(let i = 0; i < balances.length; i++)
        {
            balance += balances[i];
        }

        this.setState({
            balance,
            balanceColor : balance > 0 ? "green" : "red"
        })

        return balance
    }

    componentWillReceiveProps(nextProps)
    {
        this.normalizeProps(nextProps)
    }

    componentDidMount()
    {

    }

    render()
    {
        return(
            <div>
                <SummaryComponent title="Transaction Summary" balance={this.state.balance} balanceColor={this.state.balanceColor}/>
            </div>
        )
    }
}