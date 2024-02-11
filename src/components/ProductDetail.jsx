import { useEffect, useState } from "react";
import {
  addSingleItemToCart,
  removeSingleItemFromCart,
  setName,
  setStoreId,
} from "../store/storeSlice";
import { useDispatch, useSelector } from "react-redux";
import shop from "../assets/shop.jpg";
import themes from "../Utilities/themes";
import { setMessage, setTheme } from "../store/appConfigSlice";
import { useLocation } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import useGetProducts from "../Hooks/useGetProducts";
import { addToCart1 } from "../Utilities/addToCart";
import {useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  useGetProducts();
  const dispatch = useDispatch();
  const location = useLocation();
  const item = useLoaderData();
  const list = useSelector(store => store.product.products);
  

  const handleItemsFromCart = async (item, flag) => {
    if (flag == "increase") {
      const response = await addToCart1(item, list, "add",-1);
      if (response?.message == "Request failed with status code 404") {
        dispatch(
          setMessage({ message: "Out of Stock", status: true, type: "warning" })
        );
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
  const theme = useSelector((store) => store.appConfig.theme);
  // let item = location.state?.productData;
  // let prod = location.state?.productId;
  // console.log(list," data ",item);
  // const data1 = list?.filter(product => product.productId == prod?.productId);
  // if (!item) {
    // item = result;
  // }
  
  const cart = useSelector((store) => store.store.cart);
  const [cnt, setCnt] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const count = cart?.map((prod) => {
      if (prod.productName == item.productName) {
        return prod.quantity;
      }
    });
    dispatch(setStoreId(item.id));
    dispatch(setName(item.name));
    
    if (count > 1) setCnt(count);
  }, [cnt]);

  const onThemeSelect = (e) => {
    
    dispatch(setTheme(e.target.value));
  };
  return <>
    {/* {data1?.map((data1, index) => {
      return ( */}
    <div  className="flex w-1/2 p-5 mt-10 mx-auto shadow-lg gap-10 j ustify-betwee n items-center">
      {/* <select className="h-fit" onChange={onThemeSelect}>
        <option value="blue">blue</option>
        <option value="red">red</option>
        <option value="dark">dark</option>
      </select> */}
      <span className="w-2/5  h-50 ">
        <img src={item?.productImageUrl} className=" object-cover" />
      </span>
      <div className=" items-start gap-4 flex flex-col">
        <p className="font-medium text-lg">{item.productName}</p>
        <p className="font-small">{"per piece"}</p>
        <p className="font-medium">${item?.productPrice}</p>

        {/* <span
          className={
            `border flex gap-1  rounded h-10 w-48 align-middle ` +
            `${themes[theme]["border"]}`
          }
        >
          <button
            className="w-1/3 text-2xl"
          >
            -
          </button>
          <button
            className={
              `w-1/3 h-9.5 bg-blue-100  ` + `${themes[theme]["button"]}`
            }
          >
                {data1?.productCartQuantity}
            
          </button>
          <button
            className="w-1/3 text-2xl"
            onClick={() => handleItemsFromCart(data1, "increase")}
          >
            +
          </button>
        </span> */}
        <button
          className={
            `  px-8  rounded h-10 text-lg ` + `${themes[theme]["button"]}`
          }
          onClick={() => navigate("../")}
        >
          Go to Products
        </button>
      </div>
    </div>
    {/* )})} */}
  </>;
};

export default ProductDetail;
