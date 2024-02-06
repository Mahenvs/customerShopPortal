import React, { useEffect } from "react";
import useGetOrders from "../Hooks/useGetOrders";
import { useSelector } from "react-redux";
import ViewOrders from "./ViewOrders";
import { Heading } from "../UI_Elements/Heading";

const Orders = () => {
  useGetOrders();

  const ordersList = useSelector((store) => store.cart.ordersData);

  ordersList?.map((item) => {
    console.log(item.orderStatus);
  });

  useEffect(() => {}, [ordersList]);
  return (
    <div className={`flex flex-col mx-56 gap-10 `}>

      <Heading>Your Orders:</Heading>
      {ordersList?.map((item,index) => {
        return <ViewOrders item={item} key={item?.orderId}/>
      })}
    </div>
  );
};

export default Orders;
