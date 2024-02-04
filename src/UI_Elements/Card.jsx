 const Card =(props) =>{
    return(<>
        <div className={`shadow-custom m-1 border rounded ${props.class}`}>
            {props.children}
        </div>

    </>)
}

export default Card;