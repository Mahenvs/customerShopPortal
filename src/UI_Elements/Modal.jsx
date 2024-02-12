import React, { useState } from "react";
import Button from "./Button";

export const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-20 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg dark:border-darkBorder  dark:bg-darkModal">
            <Button
              class="bg-white border border-slate-600 -p-2 text-slate-900 mb-3 dark:text-darkWhite dark:border-darkWhite"
              onClickButton={onClose}
              title="Close"
            ></Button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
