import {useLocation} from 'react-router-dom';
import useGetStore from "../Hooks/useGetStore";
import CustomFormControl from "../UI_Elements/CustomFormControl";
import shop from "../assets/shop.jpg";
import useGetProducts from '../Hooks/useGetProducts';
import {useSelector} from 'react-redux';
import { useState } from 'react';

const CustomerNavBar = () => {
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const pathArr = location.pathname.split('/'); 
  
  const storeDomain = pathArr[pathArr.length-1]; 
  

  useGetStore(storeDomain, () => setIsLoading(false));
  const storeId = useSelector((store) => store.store.storeId);
  return <>
      {!isLoading ? (
        <div>Loading...</div>
      ) : <div className="flex h-20 border- b border-b-2  items-center">
        <section className="w-1/5 ml-40 mr-10 flex items-center">
          <img src={shop} width="50px" />Image
        </section>
        <section className="w-2/5  mx-14">
          <input type='text' className='w-full border px-3 py-2 bg-gray-100 rounded placeholder:font-normal text-lg' placeholder="Search for products"/>
        </section>
        <section className="font-medium text-lg w-2/5 flex mx-14 gap-10 text-white-500">
          <span>Categories</span>
          <span>Cart</span>
          <span>Account</span>
        </section>
      </div>}
    </>
  
};

export default CustomerNavBar;
