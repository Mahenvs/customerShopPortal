import {createSlice } from '@reduxjs/toolkit';

const appConfigSlice = createSlice({
    name:'appConfig',
    initialState: {
        theme: 'blue'
    },
    reducers:{
        setTheme: (state,action) => {
            state.theme = action.payload
        }
    }
})
export const {setTheme} = appConfigSlice.actions;
export default appConfigSlice.reducer;