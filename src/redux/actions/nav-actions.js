export const OPEN_MODAL = "open" // TODO give these proper names
export const CLOSE_MODAL = "close"
export const OPEN_TRANS_MODAL = "open_transaction_modal"
export const CLOSE_TRANS_MODAL = "close_transaction_modal"
export const OPEN_DEL_AC_MODAL = "open_delete_ac_modal"
export const CLOSE_DEL_AC_MODAL = "close_delete_ac_modal"


export const toggleAddAccModal = (action) =>
{
    switch (action)
    {
        case "open" : return {
            type : "OPEN_ADD_ACCOUNT_MODAL"
        } 
        case "close" : return {
            type : "CLOSE_ADD_ACCOUNT_MODAL"
        }

        case "open_transaction_modal" : return {
            type : "OPEN_ADD_TRANSACTION_MODAL"
        }

        case "close_transaction_modal" : return {
            type : "CLOSE_ADD_TRANSACTION_MODAL"
        }

        case "open_delete_ac_modal" : return {
            type : "OPEN_DELETE_ACCOUNT_MODAL"
        }

        case "close_delete_ac_modal" : return {
            type : "CLOSE_DELETE_ACCOUNT_MODAL"
        }

        default : return {
            type : "CLOSE_ADD_ACCOUNT_MODAL"
        }
    }
}