import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapPin,
  faBed,
  faBath,
  faSquareParking,
  faCouch,
  faShare,
} from "@fortawesome/free-solid-svg-icons";

const ListingItem = ({ item }) => {
  return (
    <div className="w-full sm:max-w-[320px] bg-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden rounded-lg">
      <Link to={`/listing/${item?._id}`}>
        <img
          src={
            item?.imageUrls[0] ||
            "https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2022/12/07082032/10-Companies-That-Hire-for-Remote-Real-Estate-Jobs.jpg"
          }
          alt="listing-cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300 cursor-pointer"
        ></img>

        <div className=" p-3 flex flex-col gap-2 ">
          <p className="text-lg font-semibold text-slate-700 truncate">
            {item?.name}
          </p>

          <div className="flex gap-2 items-center">
            <FontAwesomeIcon
              className="h-4 w-4 text-green-700"
              icon={faMapPin}
            ></FontAwesomeIcon>
            <p className="text-sm text-gray-600 truncate">{item?.address}</p>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">
            {item?.description}
          </p>

          <p className=" text-slate-500 mt-2 font-semibold">
            $
            {item?.offer
              ? (item?.regularPrice - item?.discountPrice).toLocaleString(
                  "en-US"
                )
              : item?.regularPrice.toLocaleString("en-US")}
            {item?.type === "rent" && " / month"}
          </p>

          <div className="text-sm text-slate-700 font-semibold flex gap-3">
            <div>
              {item?.bedrooms} {item?.bedrooms > 1 ? "beds" : "bed"}
            </div>{" "}
            <div>
              {item?.bathrooms} {item?.bathrooms > 1 ? "baths" : "bath"}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
