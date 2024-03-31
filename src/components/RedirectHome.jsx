import SignUp from "./SignUp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function RedirectHome() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
  
    let storeDomainResource  = JSON.parse(localStorage.getItem('store'))?.storeDomain
    
    const handleLogin = () => {
      if (localStorage.getItem("customerId") != undefined) {
        setLoggedIn(true);
      }
      navigate(`/${storeDomainResource}/auth?signIn`);
    };
    if (isLoggedIn == true) {
      navigate(`/${storeDomainResource}`);
      return null; 
    }
  
    return <SignUp onLogin={handleLogin} />;
  }