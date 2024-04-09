import axios from "axios";
import { headers } from "./getHeaders";

export async function clearCart(cartList) {
  const customer = localStorage.getItem("customerId");
  const storeId = JSON.parse(localStorage.getItem("store")).storeId;

  const cartDeleteUrl =
    import.meta.env.VITE_API_ADD_CART +
    '/0' +
    `?storeId=` +
    storeId +
    `&customerId=` +
    customer;

  const resp = await axios.delete(cartDeleteUrl, headers());
  
  if (resp.status != 200) {
    return;
  } else {
    return resp.data;
  }

}
