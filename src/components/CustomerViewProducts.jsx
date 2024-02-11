import Button from "../UI_Elements/Button";
import { useSelector, useDispatch } from "react-redux";
import { addSingleItemToCart } from "../store/storeSlice";
import { useNavigate } from "react-router-dom";
import { addToCart1 } from "../Utilities/addToCart";
import { ToastBottomInfoMessage, ToastInfoMessage } from "../Utilities/ToastMessage";
import { toast } from "react-toastify";
import ShimmerProdList from "../UI_Elements/ShimmerProdList";

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
    } else{
        dispatch(
          addSingleItemToCart({ ...response, productName: item.productName })
        );
        toast('Item added successfully!', ToastBottomInfoMessage);
      }
  };

  return (
    <>
      {!productsList ? (
        <ShimmerProdList />
      ) : (
        productsList.map((item, index) => {
          return (
            <div key={index} className="shadow-lg py-2 flex gap-4 my-4 dark:border-darkBorder dark:shadow-zinc-600 dark:bg-gray-950 mx-4">
              <section
                className="w-1/4 p-1 border rounded dark:border-none"
                onClick={() => navigate(item?.productName)}
              >
                <img src={item?.productImageUrl} alt="" width="100px" className="rounded"/>
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
                <p className="dark:text-zinc-500">{item.unit}</p>
                <p className="dark:text-zinc-300">${item?.productPrice.toFixed(2)} </p>
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
