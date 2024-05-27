import React from "react";
import OutlineButton from "../UI_Elements/OutlineButton";

export const ShoppingCartItem = ({
  item,
  handleQuantityChange,
  removeItemFromCart,
  options,
}) => {
  return (
    <div className="drop-sha dow border-2 border-gray-200  rounded-xl p-2 py-2 flex gap-4 my-4 -b dark:border-darkBorder ">
      <section className="w-1/4 p-1 bo rder rounded dark:border-none">
        <img src={item?.productImageUrl} alt="" width="100px" />
      </section>
      <section className="w-2/4 gap-4 flex flex-col">
        <h1 className="text-lg text-gray-700 font-medium dark:text-zinc-300">
          {item?.productName}
        </h1>
        <p className="dark:text-zinc-500">
          ${item?.productCartPrice.toFixed(2)}{" "}
        </p>
        <p className="my-1">
          Qty:
          <select
            className="ml-2 p-1 w-14 outline-none border border-slate-300 dark:border-darkBorder  focus:border-slate-400 rounded dark:text-darkText"
            value={item.productCartQuantity}
            onChange={(e) => handleQuantityChange(item, e.target.value)}
          >
            {options.map((value, optionIndex) => {
              if (value.value <= item?.productStockQuantity) {
                return (
                  <option key={value.value + optionIndex} value={value.value}>
                    {value.value}
                  </option>
                );
              }
              return null;
            })}
          </select>
        </p>
      </section>
      <section className="justify-start">
        <OutlineButton
          onClickButton={() => removeItemFromCart(item)}
          class="text-skin-light bg-skin-light text-lg border py-[1px] px-2 h-fit "
          title="Remove"
        ></OutlineButton>
        <p className="text-sm font-light self-end mx-4">
          Avail. Stock: {item?.productStockQuantity}
        </p>
      </section>
    </div>
  );
};
