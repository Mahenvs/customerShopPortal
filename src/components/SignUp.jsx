import { Link, useNavigate } from "react-router-dom";

import CustomFormControl from "../UI_Elements/CustomFormControl";
import CustomFormLabel from "../UI_Elements/CustomFormLabel";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCustomerId } from "../store/storeSlice";
import { setLoggedIn } from "../store/appConfigSlice";
import { validatingInputs } from "../Utilities/validatingFields";
import { compareInputs } from "../Utilities/compareInputs";
import { getPostHeaders } from "../Utilities/getHeaders";

const InitialState = {
  email: "",
  password: "",
  cnfpassword: "",
};

const SignUp = ({ onLogin }) => {
  const storeData = JSON.parse(localStorage.getItem("store"));
  const dispatch = useDispatch();
  const storeDomain = storeData?.storeDomain;
  const storeId = storeData?.storeId;

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
    setErrorMsg(null);
    setEdited({
      email: false,
      password: false,
      cnfpassword: false,
    });
    if (!isLogin) navigate("?signUp");
    else navigate("?signIn");
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
    if (mailError || pswdError) {
      return;
    }
    const errorIs = validatingInputs(formData);
    setErrorMsg(errorIs);
    if (errorIs.length > 0) {
      return;
    }
    if (!compareInputs(formData.password, formData.cnfpassword)) {
      setErrorMsg("Passwords not matching");
      return;
    }
    navigate("/updateProfile", {
      state: formData,
    });
  }

  const Login = async () => {
    const errorIs = validatingInputs(formData);
    setErrorMsg(errorIs);
    if (errorIs.length > 0) {
      return;
    }

    const data = await fetch(
      signInUrl,
      getPostHeaders({
        email: formData.email,
        password: formData.password,
        storeId:storeId,
      })
    );
    const response = await data.json();

    if (data.status === 200) {
      const resp = JSON.parse(response.details);
      setErrorMsg(null);
      dispatch(setCustomerId(resp.CustomerId));
      localStorage.setItem("customerId", resp.CustomerId);
      navigate(`/${storeDomain}`);
      dispatch(setLoggedIn(true));
    } else {
      setErrorMsg(response.message);
      throw new Error("Status is not 200");
    }
  };

  useEffect(() => {
    onLogin();
  }, []);
  return (
    <>
      <div className="mx-auto  w-1/3 py-10 flex justify-center  ">
        <form
          id="loginModal"
          className="border-zinc-100 rounded   px-12 py-4 justify-center flex flex-col text-skin-base bg-skin-fill  dark:bg-gray-950 dark:border-darkBorder dark:shadow-zinc-600 dark:border dark:rounded "
        >
          <h3 className="text-skin-base text-2xl  justify-start  mt-1 font-bold mb-2">
            {!isLogin ? "Sign In" : "Sign Up"}
          </h3>

          <CustomFormLabel label="Email" />
          <CustomFormControl
            class={mailError ? "error" : ""}
            type="text"
            name="email"
            value={formData.email}
            inputChange={(event) => handlerInput("email", event.target.value)}
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
            value={formData.password}
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
                value={formData.cnfpassword}
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
                className="no-underline text-skin-base"
                onClick={toggleAuth}
              >
                <strong> {!isLogin ? "Sign Up" : "Sign In"}</strong>{" "}
              </Link>
            </span>
            <button
              className="border px-8 font-mono text-lg rounded-md text-skin-base"
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
