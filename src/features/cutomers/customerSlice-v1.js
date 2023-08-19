const initialStateCustomer = {
    fullName: null,
    nationalId: null,
    createdAt: null
}

export default function customerReducer( state = initialStateCustomer, action){
    switch(action.type){
        case "cutomer/createCustomer":
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalId: action.payload.nationalId,
                createdAt: action.payload.createdAt
            }
        case "customer/updateCustomer":
            return {
                ...state,
                fullName: action.payload
            }
        default:
            return state
    }
}

const createCustomer = (fullName, nationalId) => {
    return {
        type: "cutomer/createCustomer",
        payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString()
        }
    }
}
const updateCustomer = (fullName) => {
    return {
        type: "customer/updateCustomer",
        payload: fullName
    }
}

export {createCustomer, updateCustomer}