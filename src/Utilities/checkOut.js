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
      getPostHeaders({})
    );
    const result = await response.data;
    
    return response;

  } catch (error) {
    return error.response;
  }
};
