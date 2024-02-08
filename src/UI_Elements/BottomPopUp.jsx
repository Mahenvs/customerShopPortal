import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "framer-motion";
import {useSelector,useDispatch} from 'react-redux';
import { setBottomMessage } from "../store/appConfigSlice";

const BottomPopUp = () => {
  
  const message1 = useSelector(store => store.appConfig.bottomPopUp);
  
  const controls = useAnimation();
  const dispatch = useDispatch();

  let classes = " px-3 w-64  ";
  console.log("message ",message1);
  if (message1?.type == 'warning') {
    classes += "bg-red-700 p-2 flex text-white text-xl font-medium justify-center rounded";
  }
  else if(message1?.type == 'info') {
    classes += "bg-blue-300 p-2 flex text-end text-white font-medium text-xl justify-end rounded";
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      controls.start({ y: 100 }); 
      
      setTimeout(() => {
        dispatch(setBottomMessage({
          bottommessage: '',
          status: false,
          type: 'info'
        }))
      }, 1500);
    }, 2000);
    
    return () => clearTimeout(timeout); 
  }, [message1]);

  return (
    <div
    className={`flex flex-col absolute justify-end right-0 z-50 bottom-[5.5rem] font-medium ${message1?.status === false ? 'hidden' : 'flex'}`}
    >
      <AnimatePresence>
        <motion.span
        initial={{y:100}}
        animate={{y:0}}
          className={classes}
        >
          {message1?.bottommessage}
        </motion.span>
        </AnimatePresence>
    </div>
  );
};

export default BottomPopUp;
