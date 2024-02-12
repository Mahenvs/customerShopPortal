import { useEffect, useState } from "react";
import CustomDropDown from "../UI_Elements/CustomDropDown";
import { useGetPaymentMethods } from "../Hooks/useGetPaymentMethods";
import { useSelector } from "react-redux";
import Button from "../UI_Elements/Button";
import { checkOutCart } from "../Utilities/checkOut";
import {useNavigate} from 'react-router-dom';

const PaymentSelect = () => {
  useGetPaymentMethods();
  const paymentModes = useSelector((store) => store.store.paymentMethods);
  const navigate = useNavigate();

  const [paymentMode, setPaymentMode] = useState();

  const paymentHandler = (item) => {
    setPaymentMode(item);
  };
  const orderConfirmHandler = async () =>{
    const data = await checkOutCart(paymentMode)
    
    if(data.status == 200){
      navigate("../orderConfirmed",{
        state:data.data
      });
    }
    else{
      alert("No products found ")
    }
  }
  useEffect(() => {}, [paymentModes]);
  return (
    <div>
      <h3 className="text-slate-700 text-xl justify-start  mt-1 font-semibold mb-2 dark:text-darkWhite">
        Select Payment Type{" "}
      </h3>

      <CustomDropDown
        options={paymentModes}
        inputChange={paymentHandler}
        itemId={"methodId"}
        itemName={"methodName"}
      ></CustomDropDown>
      <Button title="Order" class="dark:border-darkWhite dark:border" onClickButton={orderConfirmHandler}></Button>
    </div>
  );
};

export default PaymentSelect;
