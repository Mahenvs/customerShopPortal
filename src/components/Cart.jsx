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
import Button from "../UI_Elements/Button";
import {useNavigate} from "react-router-dom";
import SubHeading from "../UI_Elements/SubHeading"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastInfoMessage } from "../Utilities/ToastMessage";


const Cart = () => {
  useGetCart();

  const list = useSelector((store) => store.store.cartList);
  const cartTotal = useSelector((store) => store.store.cartTotalPric);
  const isLoggedIn = useSelector((store) => store.appConfig.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleItemsFromCart = async (item, flag) => {
    
    if (flag == "increase") {
      const response = await addToCart1(item, list, "add",-1);
      
      if (response?.message == "Request failed with status code 404") {  
        toast.warn('Out of Stock!', ToastInfoMessage);
      } else {
        dispatch(
          addSingleItemToCart({ ...response, productName: item.productName })
        );
      }
    } else {
      const response = await addToCart1(item, list, "remove",-1);
      dispatch(
        removeSingleItemFromCart({ ...response, productName: item.productName })
      );
    }
  };

  const clearCartHandler = async () => {
    if (list.length != 0) {
      await clearCart(list);
      dispatch(clearCartStore());
      toast.warn('Cleared Cart!', ToastInfoMessage);
      dispatch(
        setMessage({ message: "Cleared Cart", status: true, type: "info" })
      );
    }
  };

  const goToCartHandler = () =>{
    navigate("cart")
  }
  return (
    <div className=" p-2 ">
      <section className="flex justify-between">
        <h1 className="text-xl font-semibold">Cart</h1>
        {list.length != 0 && (<button className="underline" onClick={clearCartHandler}>
          Clear Cart
        </button>) }
      </section>
      <div
        className={` ${list.length != 0 ? ` flex flex-col overflow-x-auto max-h-[360px] border-b border-b-slate-400 dark:border-darkBorder` : ``}`}
      >
        {list?.map((item, index) => {
          return (
            <div key={index} className="flex mt-5 justify-between mb-5 pr-3 ">
              <section className="font-mono">
                <p>{item?.productName}</p>
                <p>${item?.productCartPrice?.toFixed(2)}</p>
              </section>
              <section className="self-end border border-gray-400 rounded justify-end flex px -2 ">
                <button
                  className="h-fit   px-2 border-r-2 "
                  onClick={() => handleItemsFromCart(item, "decrease")}
                >
                  -
                </button>
                <button className=" h-fit bg-blue-100  px-2 border-r-2 dark:text-darkLightBlack dark:bg-darkWhite">
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
      </div>
      {list.length != 0 ? (
        <>
          <div className="flex items-center justify-between p-4 mx-2">
            <h4 className="font-medium text-lg">SubTotal</h4>
            <span className="flex font-bold ">${cartTotal}</span>
          </div>

          <div className="flex justify-center ">
            <Button
            onClickButton={goToCartHandler}
              class="px-14 py-3 rounded text-slate-50 bg-slate-500 "
              title={"Go to Cart"}
            />
          </div>
        </>
      ) : <SubHeading class="p-3.5 ">
      {isLoggedIn ? "No Products in the Cart.." : "Login to your account to view the cart!"}</SubHeading>}
    </div>
  );
};
export default Cart;
