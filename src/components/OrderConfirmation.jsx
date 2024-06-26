import Button from "../UI_Elements/Button";
import OutlineButton from "../UI_Elements/OutlineButton";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCartStore } from "../store/storeSlice";
import { useDispatch } from "react-redux";
import successImg from "../../src/assets/success1.png";
import darkSuccess from "../../src/assets/darkSuccess1.png";
import { useSelector } from "react-redux";

const OrderConfirmation = () => {
  let currentTheme = useSelector((store) => store.appConfig.theme);
  const location = useLocation();
  const receivedData = location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateTo = (flag) => {
    dispatch(clearCartStore());
    if (flag == "orders") {
      navigate("../orders");
    } else {
      navigate("/");
    }
  };
  return (
    <div className=" w-1/3 shadow-2xl p-6 mb-6 bg-[#f7f7f7] rounded-md flex justify-center mx-auto align-middle items-center h-fit mt-10 dark:border-darkBorder dark:shadow-zinc-400 dark:bg-gray-950  ">
      <motion.div className="flex flex-col items-center gap-4">
        <AnimatePresence>
          <motion.img
            src={currentTheme == "light" ? successImg : darkSuccess}
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
            class="border border-slate-400 text-s kin-base  dark:bg-darkBg"
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
