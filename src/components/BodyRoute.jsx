import { Outlet } from "react-router-dom";
import CustomerNavBar from './CustomerNavBar';

const BodyRoute = () => {
  return (
    <div className="dark:bg-darkGray min-h-screen dark:text-darkWhite  mb-5">
        <CustomerNavBar />
        <Outlet/>
    </div>
  )
}

export default BodyRoute
