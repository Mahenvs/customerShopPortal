import {createSlice} from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState:{
        ordersData: null
    },
    reducers:{
        setOrdersData: (state,action) =>{
            state.ordersData = action.payload
        }
    }
})

export const {setOrdersData} = cartSlice.actions;
export default cartSlice.reducer;