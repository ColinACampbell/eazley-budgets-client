import React from "react"
import {Grid} from "@material-ui/core"

export default function SummaryComponent(props) {

    return (
        <Grid container justify="flex-start" style={{marginTop:"100px"}}>
            <Grid container justify="center" direction="column" alignContent="center">
                <h1 style={{ textAlign: "center" }}> {props.title} </h1>
                <div>
                    <h1 style={{ fontSize: "400%", marginTop: "20px", textAlign: "center", color: props.balanceColor }}> $ {props.balance} </h1>
                </div>
            </Grid>
        </Grid>
    )
}