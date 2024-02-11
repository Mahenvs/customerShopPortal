import { Outlet } from "react-router-dom";
import CustomerNavBar from './CustomerNavBar';

const BodyRoute = () => {
  return (
    <div className="dark:bg-darkGray h-screen dark:text-darkWhite">
        <CustomerNavBar />
        <Outlet/>
    </div>
  )
}

export default BodyRoute
