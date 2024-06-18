import { useEffect, useMemo, useState } from "react";
import useGetOrders from "../Hooks/useGetOrders";
import { useSelector } from "react-redux";
import ViewOrders from "./ViewOrders";
import { Heading } from "../UI_Elements/Heading";

const Orders = () => {
  useGetOrders();

  const ordersList = useSelector((store) => store.cart.ordersData);
  const [sortBy, setSortBy] = useState("orderId");
  const sortedOrders = useMemo(() => {
    return [...(ordersList || [])].sort((a, b) => {
      if (sortBy === "orderDeliveryStatus") {
        return a[sortBy].localeCompare(b[sortBy]);
      } else if (sortBy === "orderId") {
        return a[sortBy] - b[sortBy];
      }
      else{

        return a[sortBy] > b[sortBy];
      }
    });
  }, [ordersList, sortBy]);

  const sortHandler = (e) => {
    setSortBy(e.target.value);
  };
  return (
    <div className={`flex flex-col mx-56 gap-10 mb-20`}>
      <div className="flex gap-80">
        <Heading>Your Orders</Heading>
        <div>
          <label htmlFor="sortBy">Sort by</label>
          <select
            className="rounded m-2 p-1 border-black-500 outline-none border-2 
            "
            title="Sort By"
            id="sortBy"
            onChange={sortHandler}
            value={sortBy}
          >
            <option value="orderId">Order Id</option>
            <option value="orderDeliveryStatus">Status</option>
            {/* <option value="orderDateAndTime">Ordered Date</option> */}
          </select>
        </div>
      </div>
      {sortedOrders?.length > 0 ? (
        sortedOrders?.map((item, index) => {
          return <ViewOrders item={item} key={item.orderId} />;
        })
      ) : (
        <Heading class="flex justify-center p-3">No Orders Found</Heading>
      )}
    </div>
  );
};

export default Orders;
