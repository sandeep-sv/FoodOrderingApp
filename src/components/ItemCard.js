

import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";

const ItemCard = ({ itemData }) => {
  const card = itemData.card;
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addItem(card));
  };

  const price = (card?.info?.price ?? card?.info?.defaultPrice) / 100;

  return (
    <div className="max-w-screen-md mx-auto px-4">
      <div className="flex flex-col md:flex-row border-b-2 border-gray-200 py-6">
        {/* Left Info Section */}
        <div className="w-full md:w-9/12 md:pr-4">
          <h3 className="text-lg font-semibold">{card?.info?.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{card?.info?.description}</p>
          <p className="text-md mt-2 font-medium">₹{price}</p>
        </div>

        {/* Right Image + Button */}
        <div className="w-full md:w-3/12 relative mt-4 md:mt-0 flex justify-center items-center">
          {card?.info?.imageId && (
            <img
              className="w-40 h-28 object-cover rounded-lg"
              src={CDN_URL + card.info.imageId}
              alt={card?.info?.name}
            />
          )}
          <button
            onClick={handleAdd}
            className="text-white bg-black py-2 px-4 rounded-lg absolute bottom-0 md:left-1/2 md:-translate-x-1/2 mt-2 md:mt-0 md:w-auto"
            style={{ height: '40px' }}  // Fix the height issue
          >
            Add +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
