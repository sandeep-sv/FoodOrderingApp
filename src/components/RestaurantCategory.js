

import ItemCard from "./ItemCard";

const RestaurantCategory = ({ data, showStatus, setShowStatus, index }) => {
  return (
    <div className="bg-gray-100 my-6 shadow-lg w-[90%] md:w-[60%] mx-auto p-4 text-base sm:text-lg " key={data.title}>
      <div
        className="flex justify-between cursor-pointer"
        onClick={() => {
          showStatus ? setShowStatus(null) : setShowStatus(index);
        }}
      >
        <span className="font-bold">
          {data.title} ({data.itemCards.length})
        </span>
        <span>{!showStatus ? "▼" : "▲"}</span>
      </div>

      {showStatus &&
        data?.itemCards.map((item) => <ItemCard key={item.id} itemData={item} />)}
    </div>
  );
};

export default RestaurantCategory;
