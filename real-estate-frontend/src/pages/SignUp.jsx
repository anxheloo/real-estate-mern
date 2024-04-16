import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignOut = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSignUpBtn = async (event) => {
    event.preventDefault();

    const res = await fetch("/api/auth/signup", formData);

    console.log("form submitted");
  };

  const handleGoogleBtn = (event) => {
    event.preventDefault();
    console.log("form submitted");
  };

  return (
    <div
      // bg-[#f3f5f2]
      // style={{ minHeight: "calc(100vh - 72px)" }}
      //instead of using the styles above for bg color of the sign up page, we set the bg in the body inside index.css
      className="w-full h-full min-h-[70vh] flex flex-col justify-center "
    >
      <h1 className="text-3xl text-center font-semibold py-7">Sign Up</h1>
      <form
        onSubmit={handleSignUpBtn}
        className="flex flex-col gap-3 w-full max-w-[600px] mx-auto p-5 "
      >
        <input
          id="username"
          className="border p-3 rounded-lg outline-none caret-black "
          name="username"
          type="text"
          value={formData.username}
          required
          placeholder="Username"
          onChange={handleChange}
        ></input>
        <input
          id="email"
          className="border p-3 rounded-lg outline-none"
          name="email"
          type="email"
          value={formData.email}
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
          placeholder="Password"
          onChange={handleChange}
        ></input>

        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 active:opacity-80 disabled:opacity-70 mt-4"
          onClick={handleSignUpBtn}
        >
          Sign Up
        </button>
        <button
          type="text"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 active:opacity-80 disabled:opacity-70"
          onClick={handleGoogleBtn}
        >
          Continue with google
        </button>
      </form>

      <h3 className=" w-full max-w-[600px] mx-auto px-5">
        Have an account?{" "}
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </h3>
    </div>
  );
};

export default SignOut;
