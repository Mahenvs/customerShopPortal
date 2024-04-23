import { useSelector } from "react-redux";
import _debounce from "lodash/debounce";
import axios from "axios";
import { getHeaders } from "../Utilities/getHeaders";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductSearch = () => {
  const storeId = useSelector((store) => store.store.storeId);

  const [searchedProducts, setSearched] = useState();
  const navigate = useNavigate();

  const onSearchHandler = _debounce(async (value) => {
    setSearched(null);
    const url =
      import.meta.env.VITE_PRODUCT_SEARCH +
      storeId +
      "/products/search/" +
      value;

    const data = await axios.get(url, getHeaders());
    setSearched(data.data);
  }, 1500);

  const navigateToDetail = (productName, product) => {
    setSearched(null);
    navigate(productName);
  };
  return (
    <div>
      <div className="flex items-center">
        <input
          type="text"
          className={`w-full border border-gray-300 px-6 mx-auto py-2 placeholder:font-normal text-lg focus:outline-none focus:drop-shadow-2xl focus:shadow-lg focus:shadow-blue-400/50 dark:text-darkText ${searchedProducts ? "rounded-t-[26px]" : "rounded-full"}`}
          placeholder="Search for products"
          onChange={(e) => onSearchHandler(e.target.value)}
        />
        <span className="absolute ml-[26%] text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 text-gray-400"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
      {searchedProducts ? (
        <div
          className={
            `w-[436px] shadow border rounded-tl rounded-b-[26px] absolute z-30 bg-white border-slate-200 mb-` +
            `${searchedProducts ? "" : "h-30"}`
          }
        >
          {searchedProducts?.map((product) => {
            return (
              <li
                key={product?.productId}
                onClick={() => navigateToDetail(product?.productName)}
                className="list-none h-fit px-3  py-1.5 font-sans  cursor-pointer hover:bg-skin-light hover:text-skin-base  dark:hover:bg-darkWhite dark:hover:text-darkText  dark:text-darkWhite dark:bg-darkBg"
              >
                {product?.productName}
              </li>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductSearch;
