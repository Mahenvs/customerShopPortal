import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LINKEDIN } from "../Utilities/constants";

export const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex flex-col items-center justify-center h-screen bg-red-100 dark:bg-red-900 p-6 text-center"
    >
      <motion.h1
        className="text-2xl font-bold text-red-700 dark:text-red-300"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        🚨 Oops! Something went wrong.
      </motion.h1>
      <p className="text-gray-700 dark:text-gray-300 mt-2">
        The application encountered an error. Please try refreshing the page Or
        Contact &nbsp;
        <motion.span
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="underline cursor-pointer  hover:font-semibold"
          onClick={() => {
            // setError(true);

            window.open(LINKEDIN, "_blank", "noopener,noreferrer");
          }}
        >
          me
        </motion.span>{" "}
      </p>

      <motion.button
        onClick={() => window.location.reload()}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-4 px-5 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
      >
        Try Again
      </motion.button>
    </motion.div>
  );
};
