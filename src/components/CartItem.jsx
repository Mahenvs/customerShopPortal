
const CartItem = ({ item, updateCart }) => {
  return (
    <div className="flex mt-5 justify-between mb-5 pr-3 ">
    <section className="font-mono">
      <p>{item?.productName}</p>
      <p>${item?.productCartPrice?.toFixed(2)}</p>
    </section>
    <section className="self-end border border-gray-400 rounded justify-end flex px -2 ">
      <button
        className="h-fit   px-2 border-r-2 "
        onClick={() => updateCart(item, "decrease")}
      >
        -
      </button>
      <button className=" h-fit text-skin-base bg-skin-fill  px-2 border-r-2 dark:text-darkText dark:bg-darkWhite">
        {" "}
        {item?.productCartQuantity}
      </button>
      <button
        className=" h-fit  px-2"
        onClick={() => updateCart(item, "increase")}
      >
        +
      </button>
    </section>
  </div>

  )
}

export default CartItem