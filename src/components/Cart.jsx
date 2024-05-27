import { useSelector, useDispatch } from "react-redux";
import {
  addSingleItemToCart,
  clearCartStore,
  removeSingleItemFromCart,
} from "../store/storeSlice";
import useGetCart from "../Hooks/useGetCart";
import { clearCart } from "../Utilities/clearCart";
import { setMessage } from "../store/appConfigSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastInfoMessage } from "../Utilities/ToastMessage";
import _debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import { updateCartDb } from "../Utilities/updateCart";

import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import CartTotal from "./CartTotal";

const Cart = () => {
  useGetCart();

  const list = useSelector((store) => store.store.cartList);
  const cartTotal = useSelector((store) => store.store.cartTotalPric);
  const isLoggedIn = useSelector((store) => store.appConfig.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const initialCounts = {};
    list.forEach((item) => {
      initialCounts[item.productName] = item.productCartQuantity || 1;
    });
    setCounts(initialCounts);
  }, [list]);
  const handleItemsFromCart = async (item, flag, newCnt) => {
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

  const updateCart = _debounce(async (item, flag) => {
    new Promise((resolve, reject) => {
      setCounts((prevCounts) => {
        const newCounts = { ...prevCounts };

        if (flag === "increase") {
          newCounts[item.productName] = newCounts[item.productName] + 1;
        } else {
          newCounts[item.productName] = newCounts[item.productName] - 1;
        }
        resolve(newCounts);
        return newCounts;
      });
    }).then((newCounts) => {
      handleItemsFromCart(item, flag, newCounts);
    });
  }, 500);

  const clearCartHandler = async () => {
    if (list.length != 0) {
      await clearCart(list);
      dispatch(clearCartStore());
      toast.warn("Cleared Cart!", ToastInfoMessage);
      dispatch(
        setMessage({ message: "Cleared Cart", status: true, type: "info" })
      );
    }
  };

  const goToCartHandler = () => {
    navigate("cart");
  };

  return (
    <div className=" p-2 ">
      <section className="flex justify-between">
        <h1 className="text-xl font-semibold">Cart</h1>
        {list.length != 0 && (
          <button className="underline" onClick={clearCartHandler}>
            Clear Cart
          </button>
        )}
      </section>
      <div
        className={` ${
          list.length != 0
            ? ` flex flex-col overflow-x-auto max-h-[360px] border-b border-b-slate-400 dark:border-darkBorder`
            : ``
        }`}
      >
        {list?.map((item, index) => {
          return <CartItem key={index} item={item} updateCart={updateCart} />;
        })}
      </div>
      {list.length != 0 ? (
        <CartTotal cartTotal={cartTotal} goToCartHandler={goToCartHandler} />
      ) : (
        <EmptyCart isLoggedIn={isLoggedIn} />
      )}
    </div>
  );
};
export default Cart;
