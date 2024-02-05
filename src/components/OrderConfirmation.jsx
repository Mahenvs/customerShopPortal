import React from "react";
import Card from "../UI_Elements/Card";
import Button from "../UI_Elements/Button";
import OutlineButton from "../UI_Elements/OutlineButton";
import { motion, AnimatePresence } from "framer-motion";
import {Link, useLocation,useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const receivedData = location.state;
  const navigate = useNavigate();

 const navigateTo = () =>{
  navigate("/");
 }
  return (
    <div className=" w-1/3 shadow-2xl p-6 mb-6 bg-white rounded-md shadow-slate-600 flex justify-center mx-auto align-middle items-center h-fit mt-10">
      <motion.div className="flex flex-col items-center gap-5">
        <AnimatePresence>
          <motion.p
            initial={{ x: -100 }}
            animate={{ x: 10 ,rotate: 120 }}
            exit={{ y: -200 }}
            transition={{ ease: "backInOut", duration: 4,repeat: Infinity }}
            className=" h-20 w-20 rounded-full p-4 bg-green-400 border border-green-700 flex justify-center"
          >
            <motion.span
              initial={{ x: 200 }}
              animate={{ x: 0, type: "spring" ,rotate: 240 }}
              exit={{ y: -200 }}
              transition={{ ease: "backInOut", duration: 4,repeat: Infinity }}
              className="text-slate-900 text-xl "
            >
              Success!!
            </motion.span>
          </motion.p>
        </AnimatePresence>
        <h2 className="text-xl font-semibold"> {receivedData?.message} </h2>
        <section>
          <p className="font-medium text-slate-400">Order ID: {receivedData?.orderId}</p>
        </section>
        <footer className="flex gap-4 items-center">
          <OutlineButton
            class="border border-slate-400 text-slate-600"
            title="View Order"
          ></OutlineButton>
          <Button title="Continue Shopping" >
          </Button>
        </footer>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
