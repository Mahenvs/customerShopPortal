import { parseDate } from "../Utilities/parseDate";
import MiniHeading from "../UI_Elements/MiniHeading"

const ViewOrders = ({ item }) => {

  return (
    <div className="max-h-full mx-10  mb-10">
      <header className="flex gap-5">
        <MiniHeading >OrderID: {item?.orderId} | </MiniHeading>
        <MiniHeading>Shipping Status: {item?.orderDeliveryStatus} |</MiniHeading>
        <MiniHeading>Ordered On: {parseDate(item?.orderDateAndTime)}</MiniHeading>
      </header>
      <div className="flex mx-auto my-4 gap-5 overflow-auto ">
        {item?.orderedProductList?.map((product, index) => {
          return (
            <div key={product?.productId + index} className="flex p-2 gap-6 min-w-fit justify-around ">
              <img
                src={product?.productImageUrl}
                width={60}
                height={60}
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
