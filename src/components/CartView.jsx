import { useEffect, useState } from "react";
import { Heading } from "../UI_Elements/Heading";
import { useSelector } from "react-redux";
import useGetCart from "../Hooks/useGetCart";
import { useDispatch } from "react-redux";
import { addToCart1 } from "../Utilities/addToCart";
import {
  addSingleItemToCart,
  removeSingleItemFromCart,
} from "../store/storeSlice";
import PaymentSelect from "./PaymentSelect";
import { Modal } from "../UI_Elements/Modal";
import { ToastInfoMessage } from "../Utilities/ToastMessage";
import { toast } from "react-toastify";
import { CartSummary } from "./CartSummary";
import { ShoppingCartItem } from "./ShoppingCartItem";
const CartView = () => {
  useGetCart();

  const shoppingList = useSelector((store) => store.store.cartList);
  const cartTotal = useSelector((store) => store.store.cartTotalPric);
  const isLoggedIn = useSelector((store) => store.appConfig.isLoggedIn);

  const dispatch = useDispatch();

  const [options, setOptions1] = useState(
    [...Array(100).keys()].map((i) => ({ value: i + 1 }))
  );

  const verifiedUser = useSelector((store) => store.appConfig.isVerifiedUser);
  const handleQuantityChange = async (item, value) => {
    const parsedValue = parseInt(value, 10); // Parse the value as an integer

    const response = await addToCart1(item, shoppingList, "addQ", parsedValue);
    if (response?.message == "Request failed with status code 404") {
      toast.warn("Out of Stock!", ToastInfoMessage);
    } else {
      dispatch(
        addSingleItemToCart({ ...response, productName: item.productName })
      );
    }
    setOptions1((prevOptions) =>
      prevOptions.map((opt) =>
        opt.value === parsedValue ? { ...opt, value: parsedValue } : opt
      )
    );
  };

  const removeItemFromCart = async (item) => {
    const response = await addToCart1(item, shoppingList, "remove", 0);
    dispatch(
      removeSingleItemFromCart({ ...response, productName: item.productName })
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const formattedTotal = (cartTotal < 500 ? cartTotal + 50 : cartTotal).toFixed(
    2
  );

  useEffect(() => {}, [shoppingList]);
  return (
    <>
      <div
        className={`flex flex-row mx-56 gap-10 overflow-auto dark:bg-darkBg`}
      >
        <div className="f w-2/3 ">
          <div className="flex justify-between">
            <Heading>Shopping Cart</Heading>
            <Heading>Total ${cartTotal}</Heading>
          </div>

          <div className="mb-16 list-none py-1 text-base font-medium pl-1">
            {cartTotal > 0 ? (
              shoppingList?.map((item, index) => (
                <ShoppingCartItem
                  key={index}
                  item={item}
                  handleQuantityChange={handleQuantityChange}
                  removeItemFromCart={removeItemFromCart}
                  options={options}
                />
              ))
            ) : (
              <Heading class="p-5  flex justify-center ">
                {isLoggedIn
                  ? "No products in the Cart!!"
                  : "Login to your Account"}
              </Heading>
            )}
          </div>
        </div>
        {cartTotal > 0 ? (
          <CartSummary
            cartTotal={cartTotal}
            formattedTotal={formattedTotal}
            verifiedUser={verifiedUser}
            paymentConfirmHandler={openModal}
          />
        ) : (
          <Heading />
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <PaymentSelect />
      </Modal>
    </>
  );
};

export default CartView;
