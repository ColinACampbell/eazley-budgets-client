import React from "react"
import {Alert, AlertTitle} from "@material-ui/lab"

export default class SimpleAlert extends React.Component {


    severities = {
        success : "success",
        warning : "warning"
    }

    

    render() {
        return (
            <div>
                <Alert severity={this.severities[this.props.type]}>
                    <AlertTitle>{this.props.title}</AlertTitle>
                    <div>
                        {this.props.description}
                    </div>
                </Alert>
            </div>
        )
    }
}