import { useEffect } from "react";
import useGetOrders from "../Hooks/useGetOrders";
import { useSelector } from "react-redux";
import ViewOrders from "./ViewOrders";
import { Heading } from "../UI_Elements/Heading";
import SubHeading from "../UI_Elements/SubHeading";

const Orders = () => {
  useGetOrders();

  const ordersList = useSelector((store) => store.cart.ordersData);

  useEffect(() => {}, [ordersList]);
  return (
    <div className={`flex flex-col mx-56 gap-10 mb-20`}>

      <Heading>Your Orders</Heading>
      {ordersList?.length > 0 ? (ordersList?.map((item,index) => {
        return <ViewOrders item={item} key={item+index}/>
      })) : <Heading
       class="flex justify-center p-3">No Orders Found</Heading> }
    </div>
  );
};

export default Orders;
