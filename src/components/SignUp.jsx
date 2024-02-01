import { Link, useNavigate } from "react-router-dom";

import CustomFormControl from "../UI_Elements/CustomFormControl";
import CustomFormLabel from "../UI_Elements/CustomFormLabel";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCustomerId } from "../store/storeSlice";

const InitialState = {
  email: "",
  password: "",
  cnfpassword: "",
};

const SignUp = () => {
    

  const storeData = JSON.parse(localStorage.getItem("store"));
    const dispatch =useDispatch();
  const storeDomain = storeData.storeDomain;
  const storeId = storeData.storeId;

  const signInUrl = import.meta.env.VITE_LOGIN + "?storeId=" + storeId;

  const [isLogin, setLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [formData, setFormData] = useState(InitialState);

  const [isEdited, setEdited] = useState({
    email: false,
    password: false,
    cnfpassword: false,
  });

  const toggleAuth = () => {
    setLogin((isLogin) => !isLogin);
    setFormData(InitialState);
    setEdited({
      email: false,
      password: false,
      cnfpassword: false,
    });
  };

  const handlerInput = (flag, value) => {
    setFormData((prevValues) => ({
      ...prevValues,
      [flag]: value,
    }));

    setEdited((prevValues) => ({
      ...prevValues,
      [flag]: true,
    }));
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mailError = isEdited.email && !emailPattern.test(formData.email);

  const pswdError = isEdited.password && formData.password.length < 5;
  const navigate = useNavigate();

  async function Register() {
    navigate("/updateProfile", {
      state: formData,
    });
  }

  const Login = async () => {
    console.log("inside login");
    const basicAuthToken = btoa(
      `${import.meta.env.VITE_USER}:${import.meta.env.VITE_PASSWORD}`
    );
    const data = await fetch(signInUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuthToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });
    const response = await data.json();
    const resp = JSON.parse(response.details)
    
    if (data.status === 200) {
      setErrorMsg(null);
      console.log(resp);
      dispatch(setCustomerId(resp.CustomerId));
      localStorage.setItem('customerId',resp.CustomerId)
      navigate(`/${storeDomain}`);

    } else {
      setErrorMsg(response.message);
      throw new Error("Status is not 200");
    }
  };

  return (
    <>
      <div className="mx-auto  w-1/3 py-10 flex justify-center ">
        <form
          id="loginModal"
          className="border-zinc-100 rounded bg-gray-700  px-12 py-4 justify-center flex flex-col text-white "
        >
          <h3 className="text-white text-2xl  justify-start  mt-1 font-bold mb-2">
            {!isLogin ? "Sign In" : "Sign Up"}
          </h3>

          <CustomFormLabel label="Email" />
          <CustomFormControl
            class={mailError ? "error" : ""}
            type="email"
            name="email"
            inputBlur={(event) => handlerInput("email", event.target.value)}
          />
          {mailError && (
            <p className="text-red-500 font-semibold -mt-3 mb-2">
              Enter a valid email address
            </p>
          )}

          <CustomFormLabel label="Password" />
          <CustomFormControl
            class={pswdError ? "error" : ""}
            type="password"
            name="pswd"
            inputChange={(event) =>
              handlerInput("password", event.target.value)
            }
          />
          {pswdError && (
            <p className="text-red-500 font-semibold -mt-3 mb-2">
              Enter a valid password
            </p>
          )}
          {errorMsg != null && (
            <p className="text-red-500 font-semibold -mt-3 mb-2">{errorMsg}</p>
          )}

          {isLogin ? (
            <>
              <CustomFormLabel label="Confirm Password" />
              <CustomFormControl
                type="password"
                inputChange={(event) =>
                  handlerInput("cnfpassword", event.target.value)
                }
              />
            </>
          ) : (
            ""
          )}

          <div className="items-center flex justify-between">
            <span>
              {!isLogin ? "Not a member" : "Member already"}?&nbsp;&nbsp;
              <Link
                className="no-underline text-[#f7f2f0d1]"
                onClick={toggleAuth}
              >
                <strong> {!isLogin ? "Sign Up" : "Sign In"}</strong>{" "}
              </Link>
            </span>
            <button
              className="bg-white px-8 font-mono text-lg rounded-md text-black"
              onClick={isLogin ? Register : Login}
              type="button"
            >
              {isLogin ? "Join" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
