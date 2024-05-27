import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const CustomFormControl = forwardRef((props, ref) => {
  let classes = `w-[25rem] leading-8 p-1 my-1 border-b-2 border-sky-700 rounded text-xl text-gray-900  focus:outline-none focus:border-sky-900 ${props.extraClass}`;

  if (props.class == "error") {
    classes = `w-[25rem] leading-8 p-1 border-b-2 border-red-600 text-stone-950 rounded text-xl  focus:outline-none focus:border-sky-900`;
  }

  return (
    <span className="w- flex mb-2 ">
      <input
        className={classes}
        ref={ref}
        type={props.type}
        placeholder={props.title}
        id={props.id}
        onChange={props.inputChange}
        value={props.value}
        onBlur={props.inputBlur}
      />
    </span>
  );
});
export default CustomFormControl;
