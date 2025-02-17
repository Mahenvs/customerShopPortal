import { GoogleLogin } from "@react-oauth/google";
import SignUp from "./SignUp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function RedirectHome() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  let storeDomainResource = JSON.parse(
    localStorage.getItem("store")
  )?.storeDomain;

  const handleLogin = () => {
    if (localStorage.getItem("customerId") != undefined) {
      setLoggedIn(true);
    }

    // Commented becoz added the same in CustomerViewProducts
    // navigate(`/${storeDomainResource}/auth?signIn`);
  };
  if (isLoggedIn == true) {
    navigate(`/${storeDomainResource}`);
    return null;
  }

  return (
    <>
      <SignUp onLogin={handleLogin} />
      <div className="-mt-6 flex justify-center">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            // const x = " ";
            console.log(credentialResponse);
            const decodedHeader = jwtDecode(credentialResponse.credential);
            // call or update the logic here to set hte customerID

            console.log(decodedHeader);
            navigate(`/${storeDomainResource}`);
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </>
  );
}
