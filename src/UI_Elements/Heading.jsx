import React from "react";

export const Heading = (props ) => {
  return (
    <div className={`flex mt-2 mb-4 font-semibold text-3xl font-mono  ${props.class}`}>{props.children}</div>
  );
};
