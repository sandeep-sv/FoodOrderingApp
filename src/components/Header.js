

import { Link } from "react-router-dom";
import rlogo from "../images/rlogo.png";
import { useSelector } from "react-redux";

const Header = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const count = cartItems.reduce((total, cartItem) => {
    return total + cartItem.quantity;
  }, 0);

  return (
    <div className=" bg-white shadow-lg h-20">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center h-full px-4 sm:px-6">
        {/* Logo */}
        <div className="cursor-pointer">
          <Link to="/">
            <img className="w-24 sm:w-32 h-auto" src={rlogo} alt="Logo" />
          </Link>
        </div>

        {/* Cart */}
        <div>
          <ul className="flex items-center space-x-4">
            <li className="relative">
              <Link to="/cart" className="flex items-center">
                <i className="fas fa-shopping-bag text-xl sm:text-2xl"></i>

                {count > 0 && (
                  <span className="absolute -top-1 left-4 bg-red-600 text-white text-xs font-bold rounded-full px-[6px] py-[1px]">
                    {count}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
