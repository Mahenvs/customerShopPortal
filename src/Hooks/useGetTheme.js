import { setTheme } from "../store/appConfigSlice";
import { useDispatch } from "react-redux";

const useGetTheme = () => {
  const dispatch = useDispatch();
  const currentTheme = localStorage.getItem("theme") ?? "light";
  dispatch(setTheme(currentTheme));
  return currentTheme;
};

export default useGetTheme;
