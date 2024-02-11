import { useEffect } from "react";
import { getHeaders } from "../Utilities/getHeaders";
import { useDispatch } from "react-redux";
import axios from "axios";
import { availablePaymentMethods } from "../store/storeSlice";

export const useGetPaymentMethods = () => {

  const dispatch = useDispatch();
    
  const getData = async () => {
    const getInfoUrl = import.meta.env.VITE_API_PAYMENT_TYPES;
    
    await axios.get(getInfoUrl, getHeaders())
    .then((response) => {
        const data1  = [{methodId:'null',methodName:'Open dropdown'},...response.data]
        dispatch(availablePaymentMethods(data1));
      })
      .catch((error) => {
        // Handle error
      });
  };
  useEffect(() => {
    getData();

  },[]);
};
