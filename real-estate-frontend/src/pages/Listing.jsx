import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapPin,
  faBed,
  faBath,
  faSquareParking,
  faCouch,
} from "@fortawesome/free-solid-svg-icons";

const Listing = () => {
  //   SwiperCore.use([Navigation]);

  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // we can use useLocation() to get params or use useParams()
  const location = useLocation();
  const params = useParams();
  const listingId = location.pathname.split("/")[2];

  console.log("This is listingId:", listingId);
  console.log("This is formData:", formData);
  console.log("This is params:", params.id);

  useEffect(() => {
    const fetchListingBasedOnId = async () => {
      setLoading(true);
      setError(false);

      try {
        const res = await fetch(`/api/listing/get/${params.id}`, {
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        if (data.success === false) {
          setLoading(false);
          return setError(data.message);
        }

        console.log("this is data:", data);
        setFormData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchListingBasedOnId();
  }, [params.id]);

  return (
    <div className="w-full">
      {formData && !loading && !error && (
        <div>
          <Swiper
            navigation={true}
            pagination={true}
            modules={[Pagination, Navigation]}
            className="swiper_container"
          >
            {formData?.imageUrls?.map((image, index) => (
              <SwiperSlide
                key={image}
                className="h-[300px] "
                style={{
                  background: `url("${image}")`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <div className="p-5">
        <p className="text-black text-[25px] font-semibold mt-6">
          {formData?.name} - $ {formData?.discountPrice}
          {formData?.type === "rent" && " / month"}
        </p>

        <p className="flex items-center mt-6 gap-2 text-slate-600 my-2 text-sm">
          <FontAwesomeIcon icon={faMapPin}></FontAwesomeIcon>
          {formData?.address}
        </p>

        <div className="flex gap-4 py-8">
          <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md cursor-pointer">
            {formData?.type === "rent" ? "For rent" : "For Sale"}
          </p>

          {formData?.offer && (
            <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md cursor-pointer">
              ${+formData?.regularPrice - +formData?.discountPrice}
            </p>
          )}
        </div>

        <p className=" text-slate-800 break-words">
          <strong className=" font-semibold text-black">Description - </strong>
          {formData?.description}
        </p>

        <ul className="text-green-900 font-semibold text-sm flex flex-wrap gap-5 py-5">
          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FontAwesomeIcon icon={faBed} />{" "}
            {formData?.bedrooms > 1
              ? `${formData?.bedrooms} beds `
              : `${formData?.bedrooms} beds `}
          </li>

          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FontAwesomeIcon icon={faBath} />{" "}
            {formData?.bathrooms > 1
              ? `${formData?.bathrooms} baths `
              : `${formData?.bathrooms} bath `}
          </li>

          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FontAwesomeIcon icon={faSquareParking} />{" "}
            {formData?.parking ? "Parking " : "No Parking"}
          </li>

          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FontAwesomeIcon icon={faCouch} />{" "}
            {formData?.parking ? "Furnished " : "Unfurnished"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Listing;
