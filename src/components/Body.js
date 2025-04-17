

import { useState, useEffect } from "react";
import RestaurantCard, { withPromotionLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestraunts, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromotionLabel(RestaurantCard);
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://corsproxy.io/?url=" + encodeURIComponent("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.406498&lng=78.47724389999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"));
    const json = await data.json();

    const restaurants =
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
      json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    setListOfRestaurants(restaurants);
    setFilteredRestaurants(restaurants);
  };

  const handleSearch = () => {
    const filtered = listOfRestraunts.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  if (!onlineStatus) {
    return (
      <h1 className="text-center text-red-500 font-bold mt-8">
        ⚠️ You're offline! Please check your internet connection.
      </h1>
    );
  }

  if (listOfRestraunts.length === 0) return <Shimmer />;

  return (
    <div className="px-4 py-6">
      {/* Search Bar */}
      <div className="w-full sm:w-3/4 mx-auto flex flex-wrap justify-center items-center gap-2 mb-6">
        <input
          type="text"
          className="border border-gray-300 px-4 py-2 rounded-l-md w-[240px] sm:w-96"
          placeholder="Search for restaurants"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Restaurant List */}
      <div className="flex flex-wrap gap-6 justify-center">
        {filteredRestaurants.length === 0 ? (
          <p className="text-gray-500 text-center mt-8 w-full">
            😕 No restaurants match your search.
          </p>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <Link key={restaurant.info.id} to={"/restraunts/" + restaurant.info.id}>
              {restaurant.info.aggregatedDiscountInfoV3 ? (
                <RestaurantCardPromoted resData={restaurant} />
              ) : (
                <RestaurantCard resData={restaurant} />
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
