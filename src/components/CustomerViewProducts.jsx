import Button from "../UI_Elements/Button";
import { useSelector, useDispatch } from "react-redux";
import Shimmer from "./Shimmer";
import { addSingleItemToCart } from "../store/storeSlice";
import { useNavigate } from "react-router-dom";

import { addToCart1 } from "../Utilities/addToCart";
import { setBottomMessage, setMessage } from "../store/appConfigSlice";
import { ToastBottomInfoMessage, ToastInfoMessage } from "../Utilities/ToastMessage";
import { toast } from "react-toastify";

const CustomerViewProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let productsList = useSelector((store) => store.product.products);

  const cartListData = useSelector((store) => store.store.cartList);
  const customer = useSelector((store) => store.store.customerId);

  const addToCartHandler = async (item) => {
    if (customer == null) {
      navigate("/");
      return;
    }
    const response = await addToCart1(item, cartListData, "add", -1);
    if (response?.message == "Request failed with status code 404") {
      toast.warn('Out of Stock!', ToastInfoMessage);
      dispatch(
        setMessage({ message: "Out of Stock", status: true, type: "warning" })
      );
    } else{
        dispatch(
          addSingleItemToCart({ ...response, productName: item.productName })
        );
        toast('Item added successfully!', ToastBottomInfoMessage);
        dispatch(
          setBottomMessage({ message: "Item added successfully!", status: true, type: "info" })
        );
      }
  };
  const navigateProductDetail = (product, item) => {
    navigate(product, {
      state: {
        productId: item?.productId,
        productData: {
          productName: item?.productName,
          productCartPrice: item?.productCartPrice,
          productCartQuantity: item?.productCartQuantity,
        },
      },
    });
  };
  return (
    <>
      {!productsList ? (
        <Shimmer />
      ) : (
        productsList.map((item, index) => {
          return (
            <div key={index} className="shadow-lg p-1 py-2 flex gap-4 my-4">
              <section
                className="w-1/4 p-1 border rounded"
                onClick={() => navigateProductDetail(item?.productName, item)}
              >
                <img src={item?.productImageUrl} alt="" width="100px" />
              </section>
              <section
                className="w-2/4"
                onClick={() => navigateProductDetail(item?.productName, item)}
              >
                <h1 className="text-lg text-gray-700 font-medium">
                  {item?.productName}
                </h1>
                <p>{item.unit}</p>
                <p>${item?.productPrice.toFixed(2)} </p>
              </section>
              <section className=" min-w-fit self-end">
                <Button
                  onClickButton={() => addToCartHandler(item)}
                  title={
                    item?.productStockQuantity > 0 ? "Add" : "Out of stock"
                  }
                  class={`px-2 h-fit  ${
                    item?.productStockQuantity > 0
                      ? "text-slate-50 bg-slate-500  "
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
