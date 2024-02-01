import { useState } from "react";
import CustomFormLabel from "../UI_Elements/CustomFormLabel";
import CustomFormControl from "../UI_Elements/CustomFormControl";
import { useLocation,useNavigate } from "react-router-dom";
import { setCustomerId } from "../store/storeSlice";
import { useDispatch } from "react-redux";

const UpdateProfile = () => {
  // const storeId = useSelector((store) => store.store.storeId);

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const prevFormData = location.state;
  const storeDomain = JSON.parse(localStorage.getItem('store')).storeDomain;
  
  const handlerInput = (flag, value) => {
    setFormData((prevValues) => ({
      ...prevValues,
      [flag]: value,
    }));

  };

  const signUp = async () => {
    const basicAuthToken = btoa(
      `${import.meta.env.VITE_USER}:${import.meta.env.VITE_PASSWORD}`
    );
    const storeId = JSON.parse(localStorage.getItem("store")).storeId;
    const signUpUrl = import.meta.env.VITE_SIGNUP + "?storeId=" + storeId;
    
    const data = await fetch(signUpUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuthToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        email: prevFormData.email,
      password: prevFormData.password,
      
      }),
    });
    const response = await data.json();

    if (data.status === 201) {
      // navigate("/"+storeDomain)
      dispatch(setCustomerId(response.CustomerId));
      localStorage.setItem('customerId',response.CustomerId)
      navigate("/"+storeDomain)
    } else {
      // console.log(response.message);
    }
  };
  return (
    <div className="mx-auto  w-1/3 py-10 flex justify-center ">
      <form
        id="loginModal"
        className="border-zinc-100 rounded bg-gray-700  px-12 py-4 justify-center flex flex-col text-white "
      >
        <h3 className="text-white text-2xl  justify-start  mt-1 font-bold mb-2">
          {"One More Step..."}
        </h3>

        <div className="mx-auto">
          <CustomFormLabel label="First Name" />
          <CustomFormControl
            // class={mailError ? "error" : ""}
            type="text"
            name="name"
            inputBlur={(event) => handlerInput("firstName", event.target.value)}
          />
          <CustomFormLabel label="Last Name" />
          <CustomFormControl
            // class={mailError ? "error" : ""}
            type="text"
            name="name"
            inputBlur={(event) => handlerInput("lastName", event.target.value)}
          />
          <CustomFormLabel label="Address" />
          <CustomFormControl
            // class={mailError ? "error" : ""}
            type="text"
            name="address"
            inputBlur={(event) => handlerInput("address", event.target.value)}
          />

          <CustomFormLabel label="Phone Number" />
          <CustomFormControl
            // class={mailError ? "error" : ""}
            type="text"
            name="phone"
            inputBlur={(event) =>
              handlerInput("phoneNumber", event.target.value)
            }
          />
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
