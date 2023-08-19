const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
}

export default function accountReducer (state = initialStateAccount, action){
    switch(action.type){
        case "account/deposit":
            return{
                ...state,
                balance: state.balance + action.payload,
                isLoading: false
            }
        case "account/withdraw":
            return {
                ...state,
                balance: state.balance - action.payload
            }
        case "account/requestLoan":
            if(state.loan > 0) return
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount
            }
        case "account/payLoan":
            return {
                ...state,
                loan: 0,
                loanPurpose: null,
                balance: state.balance - state.loan
            }
        case "accounts/convertingCurrency":
            return {
                ...state,
                isLoading: true
            }
        default:
            return state
    }

}

const deposit = (amount, currency) => {
    if(currency === "USD") return {
        type: "account/deposit", 
        payload: amount
    }
    // Redux Middleware
    return async function(dispatch, getState){
        dispatch({type: "accounts/convertingCurrency"})
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
        const data = await res.json()
        const convertedAmount = data.rates.USD
        dispatch({type: "account/deposit", payload: convertedAmount})
    }
}
const withdraw = (amount) => {
    return {
        type: "account/withdraw", 
        payload: amount
    }
}
const requestLoan = (amount, purpose) => {
    return {
        type: "account/requestLoan", 
        payload: {
            amount: amount,
            purpose: purpose
        }

    }
}
const payLoan = () => {
    return {
        type: "account/payLoan"
    }
}

export {deposit, withdraw, requestLoan, payLoan}