import React from "react"
import SummaryComponent from "./SummaryComponent"

// Account Info Component can be used to represent accounts and transactions 

class AccountInfo extends React.Component {
    constructor(props) {
        super(props)

        const balance = this.normalizeProps(this.props)

        this.state = {
            accounts: this.props.accounts,
            balance,
            balanceColor: balance > 0 ? "green" : "red"
        }

    }

    componentWillReceiveProps(nextProps) {
        const balance = this.normalizeProps(nextProps)

        this.setState({
            accounts: nextProps.accounts,
            balance,
            balanceColor: balance > 0 ? "green" : "red"
        })
    }


    normalizeProps(props) {
        let balance = 0;
        let accountsBalances = props.accounts.map((account) => { return account.funds })

        for (let i = 0; i < accountsBalances.length; i++) {
            balance += accountsBalances[i];
        }

        return balance
    }

    render() {
        return (
            <div>
                <SummaryComponent title="Account Summary" balanceColor={this.state.balanceColor} balance={this.state.balance} />
            </div>
        )
    }
}

export default AccountInfo