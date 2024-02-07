import React from 'react'
import { Outlet } from "react-router-dom";
import CustomerNavBar from './CustomerNavBar';

const BodyRoute = () => {
  return (
    <div>
        <CustomerNavBar />
        <Outlet/>
    </div>
  )
}

export default BodyRoute
