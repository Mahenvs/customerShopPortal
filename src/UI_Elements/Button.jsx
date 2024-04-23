// import './Button.css';

const Button = (props) => {
    let className = `dark:bg-darkButtonBg dark:text-darkText dark:rounded-md  px-5 py-1 font-mono text-lg rounded-md text-skin-base bg-skin-fill`;
    if(props.class){
        className = `dark:bg-darkButtonBg dark:text-darkText dark:rounded-md px-5 py-1 font-mono text-lg rounded-md text-skin-base bg-skin-fill ${props.class}` ;
    }
    return <>
        <button type='button' className={className}  
        onClick={props.onClickButton}>
            {props.title}
        </button>
    </>
}
export default Button;