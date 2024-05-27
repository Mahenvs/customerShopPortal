import { Link } from "react-router-dom";
import { CategoriesIcon } from "../Icons/CategoriesIcon";
import Badge from "../UI_Elements/Badge";
import CartIcon from "../Icons/CartIcon";
import { ProfileIcon, User } from "../Icons/ProfileIcon";
import { OrdersIcon } from "../Icons/OrdersIcon";
import { LogOut } from "../Icons/LogOut";
import nightMode from "../assets/nightMode.png";
import lightMode from "../assets/light-mode.png";
import { useSelector } from "react-redux";

export const UserActions = ({
  cartCnt,
  isLoggedIn,
  currentTheme,
  changeTheme,
  showLogOut,
  setLogOut,
  logOutRef,
  navigateTo,
}) => {
  const { Email } = useSelector((store) => store.appConfig.user);

  return (
    <section className="font-medium text-lg w-2/5 flex mx-14 gap-10 text-white-500 items-center">
      {isLoggedIn && (
        <div className="flex items-center gap-1">
          <CategoriesIcon />
          <Link
            to={"categories"}
            className="cursor-pointer"
            onClick={() => navigateTo("categories")}
          >
            Categories
          </Link>
        </div>
      )}

      {!isLoggedIn && <Link to="auth?signin">Sign In</Link>}

      {isLoggedIn && (
        <Link to="cart" className="flex  cursor-pointer items-center ">
          {cartCnt != 0 ? <Badge value={cartCnt} /> : ""}
          {/* <img
        src={currentTheme !== "dark" ? cartImg : darkShop}
        width={30}
      /> */}
          <CartIcon />

          <span className="z-10">Cart</span>
        </Link>
      )}
      {isLoggedIn && (
        <div className="flex items-center ">
          <ProfileIcon />
          <span
            className="cursor-pointer"
            onClick={() => setLogOut((val) => !val)}
          >
            Account
          </span>
        </div>
      )}
      <div className="font-medium">
        <img
          onClick={() => changeTheme()}
          src={currentTheme != "dark" ? nightMode : lightMode}
          width={25}
        />
      </div>
      {showLogOut && (
        <div
          ref={logOutRef}
          className={`${
            isLoggedIn
              ? `absolute text-start top-12 text-base right-[11rem] p-3 border border-gray-300 z-20 
        bg-white rounded mt-2 dark:border-darkBorder dark:bg-darkBg dark:text-darkWhite`
              : ``
          }`}
          onClick={() => setLogOut((val) => !val)}
        >
          {isLoggedIn ? (
            <>
              <div className="flex border-b p-1 gap-1">
                <User />
                {Email}
              </div>
              <li className="list-none border-b p-1">
                <div
                  className="cursor-pointer flex gap-2 items-center"
                  onClick={() => navigateTo("myOrders")}
                >
                  <OrdersIcon />
                  My Orders
                </div>
              </li>
              <li className="list-none border-b  ">
                <div
                  className="cursor-pointer gap-2 flex items-center p-1"
                  onClick={() => navigateTo("my-profile")}
                >
                  <div className={`bg-skin-fill h-5 w-5 rounded-full `}></div>
                  Switch Theme
                </div>
              </li>
              <li className="list-none ">
                <div className="p-1 flex items-center">
                  <button
                    className=" cursor-pointer flex gap-1"
                    onClick={() => navigateTo("logOut")}
                  >
                    <LogOut />
                    Logout
                  </button>
                </div>
              </li>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </section>
  );
};
