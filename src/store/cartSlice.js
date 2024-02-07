import {createSlice} from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState:{
        ordersData: null
    },
    reducers:{
        setOrdersData: (state,action) =>{
            state.ordersData = action.payload
        },
        resetCart:(state) =>{
            state.ordersData = null
        }
    }
})

export const {setOrdersData,resetCart} = cartSlice.actions;
export default cartSlice.reducer;