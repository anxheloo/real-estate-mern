import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

const Search = () => {
  const navigate = useNavigate();
  const [sideBarDatas, setSideBarDatas] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  const [searchDatas, setSearchDatas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("SideBarData: ", sideBarDatas);
  console.log("location: ", location.search);
  console.log(searchDatas);

  const handleChange = (event) => {
    if (
      event.target.name === "all" ||
      event.target.name === "rent" ||
      event.target.name === "sale"
    ) {
      setSideBarDatas((prevValues) => ({
        ...prevValues,
        type: event.target.name,
      }));
    }

    if (event.target.name === "searchTerm") {
      setSideBarDatas((prevValues) => ({
        ...prevValues,
        searchTerm: event.target.value,
      }));
    }

    if (
      event.target.name === "parking" ||
      event.target.name === "furnished" ||
      event.target.name === "offer"
    ) {
      setSideBarDatas((prevValues) => ({
        ...prevValues,
        // [event.target.name]: event.target.checked,
        [event.target.name]:
          event.target.checked || event.target.checked === "true"
            ? true
            : false,
      }));
    }

    if (event.target.name === "sort_order") {
      const sort = event.target.value.split("_")[0] || "createdAt";
      const order = event.target.value.split("_")[1] || "desc";

      console.log(sort, order);

      setSideBarDatas((prevValues) => ({
        ...prevValues,
        sort,
        order,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sideBarDatas?.searchTerm);
    urlParams.set("type", sideBarDatas?.type);
    urlParams.set("parking", sideBarDatas?.parking);
    urlParams.set("furnished", sideBarDatas?.furnished);
    urlParams.set("offer", sideBarDatas?.offer);
    urlParams.set("sort", sideBarDatas?.sort);
    urlParams.set("order", sideBarDatas?.order);

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSideBarDatas({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "createAt",
        order: orderFromUrl || "desc",
      });
    }

    const fetchDatas = async () => {
      setLoading(true);
      setError(null);

      const searchQuery = urlParams.toString();
      console.log("searchQuery", searchQuery);
      const res = await fetch(`/api/listing/search?${searchQuery}`);
      const data = await res.json();
      setSearchDatas(data);
      setLoading(false);
    };

    fetchDatas();
  }, [location.search]);

  return (
    <div className="flex flex-col md:flex-row ">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="font-semibold whitespace-nowrap">
              Search Term:
            </label>
            <input
              type="text"
              name="searchTerm"
              id="searchTerm"
              placeholder="Search..."
              className=" border rounded-lg p-3 w-full"
              value={sideBarDatas.searchTerm}
              onChange={handleChange}
            ></input>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <label className="font-semibold whitespace-nowrap">Type:</label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="all"
                name="all"
                className="w-5 h-5"
                onChange={handleChange}
                checked={sideBarDatas.type === "all"}
              ></input>
              <span>Rent & Sale</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rent"
                name="rent"
                className="w-5 h-5"
                onChange={handleChange}
                checked={sideBarDatas.type === "rent"}
              ></input>
              <span>Rent</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sale"
                name="sale"
                className="w-5 h-5"
                onChange={handleChange}
                checked={sideBarDatas.type === "sale"}
              ></input>
              <span>Sale</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="offer"
                name="offer"
                className="w-5 h-5"
                onChange={handleChange}
                checked={sideBarDatas.offer === true}
              ></input>
              <span>offer</span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <label className="font-semibold whitespace-nowrap">
              Aminities:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="parking"
                name="parking"
                className="w-5 h-5"
                onChange={handleChange}
                checked={sideBarDatas.parking === true}
              ></input>
              <span>Parking</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="furnished"
                name="furnished"
                className="w-5 h-5"
                onChange={handleChange}
                checked={sideBarDatas.furnished === true}
              ></input>
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex items-center gap-2 ">
            <label className="font-semibold whitespace-nowrap">Sort:</label>
            <select
              id="sort_order"
              name="sort_order"
              className=" border rounded-lg p-3 w-full"
              onChange={handleChange}
              defaultValue={"created_at_desc"}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button
            type="submit "
            className="w-full p-3 bg-slate-700 text-white rounded-lg"
          >
            Search
          </button>
        </form>
      </div>

      <div className="w-full">
        <h1 className="text-3xl font-semibold border-b p-5 text-slate-700 ">
          Listing Results :
        </h1>

        <div className="p-7 flex flex-wrap gap-4">
          {searchDatas && searchDatas.length > 0 ? (
            searchDatas.map((item, index) => (
              <ListingItem key={item._id} item={item}></ListingItem>
            ))
          ) : (
            <p className="text-xl text-center text-slate-700">
              There are no listings matching your search criteria
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
