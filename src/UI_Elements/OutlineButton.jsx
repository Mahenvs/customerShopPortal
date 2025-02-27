// import './Button.css';

const OutlineButton = (props) => {
  let className = ` dark:bg-darkButtonBg dark:text-darkText   px-5 py-1 font-mono text-lg rounded-md `;
  if (props.class) {
    className = ` dark:bg-darkButtonBg dark:text-darkText  px-5 py-1 font-mono text-lg rounded-md   ${props.class}`;
  }

  return (
    <>
      <button type="button" className={className} onClick={props.onClickButton}>
        {props.title}
      </button>
    </>
  );
};
export default OutlineButton;
