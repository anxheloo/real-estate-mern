import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSignUpBtn = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // const res = await axios.post("/api/auth/signup", formData);
      const data = await res.json();
      console.log("this is data:", data);

      if (data.success === false) {
        setIsLoading(false);
        setError(data.message);
        return;
      }

      setIsLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      console.log("this is error:", error);
      setIsLoading(false);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
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
          disabled={isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 active:opacity-80 disabled:opacity-70 mt-4"
          onClick={handleSignUpBtn}
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>

        <button
          type="text"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 active:opacity-80 disabled:opacity-70"
          onClick={handleGoogleBtn}
        >
          Continue with google
        </button>

        <p className="text-red-600">{error}</p>
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

export default SignUp;
