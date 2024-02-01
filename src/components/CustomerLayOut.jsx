import CustomerNavBar from './CustomerNavBar';
import { Outlet } from "react-router-dom";
import Footer from "./Footer"
import Message from '../UI_Elements/message';
const Layout = () => {
  return (
    <div className='flex flex-col h-max shadow'>
      <Message/>
      <CustomerNavBar />
      <div className="h-screen flex flex-col">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
