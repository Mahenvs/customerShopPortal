import React from 'react'
import sad from "../../src/assets/frowning.png";
const StoreNotExist = () => {
  return (
    <div>
        <img src={sad} width={150} height={150}></img>
        <span>{"Oopsy:( Store does not exist!!!"}</span>
    
    </div>
  )
}

export default StoreNotExist