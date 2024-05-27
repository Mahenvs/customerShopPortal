import { useEffect, useState } from "react";
import sad from "../../src/assets/frowning.png";
import { motion, useSpring } from "framer-motion";

const StoreNotExist = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  const [isHovered, setIsHovered] = useState(false);

  const springProps = useSpring({
    width: isHovered ? 100 : 150,
    height: isHovered ? 100 : 150,
    config: { tension: 170, friction: 26 },
  });

  return (
    <motion.div
      className="flex justify-center flex-col mx-auto my-24 items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.img
        src={sad}
        width={150}
        style={springProps}
        height={150}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      ></motion.img>
      <div className="flex flex-col items-center my-3 font-medium text-lg">
        <span>{"Oopsy:( Store does not exist!!!"}</span>
        <p>Please contact the seller for more info..</p>
      </div>
    </motion.div>
  );
};

export default StoreNotExist;
