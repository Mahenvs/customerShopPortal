import React from "react";
import EmptyCartBg from "../UI_Elements/EmptyCartBg";
import SubHeading from "../UI_Elements/SubHeading";

const EmptyCart = ({ isLoggedIn }) => {
  return (
    <SubHeading class="p-3.5 ">
      {isLoggedIn ? (
        <>
          <EmptyCartBg></EmptyCartBg>
          <span className="flex justify-center text-center">
            No Products in the Cart..
          </span>
        </>
      ) : (
        "Login to your account to view the cart!"
      )}
    </SubHeading>
  );
};

export default EmptyCart;
