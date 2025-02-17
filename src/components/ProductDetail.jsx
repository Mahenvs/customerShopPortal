import { useEffect } from "react";
import { setName, setStoreId } from "../store/storeSlice";
import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";
import useGetProducts from "../Hooks/useGetProducts";
import { useNavigate } from "react-router-dom";
import Button from "../UI_Elements/Button"
const ProductDetail = () => {
  const item = useLoaderData();
  // useGetProducts();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setStoreId(item?.id));
    dispatch(setName(item?.name));    
  }, []);

  return (
    <>
    <div className="flex w-1/2 border-2 border-gray-200 mt-10 mx-auto shadow-xl gap-10 p-10 items-center dark:shadow-2xl rounded-xl">
        <span className="w-2/5  h-50 ">
          <img src={item?.productImageUrl} className=" object-cover" />
        </span>
        <div className=" items-start gap-4 flex flex-col">
          <p className="font-medium text-lg">{item?.productName}
          <span className="font-sans text-gray-600 text-lg">    ({item?.categoryName})</span>  
          </p>
          <p className="font-normal text-base italic">{item?.productDescription}</p>
          
          <p className="font-small">{"per "}{item?.unit}</p>

          <p className="text-sm font-light self-start ">
                        Avail. Stock: {item?.productStockQuantity}
          </p>

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
