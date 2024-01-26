import React, { useEffect, useState } from "react";
import { addToCart,  removeFromCart } from "../store/storeSlice";
import { useDispatch, useSelector } from "react-redux";
import shop from "../assets/shop.jpg";
import themes from "../Utilities/themes";
import { setTheme } from "../store/appConfigSlice";
import { useLocation } from 'react-router-dom';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const handleItemsFromCart = (item, flag) => {
    console.log(item);
    if (flag == "increase") {
      dispatch(addToCart(item));
    } else {
      dispatch(removeFromCart(item));
    }
  };
  const theme = useSelector((store) => store.appConfig.theme);
  
  const location = useLocation();
  const item = location.state?.productData;

  console.log(item);
  const cart = useSelector((store)=> store.store.cart);
  console.log(cart);
  const [cnt,setCnt] = useState(1);
  
  
  useEffect(()=>{
    const count = cart.map((prod) => {
      console.log(item.productname);
      if (prod.productName == item.productName) {
        return prod.quantity;
      }
    });
    if(count > 1)
    setCnt(count);

    console.log(cnt);
  },[]);

  // console.log(cnt);
  const onThemeSelect = (e) => {
    console.log(e.target.value);
    dispatch(setTheme(e.target.value));
  };
  return (
    <div className="flex w-1/2 p-5 mt-10 mx-auto shadow-lg gap-10 j ustify-betwee n bg-re d-200">
      {/* <select className="h-fit" onChange={onThemeSelect}>
        <option value="blue">blue</option>
        <option value="red">red</option>
        <option value="dark">dark</option>
      </select> */}
      <span className="w-2/5  h-50 ">
        <img src={shop} className=" object-cover" />
      </span>
      <div className=" items-start gap-4 flex flex-col">
        <p className="font-medium text-lg">{item?.productName}</p>
        <p className="font-small">{"per piece"}</p>
        <p className="font-medium">${item?.price}</p>

        <span
          className={
            `border flex gap-1  rounded h-10 w-48 align-middle ` +
            `${themes[theme]["border"]}`
          }
        >
          <button
            className="w-1/3 text-2xl"
            onClick={() => handleItemsFromCart(item, "decrease")}
          >
            -
          </button>
          <button
            className={
              `w-1/3 h-9.5 bg-blue-100  ` + `${themes[theme]["button"]}`
            }
          >
            {cnt}
            {/* { } */}
          </button>
          <button
            className="w-1/3 text-2xl"
            onClick={() => handleItemsFromCart(item, "increase")}
          >
            +
          </button>
        </span>
        <button
          className={
            `  px-8  rounded h-10 text-lg ` + `${themes[theme]["button"]}`
          }
          onClick={() => handleItemsFromCart(item, "decrease")}
        >
          Go to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
