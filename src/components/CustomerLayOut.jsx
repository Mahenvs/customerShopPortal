import { Outlet } from "react-router-dom";
import Footer from "./Footer"
import Message from '../UI_Elements/Message';
const Layout = () => {
  return (
    <div className='flex flex-col h-screen shadow'>
      <Message/>
      <div className="h -screen flex flex-col flex-1">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
