import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    // reducer functions, Redux creates action creators based on their corresponding reducer function names and sets the type of the action by combining the name of the slice with / the reducer name
    reducers: {
        deposit(state, action){
            state.balance += action.payload
            state.isLoading = false
        },
        withdraw(state, action){
            state.balance -= action.payload
        },
        // This tells the automatic action creator that we want to pass two arguments. 
        requestLoan: {
            prepare(amount, purpose){
                return {
                    payload: {amount, purpose}
                }
            },
            reducer(state, action){
            if(state.loan > 0) return
            state.loan = action.payload.amount
            state.balance += state.loan
            state.loanPurpose = action.payload.purpose
        }},
        payLoan(state){
            state.balance -= state.loan
            state.loan = 0
            state.loanPurpose = ""
        },
        convertingCurrency(state){
            state.isLoading = true
        }
    }
})

export const {withdraw, requestLoan, payLoan} = accountSlice.actions

export default accountSlice.reducer

export const deposit = (amount, currency) => {
    if(currency === "USD") return {
        type: "account/deposit", 
        payload: amount
    }
    // Redux Middleware
    return async function(dispatch, getState){
        dispatch({type: "account/convertingCurrency"})
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
        const data = await res.json()
        const convertedAmount = data.rates.USD
        dispatch({type: "account/deposit", payload: convertedAmount})
    }
}
console.log(accountSlice)
