import { useState } from 'react';
import CustomFormControl from "../UI_Elements/CustomFormControl"
import {  useLocation, useNavigate } from "react-router-dom"
import { setStoreId } from '../store/storeSlice';
import {useDispatch} from 'react-redux';

const storeState = {
  "name":'',
  "address":'',
  "adminId":''
} 
const NewShop = () => {
  
  const createStoreUrl = import.meta.env.VITE_CREATE_STORE;
  
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState(storeState);

  const location = useLocation();
  const receivedData = location.state?.data;

  const handleInputChange = (flag, value) => {
    setFormData(prevValues => ({
        ...prevValues,
        [flag]: value
    }));
}


  async function createShop() {

    const username = 'user';
    const password = 'market';
    const basicAuthToken = btoa(`${username}:${password}`);
    
    const data = await fetch(createStoreUrl, {
      method: "POST",
      body: JSON.stringify({
        "name": formData.name,
        "address": formData.address,
        "adminId" : receivedData

      }),
      headers: {
        'Authorization': `Basic ${basicAuthToken}`,
        'Content-Type': 'application/json'
      },
    })
    const response = await data.json();

    if(data.status === 200 ){
      setErrorMsg(null);
      dispatch(setStoreId(response.id));
      navigate("/products")
    }
    else{
      if(formData.name.length < 3){
        setErrorMsg("Store Name must be minimum of length 3");  
      }
      else if(formData.address.length < 3){
        setErrorMsg("Store Address must be minimum of length 3");
      }
      else{
        setErrorMsg(response.message);
      }
      throw new Error("Status is not 200");
    }
  }
  return (
    <div className=" w-full mx-auto pb-6 px-16 bg-gray-800 
    pt-8 my-36 flex flex-col text-white justify-center rounded
    md:w-4/12 md:py-8">
      <form className="bg-gr ay-800 ">
          <span className=' mb-4 text-xl font-bold text-g ray-600  '>
            Almost there!!! Unveil the magic of your shop!
          </span>
          <div className="mb-4 mt-5">
            <label htmlFor="field1" className="block text-sm font-medium ">
              Store Name
            </label>
            <CustomFormControl
              type="text"
              id="store_name"
              title="Store Name"
              extraClass="mb-2" // Add any additional Tailwind classes needed
              inputChange={(event) => handleInputChange('name',event.target.value)}
              inputBlur={(event) => handleInputChange('name',event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="field2" className="block text-sm font-medium ">
              Address
            </label>
            <CustomFormControl
              type="text"
              id="address_store"
              title="Address"
              extraClass="mb-2" 
              inputChange={(event) => handleInputChange('address',event.target.value)}
              inputBlur={(event) => handleInputChange('address',event.target.value)}
            />
            {errorMsg != null && (
            <p className="text-red-500 font-semibold -mt-3 mb-2">{errorMsg}</p>
          )}
          </div>
          
          <div className="flex justify-end">

            <button type="button" className="bg -gray-600 border px-4 font-mono text-lg rounded-md text-teal-50"
              onClick={createShop}>
              Create
            </button>
          </div>
        </form>
    </div>
  );
};

export default NewShop;
