const navReducer = ( state = { OPEN_ACC_MODAL : false, OPEN_TRANS_MODAL : false, OPEN_DEL_AC_MODAL : false },action) =>
{
    switch(action.type)
    {
        case "OPEN_ADD_ACCOUNT_MODAL" : return {
            ...state,
            OPEN_ACC_MODAL : true
        };
        case "CLOSE_ADD_ACCOUNT_MODAL" : return {
            ...state,
            OPEN_ACC_MODAL : false
        };

        case "CLOSE_ADD_TRANSACTION_MODAL" : return {
            ...state,
            OPEN_TRANS_MODAL : false
        };

        case "OPEN_ADD_TRANSACTION_MODAL" : return {
            ...state,
            OPEN_TRANS_MODAL : true
        };

        case "OPEN_CONFIRM_MODAL" : return {
            ...state,
            OPEN_CONFIRM_MODAL : true
        } 

        case "CLOSE_CONFIRM_MODAL" : return {
            ...state,
            OPEN_CONFIRM_MODAL : false
        }
        
        default : return state
    }
}

export default navReducer;