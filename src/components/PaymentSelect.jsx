import { useEffect, useState } from "react";
import CustomDropDown from "../UI_Elements/CustomDropDown";
import { useGetPaymentMethods } from "../Hooks/useGetPaymentMethods";
import { useDispatch, useSelector } from "react-redux";
import { checkOutCart } from "../Utilities/checkOut";
import {useNavigate} from 'react-router-dom';
import OutlineButton from "../UI_Elements/OutlineButton";
import { clearCartStore } from "../store/storeSlice";

const PaymentSelect = () => {
  useGetPaymentMethods();
  const paymentModes = useSelector((store) => store.store.paymentMethods);
  const navigate = useNavigate();

  const [paymentMode, setPaymentMode] = useState();

  const paymentHandler = (item) => {
    setPaymentMode(item);
  };
  
  const dispatch = useDispatch();
  const [errorIs, setError] = useState();

  const orderConfirmHandler = async () =>{
    if(!paymentMode) {
      setError("Please choose any payment method");
      return;
    }
    const data = await checkOutCart(paymentMode)
    
    if(data.status == 200){
      dispatch(clearCartStore())
      navigate("../orderConfirmed",{
        state:data.data
      });
    }
    else{
      // alert("No products found ")
    }
  }
  useEffect(() => {}, [paymentModes]);
  return (
    <div className="">
      
      <CustomDropDown
        options={paymentModes}
        inputChange={paymentHandler}
        itemId={"methodId"}
        itemName={"methodName"}
      ></CustomDropDown>
    <div>
      {!paymentMode && <div className="text-red-500 mt-[-10px] mb-4">{errorIs}</div>}
      <OutlineButton
            class=" bg-skin-fill  text-skin-base dark:text-darkWhite"
            title="Order"
            onClickButton={orderConfirmHandler}
          ></OutlineButton>
          </div>
      {/* <Button title="Order" class="dark:border-darkWhite dark:border" onClickButton={orderConfirmHandler}></Button> */}
    </div>
  );
};

export default PaymentSelect;
