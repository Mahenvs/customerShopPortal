import React, { useEffect, useMemo, useState } from "react";
import { Heading } from "../UI_Elements/Heading";
import { useSelector } from "react-redux";
import Card from "../UI_Elements/Card";
import useGetCart from "../Hooks/useGetCart";
import Button from "../UI_Elements/Button";
import OutlineButton from "../UI_Elements/OutlineButton";
import { useDispatch } from "react-redux";
import { addToCart1 } from "../Utilities/addToCart";
import { setMessage } from "../store/appConfigSlice";
import {
  addSingleItemToCart,
  removeSingleItemFromCart,
} from "../store/storeSlice";
import { checkOutCart } from "../Utilities/checkOut";
import PaymentSelect from "./PaymentSelect";
import { Modal } from "../UI_Elements/Modal";
import CustomFormControl from "../UI_Elements/CustomFormControl";
import CustomFormLabel from "../UI_Elements/CustomFormLabel";
const CartView = () => {
  useGetCart();

  const shoppingList = useSelector((store) => store.store.cartList);
  const cartTotal = useSelector((store) => store.store.cartTotalPric);
  console.log(shoppingList);
  const dispatch = useDispatch();

  const [options, setOptions1] = useState(
    [...Array(100).keys()].map((i) => ({ value: i + 1 }))
  );

  const handleQuantityChange = async (item, value) => {
    const parsedValue = parseInt(value, 10); // Parse the value as an integer

    const response = await addToCart1(item, shoppingList, "add", parsedValue);
    if (response?.message == "Request failed with status code 404") {
      dispatch(
        setMessage({ message: "Out of Stock", status: true, type: "warning" })
      );
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

  const removeItemFromCart = async (item, value) => {
    const response = await addToCart1(item, shoppingList, "remove", 0);
    dispatch(
      removeSingleItemFromCart({ ...response, productName: item.productName })
    );
  };
  const paymentConfirmHandler = () => {
    console.log("insd");
    openModal();
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {}, [shoppingList]);
  return (
    <>
      <div className={`flex flex-row mx-56 gap-10 overflow-auto ${isModalOpen ? 'backdrop-open' : 'backdrop'}`}>
        
        <div className="f w-2/3 ">
          <div className="flex justify-between">
            <Heading>Shopping Cart</Heading>
            <Heading>Total ${cartTotal}</Heading>
          </div>

          <div className="list-none py-1 text-base font-medium pl-1">
            {shoppingList?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="drop-shadow rounded shadow-slate-400 p-2 py-2 flex gap-4 my-4 border -b "
                >
                  <section className="w-1/4 p-1 border rounded">
                    <img src={item?.productImageUrl} alt="" width="100px" />
                  </section>
                  <section className="w-2/4 gap-4 flex flex-col">
                    <h1 className="text-lg text-gray-700 font-medium">
                      {item?.productName}
                    </h1>

                    <p>${item?.productCartPrice.toFixed(2)} </p>
                    <p className="my-1">
                      Qty:
                      <select
                        className="ml-2 p-1 w-14 outline-none border border-slate-300  focus:border-slate-400 rounded"
                        value={item.productCartQuantity}
                        onChange={(e) =>
                          handleQuantityChange(item, e.target.value)
                        }
                      >
                        {options.map((value, optionIndex) => (
                          <option
                            key={item.productName + value + optionIndex}
                            value={value.value}
                          >
                            {value.value}
                          </option>
                        ))}
                      </select>
                    </p>
                  </section>
                  <section className="justify-start">
                    <OutlineButton
                      onClickButton={(e) =>
                        removeItemFromCart(item, e.target.value)
                      }
                      class="text-slate-500 bg-white text-lg border py-[1px] px-2 h-fit "
                      title="Remove"
                    ></OutlineButton>
                    <p className="text-sm font-light self-end mx-4">
                      Avail. Stock: {item?.productStockQuantity}
                    </p>
                  </section>
                </div>
              );
            })}
          </div>
        </div>
        {cartTotal > 0 ? 
        <div className="mt-10 gap-10 w-[100px] p-3 border flex-1 rounded h-fit">
          <section className="h-fit px-2">
            <span className="flex justify-between">
              <h6 className="font-base font-mono text-lg">Item Total </h6>$
              {cartTotal}
            </span>
            <span className="flex justify-between  my-3 mb-4">
              <h6 className="font-base font-mono text-lg">Delivery Fee </h6>
              <p
                className={cartTotal > 500 ? "text-green-500" : " text-red-400"}
              >
                {cartTotal < 500 ? `$50` : "FREE"}
              </p>
            </span>
            <p className="border-b my-1"></p>
            <span className="flex justify-between">
              <h5 className="font-base font-mono text-lg">Grand total </h5>
              <p className="font-medium">
                $ {cartTotal < 500 ? cartTotal + 50 : cartTotal}
              </p>
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
            <div className="flex justify-center my-4">
              <Button
                onClickButton={paymentConfirmHandler}
                class="px-14 py-2 rounded w-full text-slate-50 bg-slate-500"
                title={"Continue"}
              />
            </div>
          </section>
        </div> : <Heading>No products in the cart</Heading>
        }
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <PaymentSelect/> 
        </Modal>

    </>
  );
};

export default CartView;
