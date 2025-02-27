import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LINKEDIN } from "../Utilities/constants";

const MaintenanceBanner = () => {
  const navigate = useNavigate();
  // const [error, setError] = useState(false);

  if (error) {
    throw new Error("Something went wrong!"); // Triggers Error Boundary
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-red-500 border-b border-red-700 text-white text-lg text-center p-3 font-semibold shadow-lg"
    >
      Currently, the application is down. Contact{" "}
      <motion.span
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="underline cursor-pointer text-white/90 hover:text-white"
        onClick={() => {
          // setError(true);
          // navigate(LINKEDIN);
          window.location.href = LINKEDIN;
        }}
      >
        me
      </motion.span>{" "}
      for more details.
    </motion.div>
  );
};

export default MaintenanceBanner;
