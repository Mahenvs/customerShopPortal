const MiniHeading = (props) => {
    return (
      <div className={`text-lg font-semibold font-mono  ${props.class}`}>
          {props.children}
      </div>
    )
  }
  export default MiniHeading