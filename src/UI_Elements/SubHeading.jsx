const SubHeading = (props) => {
  return (
    <div
      className={`text-xl font-semibold font-mono dark:text-darkBg  ${props.class}`}
    >
      {props.children}
    </div>
  );
};
export default SubHeading;
