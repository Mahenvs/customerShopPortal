import { useEffect, useState } from "react";
import { setName, setStoreId } from "../store/storeSlice";
import { useDispatch, useSelector } from "react-redux";
import themes from "../Utilities/themes";
import { setTheme } from "../store/appConfigSlice";
import { useLoaderData } from "react-router-dom";
import useGetProducts from "../Hooks/useGetProducts";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const item = useLoaderData();
  useGetProducts();
  console.log("133");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useSelector((store) => store.appConfig.theme);

  useEffect(() => {
    dispatch(setStoreId(item?.id));
    dispatch(setName(item?.name));    
  }, []);

  const onThemeSelect = (e) => {
    dispatch(setTheme(e.target.value));
  };
  return (
    <>
      <div className="flex w-1/2 p-5 mt-10 mx-auto shadow-lg gap-10 j ustify-betwee n items-center">
        <span className="w-2/5  h-50 ">
          <img src={item?.productImageUrl} className=" object-cover" />
        </span>
        <div className=" items-start gap-4 flex flex-col">
          <p className="font-medium text-lg">{item?.productName}</p>
          <p className="font-small">{"per piece"}</p>
          <p className="font-medium">${item?.productPrice}</p>
          <button
            className={`px-8  rounded h-10 text-lg ` + `${themes[theme]["button"]}`}
            onClick={() => navigate("../")}
          >
            Go to Products
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
