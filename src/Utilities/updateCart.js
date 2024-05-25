import axios from "axios";
import { headers } from "./getHeaders";

export async function updateCartDb(item, cartList, flag, quantityIs) {
  const customer = localStorage.getItem("customerId");
  const storeId = JSON.parse(localStorage.getItem("store")).storeId;
  const cartUrl = import.meta.env.VITE_API_ADD_CART;
  const cartDeleteUrl =
    import.meta.env.VITE_API_ADD_CART +
    "/" +
    item?.productId +
    `?storeId=` +
    storeId +
    `&customerId=` +
    customer;

  let quantity = quantityIs;

  if (quantity <= 0) {
    const resp = await axios.delete(cartDeleteUrl, headers());

    if (resp.status != 200) {
      return;
    } else {
      return resp.data;
    }
  } else {
    try {
      const resp = await axios.post(
        cartUrl,
        {
          customerId: customer,
          storeId: storeId,
          productId: item?.productId,
          quantity: quantityIs,
        },
        headers()
      );
      if (resp.status != 200) {
        return;
      } else {
        return resp.data;
      }
    } catch (error) {
      return error;
    }
  }
}
