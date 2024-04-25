import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("this is window.locaiton.search: ", window.location.search);
    console.log("this is locaiton.search: ", location.search);

    // const urlParams = new URLSearchParams(window.location.search);
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="flex justify-between items-center  flex-wrap bg-slate-200 shadow-md py-3 px-6">
      <Link to={"/"}>
        <h1 className="font-bold text-sm sm:text-xl">
          <span className="text-slate-500">AC</span>
          <span className="text-slate-700">Estate</span>
        </h1>
      </Link>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-100 p-3 rounded-lg flex items-center"
      >
        <input
          type="text"
          placeholder="Search..."
          className=" bg-transparent outline-none w-24 sm:w-64"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        ></input>
        <button type="submit">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className=" text-slate-500 active:opacity-70"
          />
        </button>
      </form>

      <ul className=" flex gap-4 items-center">
        <Link to={"/"}>
          <li className="hidden sm:inline text-slate-700 hover:underline">
            Home
          </li>
        </Link>
        <Link to={"/about-us"}>
          <li className="hidden sm:inline text-slate-700 hover:underline">
            About
          </li>
        </Link>
        <Link to={currentUser ? "/profile" : "/sign-in"}>
          {currentUser ? (
            <img
              src={currentUser?.avatar}
              alt="profile"
              className=" w-10 h-10 rounded-full"
            ></img>
          ) : (
            <li className="text-slate-700 hover:underline">Sign in</li>
          )}
        </Link>
      </ul>
    </header>
  );
};

export default Header;
