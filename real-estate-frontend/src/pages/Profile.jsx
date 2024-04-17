import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../store/user/userSlice.js";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const imgInputRef = useRef();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    uploadedImg: null,
  });

  const handleChange = (event) => {
    setFormData((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-7 ">Profile</h1>

      <form className="flex flex-col gap-3 w-full max-w-[600px] mx-auto p-5 ">
        <input
          type="file"
          ref={imgInputRef}
          hidden
          accept="image/*"
          // className="hidden"
        ></input>

        <img
          src={currentUser.avatar}
          className=" w-24 h-24 rounded-full mx-auto mb-4 object-cover cursor-pointer"
          alt="profile"
          onClick={() => imgInputRef.current.click()}
        ></img>

        <input
          id="username"
          className="border p-3 rounded-lg outline-none"
          name="username"
          type="text"
          value={currentUser.username}
          required
          placeholder="Email"
          onChange={handleChange}
        ></input>
        <input
          id="email"
          className="border p-3 rounded-lg outline-none"
          name="email"
          type="email"
          value={currentUser.email}
          required
          placeholder="Email"
          onChange={handleChange}
        ></input>
        <input
          id="password"
          className="border p-3 rounded-lg outline-none"
          name="password"
          type="password"
          value={formData.password}
          required
          placeholder="Password"
          onChange={handleChange}
        ></input>

        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 active:opacity-80 disabled:opacity-70 mt-4"
        >
          UPDATE
        </button>

        <button
          type="button"
          className="bg-[#116831] text-white p-3 rounded-lg uppercase hover:opacity-90 active:opacity-80 disabled:opacity-70"
        >
          CREATE LISTING
        </button>
      </form>

      <div className="flex justify-between items-center w-full max-w-[600px] mx-auto p-5">
        <h3 className="text-red-700 cursor-pointer">Delete Account</h3>
        <h3 className="text-red-700 cursor-pointer">Sign Out</h3>
      </div>

      <h3 className="text-center ">Show listings</h3>
    </div>
  );
};

export default Profile;
