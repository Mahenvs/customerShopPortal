const CustomFormLabel = (props) => {
  return (
    <>
      <span className={` mb-1 text-xl ${props.class}`}>{props.label}</span>
    </>
  );
};
export default CustomFormLabel;
