import { createStore, combineReducers } from "redux"
import navReducer from "../reducer/navReducer"
import httpReducer from "../reducer/httpReducer"


const rootReducer = combineReducers({
    nav : navReducer,
    http: httpReducer
});
const appStore = createStore(rootReducer);

export default appStore;