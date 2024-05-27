import { useEffect, useState } from "react";
import sad from "../../src/assets/frowning.png";
import CustomerNavBar from "./CustomerNavBar";
import { useSpring ,animated} from "react-spring";
const StoreNotExist = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);
  const [isHovered, setIsHovered] = useState(false);

  const props = useSpring({
    width: isHovered ? 100 : 150,
    height: isHovered ? 100 : 150,
    config: { tension: 170, friction: 26 },
  });
  return (
    <div className="flex justify-center flex-col mx-auto my-24 items-center">
      <div>
        <animated.img
          src={sad}
          width={150}
          style={props}
          height={150}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        ></animated.img>
      </div>
      <div className="flex flex-col items-center my-3 font-medium text-lg">
        <span>{"Oopsy:( Store does not exist!!!"}</span>
        <p>Please contact the seller for more info..</p>
      </div>
    </div>
  );
};

export default StoreNotExist;
