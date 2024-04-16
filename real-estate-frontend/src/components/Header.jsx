import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="flex justify-between items-center  flex-wrap bg-slate-200 shadow-md py-3 px-6">
      <Link to={"/"}>
        <h1 className="font-bold text-sm sm:text-xl">
          <span className="text-slate-500">AC</span>
          <span className="text-slate-700">Estate</span>
        </h1>
      </Link>

      <form className="bg-slate-100 p-3 rounded-lg flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className=" bg-transparent outline-none w-24 sm:w-64"
        ></input>
        <FontAwesomeIcon icon={faMagnifyingGlass} className=" text-slate-500" />
      </form>

      <ul className=" flex gap-4 ">
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
        <Link to={"/sign-in"}>
          <li className="text-slate-700 hover:underline">Sign in</li>
        </Link>
      </ul>
    </header>
  );
};

export default Header;
