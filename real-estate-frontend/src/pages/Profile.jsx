import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../store/user/userSlice.js";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const imgInputRef = useRef();
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
    imageURL: null,
  });
  const [file, setFile] = useState(null);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;

    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(progress);
      },

      (error) => {
        setImageError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, imageURL: downloadURL })
        );
      }
    );
  };

  //firabase storage rules

  //   match /{allPaths=**} {
  //   allow read;
  //   allow write: if request.resource.size < 2 * 1024 * 1024 && request.resource.contentType.matches('image/.*')
  // }

  const handleChange = (event) => {
    // if (event.target.name === "image") {
    //   setFormData((prevValues) => ({
    //     ...prevValues,
    //     [event.target.name]: event.target.files[0],
    //   }));
    // } else {
    setFormData((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
    // }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-7 ">Profile</h1>

      <form className="flex flex-col gap-3 w-full max-w-[600px] mx-auto p-5 ">
        <input
          name="image"
          type="file"
          ref={imgInputRef}
          hidden
          accept="image/*"
          // className="hidden"
          // onChange={handleChange}
          onChange={(event) => setFile(event.target.files[0])}
        ></input>

        <img
          src={file ? formData.imageURL : currentUser.avatar}
          className=" w-24 h-24 rounded-full mx-auto mb-4 object-cover cursor-pointer"
          alt="profile"
          onClick={() => imgInputRef.current.click()}
        ></img>

        <input type="range" min={0} max={100} value={imagePercentage}></input>

        <p>
          {imageError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : imagePercentage > 0 && imagePercentage < 100 ? (
            <span className="text-slate-700">{`Uploading ${imagePercentage}`}</span>
          ) : imagePercentage === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>

        <input
          id="username"
          className="border p-3 rounded-lg outline-none"
          name="username"
          type="text"
          value={formData.username}
          required
          placeholder="Email"
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

      <h3 className="text-center cursor-pointer">Show listings</h3>
    </div>
  );
};

export default Profile;
