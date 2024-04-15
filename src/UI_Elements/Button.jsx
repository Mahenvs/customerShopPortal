// import './Button.css';

const Button = (props) => {
    let className = `dark:bg-darkLightBlack dark:darkWhite   px-5 py-1 font-mono text-lg rounded-md text-buttonText bg-buttonBg`;
    if(props.class){
        className = `dark:bg-darkLightBlack dark:darkWhite px-5 py-1 font-mono text-lg rounded-md text-buttonText bg-buttonBg ${props.class}` ;
    }
    return <>
        <button type='button' className={className}  
        onClick={props.onClickButton}>
            {props.title}
        </button>
    </>
}
export default Button;