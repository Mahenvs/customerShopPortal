import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "framer-motion";
import {useSelector,useDispatch} from 'react-redux';
import { setMessage } from "../store/appConfigSlice";

const Message = () => {
  
  const message1 = useSelector(store => store.appConfig.popUp);
  
  const controls = useAnimation();
  const dispatch = useDispatch();

  let classes = " px-3 w-64  ";
  console.log("message ",message1);
  if (message1?.type == 'warning') {
    classes += "bg-red-700 p-2 flex text-white text-xl font-medium justify-center rounded";
  }
  else if(message1?.type == 'info') {
    classes += "bg-blue-300 p-2 flex text-white font-medium text-xl justify-center rounded";
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      controls.start({ x: 100 }); 
      
      setTimeout(() => {
        dispatch(setMessage({
          message: '',
          status: false,
          type: 'info'
        }))
      }, 1500);
    }, 3000);
    
    return () => clearTimeout(timeout); 
  }, [message1]);

  return (
    <div
    className={`flex flex-col absolute self-end z-50 mt-12 font-medium ${message1?.status === false ? 'hidden' : 'flex'}`}
    >
      <AnimatePresence>
        <motion.span
        initial={{y:-100}}
        animate={{y:10}}
        exit={{y: -200}}
        transition={{ease:"backInOut",duration:4}}
          className={classes}
        >
          {message1?.message}
        </motion.span>
        </AnimatePresence>
    </div>
  );
};

export default Message;
