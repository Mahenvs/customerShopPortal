import {createSlice } from '@reduxjs/toolkit';

const appConfigSlice = createSlice({
    name:'appConfig',
    initialState: {
        theme: 'light',
        popUp: {
            message: null,
            status: false,
            type: null
        },
        bottomPopUp: {
            status: true,
            type: null,
            bottommessage:null
        },
        isLoggedIn: false,
        isVerifiedUser: true,
        userName:"NA"
    },
    reducers:{
        setTheme: (state,action) => {
            state.theme = action.payload
        },
        setMessage: (state,action) => {
            state.popUp.message = action.payload.message,
            state.popUp.status= action.payload.status
            state.popUp.type = action.payload.type
        },
        setUserName: (state,aciton) =>{
            state.userName = aciton.payload;
        },
        setBottomMessage: (state,action) => {
            state.bottomPopUp.bottommessage = action.payload.message,
            state.bottomPopUp.status= action.payload.status
            state.bottomPopUp.type = action.payload.type
        },
        setLoggedIn: (state,action) => {
            state.isLoggedIn = action.payload;
        },
        setVerifiedUser:(state,action) => {
            state.isVerifiedUser = action.payload;
        },
        resetAppConfig: (state) =>{
            state.popUp.message = null,
            state.popUp.status= false
            state.popUp.type = null
        }
    }
})
export const {setTheme,setUserName,setMessage,resetAppConfig,setLoggedIn,setBottomMessage,setVerifiedUser} = appConfigSlice.actions;
export default appConfigSlice.reducer;