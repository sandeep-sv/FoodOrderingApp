

import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem, removeItem } from "../utils/cartSlice";

const CartCard = ({ itemData }) => {
  const card = itemData;
  const dispatch = useDispatch();

  const increase = () => {
    dispatch(addItem(card));
  };

  const decrease = () => {
    dispatch(removeItem(card));
  };

  return (
    <div className="flex flex-col md:flex-row border-4 rounded-lg my-3 mx-4 p-4">
      {/* Left Side: Info */}
      <div className="md:w-9/12 mb-4 md:mb-0 md:pr-6">
        <h2 className="text-lg font-semibold">{card.info.name}</h2>
        <p className="text-md">
          ₹{(card.info.defaultPrice ?? card.info.price) / 100}
        </p>
        <p className="text-sm text-gray-600 mt-1">{card.info.description}</p>
        <p className="text-md mt-2 font-semibold">Quantity: {card.quantity}</p>
      </div>

      {/* Right Side: Image + Buttons */}
      <div className="md:w-3/12 flex flex-col items-center justify-between">
        {card.info.imageId && (
          <img
            className="w-40 h-28 object-cover rounded-md mb-2"
            src={CDN_URL + card.info.imageId}
            alt={card.info.name}
          />
        )}
        <div className="flex bg-white border rounded-lg shadow-sm">
          <button
            className="py-1 px-4 text-lg font-bold hover:bg-gray-200"
            onClick={decrease}
          >
            -
          </button>
          <span className="py-1 px-4 font-semibold">{card.quantity}</span>
          <button
            className="py-1 px-4 text-lg font-bold hover:bg-gray-200"
            onClick={increase}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
