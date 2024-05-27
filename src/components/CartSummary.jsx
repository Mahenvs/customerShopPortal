import React from "react";
import Button from "../UI_Elements/Button";

export const CartSummary = ({
  cartTotal,
  formattedTotal,
  verifiedUser,
  paymentConfirmHandler,
}) => {
  return (
    <div className="mt-10 gap-10 w-[100px] p-3 border flex-1 rounded h-fit">
      <section className="h-fit px-2">
        <span className="flex justify-between">
          <h6 className="font-base font-mono text-lg">Item Total </h6>$
          {cartTotal}
        </span>
        <span className="flex justify-between  my-3 mb-4">
          <h6 className="font-base font-mono text-lg">Delivery Fee </h6>
          <p className={cartTotal > 500 ? "text-green-500" : " text-red-400"}>
            {cartTotal < 500 ? `$50` : "FREE"}
          </p>
        </span>
        <p className="border-b my-1 dark:border-darkBorder"></p>
        <span className="flex justify-between">
          <h5 className="font-base font-mono text-lg">Grand total </h5>
          <p className="font-medium">$ {formattedTotal}</p>
        </span>
        <p className="text-sm font-mono text-slate-400">
          {" "}
          Inclusive of all taxes{" "}
        </p>

        <p className="border-b my-4"></p>
        <span className="flex justify-between my-1">
          <h5 className=" font-mono text-base text-slate-400">
            Avg delivery time:{" "}
          </h5>
          <p className="font-medium text-green-300">3-5 days</p>
        </span>
        <div className="flex justify-center my-4 dark:bg-[#f9fafb] dark:text-darkText">
          {!verifiedUser ? (
            <Button
            
              class="px-14 py-2 rounded w-full font-semibold cursor-default"
              title={"Verify your mail to continue"}
            />
          ) : (
            <Button
              onClickButton={paymentConfirmHandler}
              class="px-14 py-2 rounded w-full dark:bg-darkButtonBg dark:text-darkText text-skin-base bg-skin-fill"
              title={"Continue"}
            />
          )}
        </div>
      </section>
    </div>
  );
};
