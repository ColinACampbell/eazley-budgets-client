export const OPEN_ADD_AC_MODAL = "open_add_ac_modal" // TODO give these proper names
export const CLOSE_ADD_AC_MODAL = "close_add_ac_modal"

export const OPEN_TRANS_MODAL = "open_transaction_modal"
export const CLOSE_TRANS_MODAL = "close_transaction_modal"

export const OPEN_CONFIRM_MODAL = "open_confirm_modal"
export const CLOSE_CONFIRM_MODAL = "close_confirm_modal"


export const toggleModal = (action) =>
{
    switch (action)
    {
        case "open_add_ac_modal" : return {
            type : "OPEN_ADD_ACCOUNT_MODAL"
        } 

        case "close_add_ac_modal" : return {
            type : "CLOSE_ADD_ACCOUNT_MODAL"
        }

        case "open_transaction_modal" : return {
            type : "OPEN_ADD_TRANSACTION_MODAL"
        }

        case "close_transaction_modal" : return {
            type : "CLOSE_ADD_TRANSACTION_MODAL"
        }

        case "open_confirm_modal" : return {
            type : "OPEN_CONFIRM_MODAL"
        }

        case "close_confirm_modal" : return {
            type : "CLOSE_CONFIRM_MODAL"
        }

        default : return {
            type : "CLOSE_ADD_ACCOUNT_MODAL"
        }
    }
}