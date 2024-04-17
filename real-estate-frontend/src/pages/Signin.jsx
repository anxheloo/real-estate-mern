import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../store/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.user);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFormData((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSignInBtn = async (event) => {
    event.preventDefault();
    // setIsLoading(true);
    dispatch(signInStart());

    try {
      const res = await fetch("/api/auth/signin", {
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
        // setIsLoading(false);
        // setError(data.message);
        dispatch(signInFailure(data.message));
        return;
      }

      // setIsLoading(false);
      // setError(null);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("this is error:", error);
      // setIsLoading(false);
      // setError(error.message);
      dispatch(signInFailure(error.message));
    }
    // finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div
      // bg-[#f3f5f2]
      // style={{ minHeight: "calc(100vh - 72px)" }}
      //instead of using the styles above for bg color of the sign up page, we set the bg in the body inside index.css
      className="w-full h-full min-h-[70vh] flex flex-col justify-center "
    >
      <h1 className="text-3xl text-center font-semibold py-7">Sign In</h1>
      <form
        onSubmit={handleSignInBtn}
        className="flex flex-col gap-3 w-full max-w-[600px] mx-auto p-5 "
      >
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
          required
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        ></input>

        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 active:opacity-80 disabled:opacity-70 mt-4"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        {/* <button
          type="text"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 active:opacity-80 disabled:opacity-70"
          onClick={handleGoogleBtn}
        >
          Continue with google
        </button> */}

        <OAuth></OAuth>

        <p className="text-red-600">{error}</p>
      </form>

      <h3 className=" w-full max-w-[600px] mx-auto px-5">
        Dont have an account?{" "}
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </h3>
    </div>
  );
};

export default Signin;
