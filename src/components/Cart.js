

import { useSelector } from "react-redux";
import CartCard from "./CartCard";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.info.defaultPrice / 100 || item.info.price / 100) * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="w-full sm:w-1/2 mx-auto text-center mt-10">
        <h1 className="mb-4 text-lg font-bold">Cart</h1>
        <p className="text-md">No items present, please add items to the cart.</p>
      </div>
    );
  }

  return (
    <div className="w-[90%] md:w-[60%] lg:w-[50%]  mx-auto text-center mt-10 ">
      <h1 className="mb-4 text-lg font-bold">Cart</h1>
      <div className="">
        {
          cartItems.map((item) => <CartCard itemData={item} key={item?.info?.id} />)
        }
      </div>

      <div className="mt-6 border-t pt-4">
        <h2 className="text-lg font-bold">Total Price: ₹{totalPrice.toFixed(2)}</h2>
      </div>

      <div className="mt-4">
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default Cart;
