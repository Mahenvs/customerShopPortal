import axios from "axios";
import { headers } from "./getHeaders";

export async function clearCart(cartList) {
  const customer = localStorage.getItem("customerId");
  const storeId = JSON.parse(localStorage.getItem("store")).storeId;

  console.log(cartList);
  const cartDeleteUrl =
    import.meta.env.VITE_API_DELETE_CART +
    '0' +
    `?storeId=` +
    storeId +
    `&customerId=` +
    customer;

  const resp = await axios.delete(cartDeleteUrl, headers());
  console.log(resp.status);
  if (resp.status != 200) {
    return;
  } else {
    return resp.data;
  }

  // console.log(data);
}
