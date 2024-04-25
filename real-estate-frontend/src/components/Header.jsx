import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchDatas, setSearchDatas] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError(false);

    try {
      const res = await fetch(`/api/listing/search?searchTerm=${searchTerm}`, {
        headers: { "Content-Type": "application/json" },
      });

      navigate(`/search?searchTerm=${searchTerm}`);
      // const data = await res.json();

      // if (data.success === false) {
      //   setLoading(false);
      //   return setError(data.message);
      // }

      // console.log("this is data:", data);
      // setSearchDatas(data);
      // setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   handleSearch(event);
  // }, [searchTerm]);

  return (
    <header className="flex justify-between items-center  flex-wrap bg-slate-200 shadow-md py-3 px-6">
      <Link to={"/"}>
        <h1 className="font-bold text-sm sm:text-xl">
          <span className="text-slate-500">AC</span>
          <span className="text-slate-700">Estate</span>
        </h1>
      </Link>

      <form
        onSubmit={handleSearch}
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
