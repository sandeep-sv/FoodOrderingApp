import { useEffect ,useState} from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_URL } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import ItemCard from "./ItemCard";
import  RestaurantCategory from "./RestaurantCategory";
const RestrauntMenu = ()=>{


    const {resId} = useParams();

    const [showStatus , setShowStatus] = useState(null);

    const resInfo = useRestaurantMenu(resId);
    //const [showItems , setShowItems] = useState(false);

    if (resInfo === null) {
        return <Shimmer /> ;
    }

    const{name,cuisines} = resInfo?.data?.cards[2]?.card?.card?.info;
    const items = resInfo?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards || resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
    //console.log(items);
    const categories = items.filter((item)=> item?.card?.card?.["@type"] ==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");
    //console.log(categories);


    return(
        <div className="menu text-center">
            <h1 className="font-bold my-4">{name}</h1>
            <p className="font-bold mb-1">{cuisines.join(", ")}</p>
            <h2 className="font-bold mb-1">Menu</h2>
            <div>
                {categories.map((category,index)=>
                    (
                    <RestaurantCategory 
                    key={category?.card?.card?.title} 
                    data={category?.card?.card} 
                    showStatus = {index === showStatus ? true:false}
                    index = {index}
                    setShowStatus={setShowStatus}
                    />
                    )
                    )
                } 
            
            </div>
        </div>
    );
};

export default RestrauntMenu;