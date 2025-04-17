import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props)=>{
      const{resData} = props;
      const {name,cuisines,avgRating} = resData?.info;
      const {slaString} = resData?.info?.sla;
      return (
         <div className="m-4 p-4 w-[287px] rounded-lg transform transition duration-300 hover:scale-95 ">
            <img className="rounded-lg w-[100%] h-40 shadow-xl" src={CDN_URL+resData.info.cloudinaryImageId}/>
            <h3 className="font-bold py-4 whitespace-nowrap overflow-hidden text-ellipsis">{name}</h3>
            <h4 className="whitespace-nowrap overflow-hidden text-ellipsis">{cuisines.join(",  ")}</h4>
            <h4>{avgRating} Stars</h4>
            <h4>{slaString}</h4>
         </div>

      );
   };

   export const withPromotionLabel = (RestaurantCard)=>{
      return (props)=>{
         const{resData}=props;
         return(
            <div className="relative transform transition duration-300 hover:scale-90">
               <label className=" text-white font-bold text-lg absolute left-6 top-32 rounded-lg m-2 p-2 z-10 pointer-events-none">{resData?.info?.aggregatedDiscountInfoV3?.header} {resData?.info?.aggregatedDiscountInfoV3?.subHeader}</label>
               <RestaurantCard {...props}/>
            </div>
         );
      };

   };

   export default RestaurantCard;

   // transform transition duration-300 hover:scale-90