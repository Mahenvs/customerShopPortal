import axios from "axios";
import { getPostHeaders } from "./getHeaders";

export const checkOutCart = async (paymentMethod) => {
  const customerId = localStorage.getItem("customerId");
  const storeId = JSON.parse(localStorage.getItem("store")).storeId;
  const checkOutUrl =
    import.meta.env.VITE_API_CHECKOUT_CART +
    "?storeId=" +
    storeId +
    "&customerId=" +
    customerId;
  try {
    const response = await axios.post(
      checkOutUrl,
      {
        paymentMethod: paymentMethod,
      },
      getPostHeaders()
    );
    // console.log(data.message,data.status);
    
    // if (!response.ok) {
    //   throw new Error("Network response was not ok.");
    // }
    const result = await response.data;
    console.log(result);
    return response;

  } catch (error) {
    console.log(error.response.data,error.response.status);
    return error.response;
  }
};
