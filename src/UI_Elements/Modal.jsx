import React, { useState } from "react";
import Button from "./Button";

export const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <Button
              class="bg-white border border-slate-600 -p-2 text-slate-700 mb-3"
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
