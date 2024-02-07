import React from "react";
import Card from "../UI_Elements/Card";
import Button from "../UI_Elements/Button";
import OutlineButton from "../UI_Elements/OutlineButton";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearCartStore } from "../store/storeSlice";
import { useDispatch } from "react-redux";
import successImg from "../../src/assets/tickSuccess2.jpg";

const OrderConfirmation = () => {
  const location = useLocation();
  const receivedData = location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateTo = (flag) => {
    dispatch(clearCartStore());
    if (flag == "orders") {
      navigate("orders");
    } else {
      navigate("/");
    }
  };
  return (
    <div className=" w-1/3 shadow-2xl p-6 mb-6 bg-[#f7f7f7] rounded-md sh adow-slate-600 flex justify-center mx-auto align-middle items-center h-fit mt-10">
      <motion.div className="flex flex-col items-center gap-4">
        <AnimatePresence>
          {/* <motion.p
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
          </motion.p> */}
          <motion.img
            src={successImg}
            width={250}
            initial={{ x: 0, scale: 0.6 }}
            animate={{ x: 0, scale: [0.2, 0.9, 0.6] }}
            transition={{ ease: "backInOut", duration: 2 }}
          ></motion.img>
        </AnimatePresence>
        <h2 className="text-xl font-semibold mt-[-30px]">
          {" "}
          {receivedData?.message}{" "}
        </h2>
        <section>
          <p className="font-medium text-slate-400">
            Order ID: {receivedData?.orderId}
          </p>
        </section>
        <footer className="flex gap-4 items-center">
          <OutlineButton
            class="border border-slate-400 text-slate-600"
            title="View Order"
            onClickButton={() => navigateTo("orders")}
          ></OutlineButton>
          <Button
            title="Continue Shopping"
            onClickButton={() => navigateTo("continue")}
          ></Button>
        </footer>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
