import { Outlet, useLocation } from "react-router-dom";
import CustomerNavBar from './CustomerNavBar';
import { useSelector } from "react-redux";

const BodyRoute = () => {
  
  const verifiedUser = useSelector((store)=>store.appConfig.isVerifiedUser);
  const location = useLocation();

  return (
    <div className="dark:bg-darkGray min-h-screen dark:text-darkWhite  mb-5">
      {!location.pathname.includes("auth") && !verifiedUser && <div className=" bg-maroon-300 border-b-2 text-slate-700 text-md text-pretty text-center p-2 dark:text-white">{"We have sent an verification email, please verify..."}</div>}
      
        <CustomerNavBar />
        <Outlet/>
    </div>
  )
}

export default BodyRoute
