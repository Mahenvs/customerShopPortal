import React from "react";
import shop from "../assets/shop.jpg";
import Button from "../UI_Elements/Button";
import { useSelector, useDispatch } from "react-redux";
import Shimmer from "./Shimmer";
import { addToCart } from "../store/storeSlice";

const CustomerViewProducts = () => {

  const dispatch = useDispatch();

  let productsList = useSelector((store) => store.product.products);

  const addToCartHandler = (item) => {
    const {productName,productPrice} = item;
    dispatch(addToCart({productName,productPrice}))
  }
  return (
    <>
      {!productsList ? <Shimmer/> :
        productsList.map((item, index) => {
          return (<div key={index} className="shadow-lg p-1 py-2 flex gap-4 my-4">
            
            <section className="w-1/4 p-1 border rounded">
              <img src={shop} alt="" width="100px" />
            </section>
            <section className="w-2/4"> 
              <h1 className="text-lg text-gray-700 font-medium">
                {item?.productName}
              </h1>
              <p>{item.unit}</p>
              <p>${item.productPrice} </p>
            </section>
            <section className="justify-end items-end self-end">
              <Button onClickButton={() => addToCartHandler(item)} title="Add" class="px-2 h-fit "></Button>
            </section>
          </div>)
        })}
    </>
  );
};

export default CustomerViewProducts;
