import { useEffect, useState } from "react";
import CustomFormLabel from "../UI_Elements/CustomFormLabel";
import CustomFormControl from "../UI_Elements/CustomFormControl";
import { useLocation, useNavigate } from "react-router-dom";
import { setCustomerId } from "../store/storeSlice";
import { useDispatch } from "react-redux";
import { validatingInputs } from "../Utilities/validatingFields";
import { getPostHeaders } from "../Utilities/getHeaders";

const initialState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  address: "",
  
}
const UpdateProfile = () => {
  
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState(null);
  
  const storeDomain = JSON.parse(localStorage.getItem("store")).storeDomain;
  const storeId = JSON.parse(localStorage.getItem("store")).storeId;

  const handlerInput = (flag, value) => {
    setFormData((prevValues) => ({
      ...prevValues,
      [flag]: value,
    }));
  };
  useEffect(()=>{
    const prevFormData = location.state;
    setFormData((prevValues) => ({
      ...prevValues,
      email: prevFormData.email,
      password:prevFormData.password,
      storeId : storeId 
    }));
  },[])
  const signUp = async () => {
    const errorIs = validatingInputs(formData);
    setErrorMsg(errorIs);
    if (errorIs.length > 0) {
      return;
    }

    const signUpUrl = import.meta.env.VITE_SIGNUP;// + "?storeId=" + storeId;

    const data = await fetch(signUpUrl, getPostHeaders(formData));
    const response = await data.json();

    if (data.status === 201) {
      dispatch(setCustomerId(response.id));
      localStorage.setItem("customerId", response.id);

      navigate("/" + storeDomain);
    } else {
      // console.log(response.message);
    }
  };
  return (
    <div className="mx-auto  w-1/3 py-10 flex justify-center ">
      <form
        id="loginModal"
        className="border-zinc-100 rounded bg-gray-700  px-12 py-4 justify-center flex flex-col text-white 
        dark:bg-gray-950 dark:border-darkBorder dark:shadow-zinc-600 dark:border dark:rounded  "
      >
        <h3 className="text-white text-2xl  justify-start  mt-1 font-bold mb-2">
          {"One More Step..."}
        </h3>

        <div className="mx-auto">
          <CustomFormLabel label="First Name" />
          <CustomFormControl

            type="text"
            name="name"
            value={formData.firstName}
            inputChange={(event) => handlerInput("firstName", event.target.value)}
          />
          <CustomFormLabel label="Last Name" />
          <CustomFormControl

            type="text"
            name="name"
            value={formData.lastName}
            inputChange={(event) => handlerInput("lastName", event.target.value)}
          />
          <CustomFormLabel label="Address" />
          <CustomFormControl

            type="text"
            name="address"
            value={formData.address}
            inputChange={(event) => handlerInput("address", event.target.value)}
          />

          <CustomFormLabel label="Phone Number" />
          <CustomFormControl

            type="tel"
            name="phone"
            value={formData.phoneNumber}
            inputChange={(event) =>
              handlerInput("phoneNumber", event.target.value)
            }
          />
          {errorMsg != null && (
            <p className="text-red-500 font-semibold -mt-3 mb-2">{errorMsg}</p>
          )}
        </div>
        <div className="flex justify-end my-2">
          <button
            className="bg-white px-8 font-mono text-lg rounded-md text-black"
            onClick={signUp}
            type="button"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
