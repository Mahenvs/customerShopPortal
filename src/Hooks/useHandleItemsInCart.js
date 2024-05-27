import { useDispatch } from "react-redux";
import {
  addSingleItemToCart,
  removeSingleItemFromCart,
} from "../store/storeSlice";
import { ToastInfoMessage } from "../Utilities/ToastMessage";
import { updateCartDb } from "../Utilities/updateCart";
import { toast } from "react-toastify";

export const useHandleItemsInCart = async (item, flag, newCnt) => {
  const dispatch = useDispatch();
  const cnt = newCnt[item.productName];
  if (flag == "increase") {
    const response = await updateCartDb(item, list, "add", cnt);

    if (response?.message == "Request failed with status code 404") {
      toast.warn("Network failed", ToastInfoMessage);
    } else {
      dispatch(
        addSingleItemToCart({ ...response, productName: item.productName })
      );
    }
  } else {
    const response = await updateCartDb(item, list, "remove", cnt);
    dispatch(
      removeSingleItemFromCart({ ...response, productName: item.productName })
    );
  }
};
