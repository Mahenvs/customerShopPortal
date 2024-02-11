import React from 'react'
import { setTheme } from '../store/appConfigSlice';
import {useDispatch} from 'react-redux';

const useGetTheme = () => {
  
    let currentTheme = localStorage.getItem("theme");
    const dispatch = useDispatch();
    if(currentTheme == null){
        currentTheme = 'light'
    }
    dispatch(setTheme(currentTheme));
    return;
}

export default useGetTheme
