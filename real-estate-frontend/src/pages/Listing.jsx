import React, { useState, useEffect, useRef } from "react";
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
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";

import Contact from "../components/Contact";

const Listing = () => {
  //   SwiperCore.use([Navigation]);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // we can use useLocation() to get params or use useParams()
  const location = useLocation();
  const params = useParams();
  const listingId = location.pathname.split("/")[2];

  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(true);

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
        setLoading(false);
      }
    };

    fetchListingBasedOnId();
  }, [params.id]);

  return (
    <div className="w-full ">
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

      <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer shadow-md">
        <FontAwesomeIcon
          icon={faShare}
          className="text-slate-500"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          }}
        />
      </div>
      {copied && (
        <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
          Link copied!
        </p>
      )}

      <div className="flex flex-col max-w-4xl mx-auto p-5 my-7 gap-4 ">
        <p className="text-black text-[25px] font-semibold mt-6">
          {formData?.name} - $ {formData?.regularPrice}
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
              ${+formData?.regularPrice - +formData?.discountPrice} discount
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

        {currentUser &&
          formData?.userRef !== currentUser._id &&
          //   <button
          //     type="button"
          //     className="w-full bg-slate-700 text-white rounded-md p-3 hover:opacity-85 active:opacity-80"
          //     onClick={() => setContact(false)}
          //   >
          //     Contact Landlord
          //   </button>

          (contact ? (
            <button
              type="button"
              className="w-full bg-slate-700 text-white rounded-md p-3 hover:opacity-85 active:opacity-80"
              //   className={`w-full bg-slate-700 text-white rounded-md p-3 hover:opacity-85 active:opacity-80 `}
              onClick={() => setContact(false)}
            >
              Contact Landlord
            </button>
          ) : (
            <Contact setContact={setContact} formData={formData}></Contact>
          ))}
      </div>
    </div>
  );
};

export default Listing;
