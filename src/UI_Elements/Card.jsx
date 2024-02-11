 const Card =(props) =>{
    return(<>
        <div className={`shadow-custom m-1 border rounded dark:border-darkBorder  ${props.class}`}>
            {props.children}
        </div>

    </>)
}

export default Card;