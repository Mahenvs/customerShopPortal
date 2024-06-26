import axios from "axios";
import { headers } from "./getHeaders";

export async function addToCart1(item, cartList, flag, addQuantity) {
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
  const cnt = cartList.filter((prod) => {
    return item?.productId == prod?.productId;
  });

  let quantity = addQuantity;
  if (flag == "addQ") {
    quantity = addQuantity;
  }
  if (flag == "add") {
    if (cnt.length != 0) {
      if (addQuantity == -1) {
        quantity = addQuantity;
      } else {
        quantity = cnt?.[0].productCartQuantity + addQuantity;
      }
    }
  }
  if (flag == "remove") {
    if (cnt.length >= 1) {
      if (addQuantity > 0) {
        quantity = cnt?.[0].productCartQuantity - addQuantity;
      } else {
        quantity = addQuantity;
      }
    }
  }
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
          quantity: quantity,
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
