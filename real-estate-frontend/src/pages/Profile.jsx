import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
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
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const imgInputRef = useRef();
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [userListings, setUserListings] = useState(null);
  const [showListingsError, setShowListingsError] = useState();
  const [deleteListError, setDeleteListError] = useState();

  console.log(formData);
  console.log("This is userListings userListings:", userListings);

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
          setFormData((prevValues) => ({ ...prevValues, avatar: downloadURL }))
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
    setFormData((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const updateUser = async (event) => {
    event.preventDefault();

    dispatch(updateUserStart());

    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      console.log("This is error.message: ", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      console.log("This is error.message: ", error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      const res = await fetch(`/api/user/signout`);
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }

      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const showListings = async () => {
    setShowListingsError(false);

    try {
      const res = await fetch(`/api/listing/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);

      console.log("This is userListings from data:", data);
    } catch (error) {
      setShowListingsError(true);
      console.log("THis is error:", error);
    }
  };

  const deleteList = async (id) => {
    setDeleteListError("");

    try {
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success === false) {
        setDeleteListError(data.message);
        return;
      }

      showListings();
    } catch (error) {
      setDeleteListError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="mb-10">
      <h1 className="text-3xl font-semibold text-center my-7 ">Profile</h1>

      <form
        onSubmit={updateUser}
        className="flex flex-col gap-3 w-full max-w-[600px] mx-auto p-5 "
      >
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
          src={file ? formData?.avatar : currentUser?.avatar}
          className=" w-24 h-24 rounded-full mx-auto mb-4 object-cover cursor-pointer"
          alt="profile"
          onClick={() => imgInputRef.current.click()}
        ></img>
        <input
          type="range"
          min={0}
          max={100}
          value={imagePercentage}
          onChange={() => setImagePercentage(imagePercentage)}
        ></input>
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
          defaultValue={currentUser.username}
          placeholder="Email"
          onChange={handleChange}
        ></input>
        <input
          id="email"
          className="border p-3 rounded-lg outline-none"
          name="email"
          type="email"
          defaultValue={currentUser.email}
          placeholder="Email"
          onChange={handleChange}
        ></input>
        <input
          id="password"
          className="border p-3 rounded-lg outline-none"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        ></input>
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 active:opacity-80 disabled:opacity-70 mt-4"
        >
          {loading ? "Loading..." : "UPDATE"}
        </button>
        <Link
          to={"/create-listing"}
          className="bg-[#116831] text-white p-3 text-center rounded-lg uppercase hover:opacity-90 active:opacity-80 disabled:opacity-70"
        >
          CREATE LISTING
        </Link>
      </form>

      <div className="flex justify-between items-center w-full max-w-[600px] mx-auto p-5">
        <h3 className="text-red-700 cursor-pointer" onClick={handleDelete}>
          Delete Account
        </h3>
        <h3 className="text-red-700 cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </h3>
      </div>

      <p className=" text-green-700 w-full max-w-[600px] px-5 mx-auto">
        {updateSuccess ? "User is updated successfully!" : ""}
      </p>
      <p className=" text-red-700 mt-5">{error ? error : ""}</p>

      <h3 className="text-center cursor-pointer mb-7" onClick={showListings}>
        Show listings
      </h3>

      {userListings?.length > 0 && (
        <h1 className="mx-aut text-center font-semibold text-xl p-5">
          Your listings
        </h1>
      )}

      {userListings?.length > 0
        ? userListings.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-full max-w-[600px] mx-auto p-5 border rounded"
            >
              <Link
                className="flex flex-1 gap-2 items-center truncate "
                to={`listing/${item._id}`}
              >
                <img
                  src={item.imageUrls[0]}
                  alt="listing cover"
                  className=" object-contain h-16 w-16 rounded-lg"
                ></img>
                <h2>{item.name}</h2>
              </Link>

              <div className="flex flex-col">
                <button
                  type="text"
                  className="text-red-700 active:opacity-80"
                  onClick={() => deleteList(item._id)}
                >
                  DELETE
                </button>
                <button
                  type="text"
                  className="text-green-600 active:opacity-80"
                >
                  EDIT
                </button>
              </div>
            </div>
          ))
        : userListings?.length === 0 && <p>There are no listings created!</p>}

      {deleteListError !== 0 && <p>{deleteListError}</p>}
    </div>
  );
};

export default Profile;
