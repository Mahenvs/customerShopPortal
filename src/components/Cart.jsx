import { useSelector, useDispatch } from "react-redux";
import {
  addSingleItemToCart,
  clearCartStore,
  removeSingleItemFromCart,
} from "../store/storeSlice";
import useGetCart from "../Hooks/useGetCart";
import { addToCart1 } from "../Utilities/addToCart";
import { clearCart } from "../Utilities/clearCart";
import { setMessage } from "../store/appConfigSlice";

const Cart = () => {
  useGetCart();

  const list = useSelector((store) => store.store.cartList);

  console.log(list);
  const dispatch = useDispatch();

  const handleItemsFromCart = async (item, flag) => {
    console.log(list);
    if (flag == "increase") {
      const response = await addToCart1(item, list, "add");
      console.log(response);
      if (response?.message == "Request failed with status code 404") {
        console.log("fghjklkjhgf");
        dispatch(
          setMessage({ message: "Out of Stock", status: true, type: "warning" })
        );
      } else {
        dispatch(
          addSingleItemToCart({ ...response, productName: item.productName })
        );
      }
    } else {
      const response = await addToCart1(item, list, "remove");
      dispatch(
        removeSingleItemFromCart({ ...response, productName: item.productName })
      );
    }
  };

  const clearCartHandler = async () => {
    if (list.length != 0 ) {
    const data = await clearCart(list);
    dispatch(clearCartStore());
    dispatch(
      setMessage({ message: "Cleared Cart", status: true, type: "info" })
    );
  }
  };
  return (
    <div className="f lex p-2 ">
      <section className="flex justify-between">
        <h1 className="text-xl font-semibold">Cart</h1>
        <button className="underline" onClick={clearCartHandler}>
          Clear Cart
        </button>
      </section>
      {list?.map((item, index) => {
        return (
          <div key={index} className="flex mt-5 justify-between">
            <section className="font-mono">
              <p>{item?.productName}</p>
              <p>${item?.productCartPrice.toFixed(2)}</p>
            </section>
            <section className="self-end border border-gray-400 rounded justify-end flex px -2 ">
              <button
                className="h-fit   px-2 border-r-2 "
                onClick={() => handleItemsFromCart(item, "decrease")}
              >
                -
              </button>
              <button className=" h-fit bg-blue-100  px-2 border-r-2">
                {" "}
                {item?.productCartQuantity}
              </button>
              <button
                className=" h-fit  px-2"
                onClick={() => handleItemsFromCart(item, "increase")}
              >
                +
              </button>
            </section>
          </div>
        );
      })}
      {/* {cartData.map((item, index) => {
        return (
          <div key={index} className="flex mt-5 justify-between">
            <section className="font-mono">
              <p>{item?.productName}</p>
              <p>${item?.productPrice}</p>
            </section>
            <section className="self-end border border-gray-400 rounded justify-end flex px -2 ">
              <button
                className="h-fit   px-2 border-r-2 "
                onClick={() => handleItemsFromCart(item, "decrease")}
              >
                -
              </button>
              <button className=" h-fit bg-blue-100  px-2 border-r-2">
                {" "}
                {item?.quantity}
              </button>
              <button
                className=" h-fit  px-2"
                onClick={() => handleItemsFromCart(item, "increase")}
              >
                +
              </button>
            </section>
          </div>
        );
      })} */}
    </div>
  );
};
export default Cart;
