import { useEffect, useState } from "react";
import SubHeading from "./SubHeading";
import { useDispatch } from "react-redux";
import { setTheme } from "../store/appConfigSlice";
import { colors } from "../Utilities/constants";


const ThemeSwitcher = () => {
  let theme = localStorage.getItem("theme");

  const dispatch = useDispatch();

  const themePicker = (event) => {

    dispatch(setTheme(event.target.value));
    localStorage.setItem("theme", event.target.value);
    setSelectedValue(event.target.value);
  };
  const [selectedValue, setSelectedValue] = useState("Choose");

  useEffect(() => {
    setSelectedValue(theme);
  }, [theme]);
  return (
    <div className="min-w-fit gap-5 p-2 flex  justify-center items-center">
      <SubHeading>Theme Picker</SubHeading>
      <div>
        <select
          name=""
          onChange={themePicker}
          id=""
          value={selectedValue}
          className={`outline-none focus:outline-none p-1 rounded font-semibold`}
        >
          {colors?.map((item, index) => (
            <option value={item.key} key={index} className={`text-black`}>
              {item.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
