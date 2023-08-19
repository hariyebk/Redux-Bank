import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    fullName: null,
    nationalId: null,
    createdAt: null
}
const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        createCustomer: {
            prepare(fullName, nationalId){
                return{
                    payload: {
                        fullName, 
                        nationalId,
                        createdAt: new Date().toISOString()
                    }
                }
            },
            reducer(state, action){
                state.fullName = action.payload.fullName
                state.nationalId = action.payload.nationalId
            }
        },
        updateCustomer(state, action){
            state.fullName = action.payload.fullName
        }
    }
})

console.log(customerSlice)
export const {createCustomer, updateCustomer} = customerSlice.actions

export default customerSlice.reducer

