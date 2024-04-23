import { useEffect, useState } from "react";
import { setName, setStoreId } from "../store/storeSlice";
import { useDispatch, useSelector } from "react-redux";
import themes from "../Utilities/themes";
import { setTheme } from "../store/appConfigSlice";
import { useLoaderData } from "react-router-dom";
import useGetProducts from "../Hooks/useGetProducts";
import { useNavigate } from "react-router-dom";
import Button from "../UI_Elements/Button"
const ProductDetail = () => {
  const item = useLoaderData();
  useGetProducts();
  console.log("133");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(setStoreId(item?.id));
    dispatch(setName(item?.name));    
  }, []);

  return (
    <>
      <div className="flex w-1/2 p-5 mt-10 mx-auto shadow-2xl gap-10 items-center dark:shadow-darkLightBlack dark:shadow-2xl">
        <span className="w-2/5  h-50 ">
          <img src={item?.productImageUrl} className=" object-cover" />
        </span>
        <div className=" items-start gap-4 flex flex-col">
          <p className="font-medium text-lg">{item?.productName}</p>
          <p className="font-small">{"per piece"}</p>
          <p className="font-medium">${item?.productPrice}</p>
          <Button
            className={`px-8  rounded h-10 text-lg `}
            onClickButton={() => navigate("../")}
            title="Go to Products"
          >
            Go to Products
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
