import { useState } from "react";

const CustomDropDown = ({ options, inputChange, itemId, itemName }) => {
  const [selectedValue, setSelectedValue] = useState("Choose");
  
  const handler = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    inputChange(newValue);
  };
  return (
    <div className="mb-3 ">
      <select
        value={selectedValue}
        onChange={(e) => handler(e)}
        className={`w-[25rem] leading-8 p-2 my-2 border-b-2 border-skin-base rounded text-xl focus:outline-none focus:border-skin-base  justify-end dark:text-darkGray dark:bg-darkWhite dark:text-darkText ${
          selectedValue == "Choose"
            ? "text-[slate-400] dark:text-darkGray dark:bg-darkWhite"
            : "text-gray-700 dark:text-darkGray dark:bg-darkWhite"
        }`}
      >
        {options?.map((item) => (
          <option
            key={item[itemId]}
            value={itemId == "categoryId" ? item[itemName] : item[itemId]}
            className={`${
              item[itemName] === "Choose"
                ? "text-black bg-white hidden "
                : "text-gray-700 bg-white hover:bg-green-400 dark:text-darkGray dark:bg-darkWhite"
            } hover:bg-white`}
          >
            {item[itemName]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropDown;
