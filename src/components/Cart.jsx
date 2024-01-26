import { useSelector, useDispatch } from "react-redux";
import { addToCart, clearCart, removeFromCart } from "../store/storeSlice";

const Cart = () => {
  const cartData = useSelector((store) => store.store.cart);

  const dispatch = useDispatch();

  const handleItemsFromCart = (item, flag) => {
    if (flag == "increase") {
      dispatch(addToCart(item));
    } else {
      dispatch(removeFromCart(item));
    }
  };

  const clearCartHandler = () => {
    console.log(cartData.length);
    if(cartData)
      dispatch(clearCart())
  }
  return (
    <div className="f lex p-2 ">
      <section className="flex justify-between">
        <h1 className="text-xl font-semibold">Cart</h1>
        <button className="underline" onClick={clearCartHandler}>Clear Cart</button>
      </section>
      {cartData.map((item, index) => {
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
      })}
    </div>
  );
};
export default Cart;
