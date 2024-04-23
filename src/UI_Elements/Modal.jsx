import React, { useState } from "react";
import Button from "./Button";

export const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-20 flex items-center justify-center mb-2 dark:bg-darkBg ">
          <div className=" bg-white px-6 py-4 rounded-lg dark:border-darkBorder  dark:bg-darkModal">
           <div className="flex self-center justify-between items-center mb-3">
            <h3 className="text-[#333333] text-xl justify-start  mt-1 font-semibold mb-2 dark:text-darkWhite">
              Select Payment Type
            </h3>
            <button
              className="font-mono  text-md rounded px-2 bg-skin-fill hover:bg-buttonBg  text-buttonText dark:border-darkWhite dark:bg-darkButtonBg dark:text-darkText"
              onClick={onClose}
              title="Close"
            >X</button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
