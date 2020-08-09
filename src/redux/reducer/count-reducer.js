export const counter = ( state = {count : 0, name : "Colin"}, action) =>{
    switch(action.type)
    {
        case "INCREMENT" : return {
            ...state,
            count : state.count + 1,
            name : state.name
        }
        default : return { count : 0 };
    }
}