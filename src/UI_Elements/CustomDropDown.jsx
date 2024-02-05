import { useState } from "react";

const CustomDropDown = ({ options, inputChange, itemId, itemName }) => {
  const [selectedValue, setSelectedValue] = useState("Open dropdown");
  console.log("option s ",options);
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
        className={`w-[25rem] leading-8 p-2 my-2 border-b-2 border-sky-700 rounded text-xl   focus:outline-none focus:border-sky-900  justify-end ${selectedValue == "Open dropdown" ? "text-slate-400" : "text-gray-700" }`}
      >
        {options?.map((item) => (
          <option key={item[itemId]} value={itemId == "categoryId" ? item[itemName] : item[itemId]}
          className={item[itemName] == 'Open dropdown' ? 'text-slate-300 hidden' : ''}>
            {item[itemName]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropDown;
