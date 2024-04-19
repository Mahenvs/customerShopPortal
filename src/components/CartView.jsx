import { useEffect, useState } from "react";
import { Heading } from "../UI_Elements/Heading";
import { useSelector } from "react-redux";
import useGetCart from "../Hooks/useGetCart";
import Button from "../UI_Elements/Button";
import OutlineButton from "../UI_Elements/OutlineButton";
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
  const paymentConfirmHandler = () => {
    openModal();
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
        className={`flex flex-row mx-56 gap-10 overflow-auto dark:bg-darkBg ${
          isModalOpen ? "backdrop-open" : "backdrop"
        }`}
      >
        <div className="f w-2/3 ">
          <div className="flex justify-between">
            <Heading>Shopping Cart</Heading>
            <Heading>Total ${cartTotal}</Heading>
          </div>

          <div className="mb-16 list-none py-1 text-base font-medium pl-1">
            {cartTotal > 0 ? (
              shoppingList?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="drop-shadow rounded shadow-slate-400 p-2 py-2 flex gap-4 my-4 border -b dark:border-darkBorder "
                  >
                    <section className="w-1/4 p-1 bo rder rounded dark:border-none">
                      <img src={item?.productImageUrl} alt="" width="100px" />
                    </section>
                    <section className="w-2/4 gap-4 flex flex-col">
                      <h1 className="text-lg text-gray-700 font-medium dark:text-zinc-300">
                        {item?.productName}
                      </h1>
                      <h1 className="text-lg text-gray-700 font-medium dark:text-zinc-300">
                        {/* {item?.product} */}
                      </h1>
                      <p className="dark:text-zinc-500">
                        ${item?.productCartPrice.toFixed(2)}{" "}
                      </p>
                      <p className="my-1">
                        Qty:
                        <select
                          className="ml-2 p-1 w-14 outline-none border border-slate-300 dark:border-darkBorder  focus:border-slate-400 rounded dark:text-darkText"
                          value={item.productCartQuantity}
                          onChange={(e) =>
                            handleQuantityChange(item, e.target.value)
                          }
                        >
                          {options.map((value, optionIndex) => {
  if (value.value <= item?.productStockQuantity) {
    return (
      <option key={value.value + optionIndex} value={value.value}>
        {value.value}
      </option>
    );
  }
  return null;
})}


                          {/* {options.map((value, optionIndex) => (
                            value <= 10 && (<option
                              key={item.productName + value + optionIndex}
                              value={value.value}
                            >
                              {value.value}
                            </option>)
                          ))} */}
                        </select>
                      </p>
                    </section>
                    <section className="justify-start">
                      <OutlineButton
                        onClickButton={() => removeItemFromCart(item)}
                        class="text-gray-700 bg-secondaryBg text-lg border py-[1px] px-2 h-fit "
                        title="Remove"
                      ></OutlineButton>
                      <p className="text-sm font-light self-end mx-4">
                        Avail. Stock: {item?.productStockQuantity}
                      </p>
                    </section>
                  </div>
                );
              })
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
          <div className="mt-10 gap-10 w-[100px] p-3 border flex-1 rounded h-fit">
            <section className="h-fit px-2">
              <span className="flex justify-between">
                <h6 className="font-base font-mono text-lg">Item Total </h6>$
                {cartTotal}
              </span>
              <span className="flex justify-between  my-3 mb-4">
                <h6 className="font-base font-mono text-lg">Delivery Fee </h6>
                <p
                  className={
                    cartTotal > 500 ? "text-green-500" : " text-red-400"
                  }
                >
                  {cartTotal < 500 ? `$50` : "FREE"}
                </p>
              </span>
              <p className="border-b my-1 dark:border-darkBorder"></p>
              <span className="flex justify-between">
                <h5 className="font-base font-mono text-lg">Grand total </h5>
                <p className="font-medium">$ {formattedTotal}</p>
              </span>
              <p className="text-sm font-mono text-slate-400">
                {" "}
                Inclusive of all taxes{" "}
              </p>

              <p className="border-b my-4"></p>
              <span className="flex justify-between my-1">
                <h5 className=" font-mono text-base text-slate-400">
                  Avg delivery time:{" "}
                </h5>
                <p className="font-medium text-green-300">3-5 days</p>
              </span>
              <div className="flex justify-center my-4 dark:bg-[#f9fafb] dark:text-darkText">
                {!verifiedUser ? (
                  <Button
                    class="px-14 py-2 rounded w-full font-semibold cursor-default"
                    title={"Verify your mail to continue"}
                  />
                ) : (
                  <Button
                    onClickButton={paymentConfirmHandler}
                    class="px-14 py-2 rounded w-full dark:bg-darkButtonBg dark:text-darkText"
                    title={"Continue"}
                  />
                )}
              </div>
            </section>
          </div>
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
