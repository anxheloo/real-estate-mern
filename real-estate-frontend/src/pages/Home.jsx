import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Home = () => {
  const [offerListings, setOfferListings] = useState(null);
  const [saleListings, setSaleListings] = useState(null);
  const [rentListings, setRentListings] = useState(null);

  console.log("THis is offerListing:", offerListings);
  console.log("THis is saleListings:", saleListings);
  console.log("THis is rentListings:", rentListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/search?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/search?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/search?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  const fetchDatas = async () => {
    const res = await fetch(`/api/listing/search?${searchQuery}`);
    const data = await res.json();
  };

  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>{" "}
          <br></br>place with ease
        </h1>

        <div className="text-gray-400 text-xs sm:text-sm">
          ACEstate is the best place to find your next perfect place to live.
          <br></br>
          We have a wide range of properties for you to choose from.
        </div>

        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          <button>Let's get started...</button>
        </Link>
      </div>

      {/* swiper */}

      {offerListings && offerListings.length > 0 && (
        <div>
          <Swiper
            navigation={true}
            pagination={true}
            modules={[Pagination, Navigation]}
            className="swiper_container"
          >
            {offerListings?.map((item, index) => (
              <SwiperSlide
                key={item._id}
                className="h-[300px] "
                style={{
                  background: `url("${item?.imageUrls[0]}")`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* lisitng results for offer, sale and rent */}

      <div className="w-full max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 ">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent Offers
              </h2>
              <Link
                to={`/search?offer=true`}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more offers
              </Link>
            </div>

            <div className="flex  flex-wrap gap-4">
              {offerListings?.map((item, index) => (
                <ListingItem key={item._id} item={item}></ListingItem>
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                to={`/search?type=rent`}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more palces for rent
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              {rentListings?.map((item, index) => (
                <ListingItem key={item._id} item={item}></ListingItem>
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                to={`/search?type=sale`}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more places for sale
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              {saleListings?.map((item, index) => (
                <ListingItem key={item._id} item={item}></ListingItem>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
