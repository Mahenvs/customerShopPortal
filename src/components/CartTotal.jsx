import Button from "../UI_Elements/Button";

const CartTotal = ({ cartTotal, goToCartHandler }) => {
  return (
    <>
      <div className="flex items-center justify-between p-4 mx-2">
        <h4 className="font-medium text-lg">SubTotal</h4>
        <span className="flex font-bold ">${cartTotal}</span>
      </div>

      <div className="flex justify-center ">
        <Button
          onClickButton={goToCartHandler}
          class="px-14 py-3 rounded text-skin-base bg-skin-fill  dark:bg-[#f9fafb] dark:text-darkText"
          title={"Go to Cart"}
        />
      </div>
    </>
  );
};

export default CartTotal;
