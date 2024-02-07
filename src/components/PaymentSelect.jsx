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
    console.log(item);
    setPaymentMode(item);
  };
  const orderConfirmHandler = async () =>{
    const data = await checkOutCart(paymentMode)
    console.log(data,data.status);
    if(data.status == 200){
      navigate("../orderConfirmed",{
        state:data.data
      });
    }
    else{
      alert("No products found ")
    }
    // navigate("/orderConfirmed");
  }
  const handlerInput = (flag, value) => {
    console.log(value);
  };
  useEffect(() => {}, [paymentModes]);
  return (
    <div>
      {/* <div className="mb-2">
      <CustomFormLabel label="Address" class="text-slate-700 font-semibold" />
        <input
          type="text"
            name="name"
            className="flex w-[25rem] leading-8  border-b-2  text-stone-950 rounded text-xl  focus:outline-none focus:border-sky-900"
            onChange={(event) => handlerInput("address", event.target.value)}>
        </input>
        </div> */}
        
      <h3 className="text-slate-700 text-xl  justify-start  mt-1 font-semibold mb-2">
        Select Payment Type{" "}
      </h3>

      <CustomDropDown
        options={paymentModes}
        inputChange={paymentHandler}
        itemId={"methodId"}
        itemName={"methodName"}
      ></CustomDropDown>
      <Button title="Order" onClickButton={orderConfirmHandler}></Button>
    </div>
  );
};

export default PaymentSelect;
