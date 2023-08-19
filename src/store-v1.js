import { createStore, combineReducers } from "redux"
import accountReducer from "./features/accounts/accountSlice"
import customerReducer from "./features/cutomers/customerSlice"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {applyMiddleware} from "redux"


const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store

