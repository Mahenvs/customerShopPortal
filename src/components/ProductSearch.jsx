import { useSelector } from "react-redux";
import _debounce from "lodash/debounce";
import axios from "axios";
import { getHeaders } from "../Utilities/getHeaders";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';

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
    setSearched(null)
    navigate('venu_groceries426119/'+productName, {
      state: {
        productData: {
          productName: product.productName,
          productPrice: product.productPrice,
          quantitiy: 1,
        },
      },
    });
  };
  return (
    <div>
      <input
        type="text"
        className="w-full border px-3 py-2 bg-gray-100 rounded placeholder:font-normal text-lg focus:outline-none focus:shadow focus:shadow-blue-400"
        placeholder="Search for products"
        onChange={(e) => onSearchHandler(e.target.value)}
      />
      {/* <div className="w-full  rounded-b shadow border ">
        {searchedProducts != null ? (
          searchedProducts?.map((product) => {
            return (<li key={product?.productId}
            className="list-none px-2 cursor-pointer">{product?.productName}</li>)
          })
        ) : <h2 className="p-1 px-2">No Results found</h2> }
        
      </div> */}
      <div
        className={
          `w-[436px]  rounded-b shadow border absolute z-30 bg-white border-slate-200  ` +
          `${searchedProducts ? "" : "h-30"}`
        }
      >
        {searchedProducts?.map((product) => {
          return (
            <li
              key={product?.productId}
              onClick={() => navigateToDetail(product?.productName,product)}
              className="list-none p-2 cursor-pointer"
            >
              {product?.productName}
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSearch;
