import SubHeading from "../UI_Elements/SubHeading";
import { parseDate } from "../Utilities/parseDate";

const ViewOrders = ({ item }) => {
  console.log(item);

  return (
    <div className="mx-2 p-1">
      <header className="flex gap-5">
        <SubHeading>OrderID: {item?.orderId} | </SubHeading>
        <SubHeading>Shipping Status: {item?.orderDeliveryStatus} |</SubHeading>
        <SubHeading>Ordered On: {parseDate(item?.orderDateAndTime)}</SubHeading>
      </header>
      <div className="flex mx-auto my-4">
        {item.orderedProductList?.map((product, index) => {
          return (
            <div key={product?.productId + index} className="flex gap-5">
              <img
                src={product?.productImageUrl}
                width={60}
                className="rounded"
              />
              <section className="list-none py-1 text-base font-medium w-full pl-1">
                <li className="">{product?.productName}</li>
                <li>Qty:{product?.quantity}</li>
                <li>Price:{product?.price}</li>
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewOrders;
