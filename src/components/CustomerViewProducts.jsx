import Button from "../UI_Elements/Button";
import { useSelector, useDispatch } from "react-redux";
import { addSingleItemToCart } from "../store/storeSlice";
import { useNavigate } from "react-router-dom";
import { addToCart1 } from "../Utilities/addToCart";
import {
  ToastBottomInfoMessage,
  ToastInfoMessage,
} from "../Utilities/ToastMessage";
import { toast } from "react-toastify";
import ShimmerProdList from "../UI_Elements/ShimmerProdList";
import { useState } from "react";

const CustomerViewProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let cnt = 1;
  let storeDomainResource = JSON.parse(
    localStorage.getItem("store")
  )?.storeDomain;

  let productsList = useSelector((store) => store.product.products);
  const cartListData = useSelector((store) => store.store.cartList);
  const customer = useSelector((store) => store.store.customerId);
  const [readOnly, setLoading] = useState(false);
  const addToCartHandler = async (item, qnty) => {
    if (customer == null) {
      navigate(`/${storeDomainResource}/auth?signIn`);
      // navigate("../");
      return;
    }
    const response = await addToCart1(item, cartListData, "add", qnty);
    if (response?.message == "Request failed with status code 404") {
      toast.warn("Out of Stock!", ToastInfoMessage);
    } else {
      dispatch(
        addSingleItemToCart({ ...response, productName: item.productName })
      );
      toast("Item added successfully!", ToastBottomInfoMessage);
    }
  };

  const updateCart = async (item, cnt) => {
    setLoading(true);
    try {
      await addToCartHandler(item, cnt);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
    setLoading(false);
  };
  return (
    <>
      {!productsList ? (
        <ShimmerProdList />
      ) : (
        productsList.map((item, index) => {
          return (
            <div
              key={index}
              className="border-2 border-gray-200  rounded-xl dark:shadow-lg py-2 flex gap-4 m-4 mb-3 dark:border-darkBorder dark:rounded dark:border dark:border-1 dark:bg-darkBg  "
            >
              <section
                className="w-1/4 px-2 py-1 dark:border-none"
                onClick={() => navigate(item?.productName)}
              >
                <img
                  src={item?.productImageUrl}
                  alt=""
                  width="100px"
                  height={50}
                  className="h-100 rounded object-contain "
                />
              </section>
              <section
                className="w-2/4"
                onClick={() => navigate(item?.productName)}
              >
                <h1 className="text-lg text-gray-700 font-medium dark:text-zinc-300">
                  {item?.productName}
                </h1>
                <h2 className="text-base text-gray-600 font-base dark:text-zinc-400">
                  {item?.categoryName}
                </h2>
                <p className="dark:text-zinc-500 lg:block md:hidden">
                  {item.unit}
                </p>
                <p className="dark:text-zinc-300">
                  ${item?.productPrice.toFixed(2)}{" "}
                </p>
              </section>
              <section className={` min-w-fit self-end md:flex md:flex-col`}>
                <Button
                  onClickButton={() =>
                    `${readOnly}` === "false" && updateCart(item, cnt++)
                  }
                  title={
                    item?.productStockQuantity > 0 ? "Add" : "Out of stock"
                  }
                  class={`px-2 ${
                    readOnly == true ? " disabled cursor-auto " : ""
                  } h-fit   ${
                    item?.productStockQuantity > 0
                      ? "text-skin-base bg-skin-fillBtn  dark:bg-[#f9fafb] dark:text-darkText "
                      : "text-red-400 bg-white border border-red-200"
                  }`}
                ></Button>
              </section>
            </div>
          );
        })
      )}
    </>
  );
};

export default CustomerViewProducts;
