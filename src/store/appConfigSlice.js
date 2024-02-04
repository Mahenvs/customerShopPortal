import {createSlice } from '@reduxjs/toolkit';

const appConfigSlice = createSlice({
    name:'appConfig',
    initialState: {
        theme: 'blue',
        popUp: {
            message: null,
            status: false,
            type: null
        }
    },
    reducers:{
        setTheme: (state,action) => {
            state.theme = action.payload
        },
        setMessage: (state,action) => {
            state.popUp.message = action.payload.message,
            state.popUp.status= action.payload.status
            state.popUp.type = action.payload.type
        }
    }
})
export const {setTheme,setMessage} = appConfigSlice.actions;
export default appConfigSlice.reducer;