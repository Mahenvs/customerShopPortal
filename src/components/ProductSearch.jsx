import { useSelector } from "react-redux";
import _debounce from "lodash/debounce";
import axios from "axios";
import { getHeaders } from "../Utilities/getHeaders";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../Icons/SearchIcon";

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
      <div className="flex items-center ">
        <input
          type="text"
          className={`lg:w-[30rem] w-96   border border-gray-300 px-6 mx-auto py-1 lg:py-2 placeholder:font-normal text-lg focus:outline-none focus:drop-shadow-2xl focus:shadow-lg focus:shadow-blue-400/50 dark:text-darkText ${
            searchedProducts ? "rounded-t-[26px]" : "rounded-full"
          }`}
          placeholder="Search for products"
          id="search"
          onChange={(e) => onSearchHandler(e.target.value)}
        />
        <span className="absolute ml-[26%] md:ml-[36%] lg:ml-[26%] text-sm">
          <SearchIcon />
        </span>
      </div>
      {searchedProducts ? (
        <div
          className={
            `lg:w-[27rem] w-[22rem] mx-[2px] shadow border rounded-tl rounded-b-[26px] absolute z-30 bg-white border-slate-200 mb-` +
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
