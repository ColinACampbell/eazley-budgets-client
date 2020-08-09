// http reducer is meant to send 'signals across components to live reload when an action is passed
const httpReducer = ( state = { update : "none"}, actions) => {
    switch(actions.type)
    {
        case "UPDATE_ACCOUNTS" : return {
            ...state,
            update : "accounts"
        }

        case "UPDATE_TRANSACTIONS" : return {
            ...state,
            update : "transactions"
        }
        
        case "RESET" : return {
            ...state,
            update : "none"
        }
        
        default : return state
    }
}

export default httpReducer;