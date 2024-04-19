import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState, useRef } from "react";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const filesRef = useRef();

  console.log("This is formData :", formData);

  const handleImageSubmit = () => {
    setIsUploading(true);
    setImagePercentage(0);

    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((url) => {
          console.log("This is urls:", url);
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(url),
          });

          setIsUploading(false);
          setImageUploadError(false);
        })
        .catch((error) => {
          setIsUploading(false);
          setImageUploadError("Image upload failed (2 mb max per image)");
          console.log("This is error: ", error);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing!");
      setIsUploading(false);
      alert("Maximum images must be 6");
      setFiles([]);
      filesRef.current.value = "";
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${Math.round(progress)}% done`);
          setImagePercentage(Math.round(progress));
        },

        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const removeSelectedImage = (deletedIndex) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter(
        (item, index) => item[index] !== item[deletedIndex]
      ),
    });
  };

  const handleChange = (event) => {
    if (event.target.name === "sale" || event.target.name === "rent") {
      setFormData((prevValues) => ({
        ...prevValues,
        type: event.target.name,
      }));
    }

    if (
      event.target.name === "parking" ||
      event.target.name === "furnished" ||
      event.target.name === "offer"
    ) {
      setFormData((prevValues) => ({
        ...prevValues,
        [event.target.name]: event.target.checked,
      }));
    }

    if (event.target.type === "number") {
      setFormData((prevValues) => ({
        ...prevValues,
        [event.target.name]: Number(event.target.value),
      }));
    }

    if (event.target.type === "text" || event.target.type === "textarea") {
      setFormData((prevValues) => ({
        ...prevValues,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least 1 image!");

      if (formData.regularPrice < formData.discountPrice)
        return setError("Discount price must be lower than regular price!");

      setLoading(true);
      setError(false);

      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });

      const data = await res.json();
      console.log("This is data: ", data);
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      }

      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            maxLength="62"
            minLength="10"
            required
            className="border p-3 outline-blue-400 rounded"
            onChange={handleChange}
            value={formData.name}
          ></input>

          <textarea
            // type="text"
            id="description"
            name="description"
            placeholder="Description"
            rows={2}
            className="border p-3 outline-blue-400 rounded"
            onChange={handleChange}
            value={formData.description}
          ></textarea>

          <input
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            className="border p-3 outline-blue-400 rounded"
            onChange={handleChange}
            value={formData.address}
          ></input>

          <div className="flex flex-row gap-4 flex-wrap mt-3">
            <div className="w-fit flex gap-2">
              <input
                type="checkbox"
                id="sale"
                name="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              ></input>
              <label htmlFor="sale">Sell</label>
            </div>

            <div className="w-fit flex gap-2">
              <input
                type="checkbox"
                id="rent"
                name="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              ></input>
              <label htmlFor="rent">Rent</label>
            </div>

            <div className="w-fit flex gap-2">
              <input
                type="checkbox"
                id="parking"
                name="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              ></input>
              <label htmlFor="parking">Parking spot</label>
            </div>

            <div className="w-fit flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                name="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              ></input>
              <label htmlFor="furnished">Furnished</label>
            </div>

            <div className="w-fit flex gap-2">
              <input
                type="checkbox"
                id="offer"
                name="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              ></input>
              <label htmlFor="offer">Offer</label>
            </div>
          </div>

          <div className="flex gap-6 mt-3">
            <div className="w-fit flex gap-2 items-center">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                name="bedrooms"
                className="p-3 border border-gray-300 rounded-lg "
                onChange={handleChange}
                value={formData.bedrooms}
              ></input>
              <label htmlFor="bedrooms">Beds</label>
            </div>

            <div className="w-fit flex gap-2 items-center">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                name="bathrooms"
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bathrooms}
              ></input>
              <label htmlFor="bathrooms">Baths</label>
            </div>
          </div>

          <div className="w-fit flex gap-2 items-center mt-3">
            <input
              type="number"
              id="regularPrice"
              min="50"
              max="1000000"
              required
              name="regularPrice"
              className="p-3 border border-gray-300 rounded-lg min-w-28"
              onChange={handleChange}
              value={formData.regularPrice}
            ></input>
            <label htmlFor="regularPrice" className="">
              <h3>Regular price</h3>
              {formData.type !== "sale" && (
                <h3 className=" text-center text-[12px]">($ / Month)</h3>
              )}
            </label>
          </div>

          {formData.offer && (
            <div className="w-fit flex gap-2 items-center mt-3">
              <input
                type="number"
                id="discountPrice"
                min="0"
                max="1000000"
                required
                name="discountPrice"
                className="p-3 border border-gray-300 rounded-lg min-w-28"
                onChange={handleChange}
                value={formData.discountPrice}
              ></input>
              <label htmlFor="discountPrice" className="">
                <h3>Discounted price</h3>
                <h3 className=" text-center text-[12px]">($ / Month)</h3>
              </label>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 flex-1 py-10 sm:py-0">
          <p className=" font-normal text-gray-700">
            <span className="font-bold text-black">Images: </span> The first
            image will be the cover (max 6)
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              accept="image/*"
              id="images"
              multiple
              className="p-3 border border-gray-300 rounded w-full"
              onChange={(event) => setFiles(event.target.files)}
              ref={filesRef}
            ></input>

            <button
              disabled={isUploading}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg active:opacity-85 disabled:opacity-60"
              type="button"
              onClick={handleImageSubmit}
            >
              {!isUploading ? "Upload" : "Uploading..."}
            </button>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={imagePercentage}
            onChange={() => setImagePercentage(imagePercentage)}
          ></input>
          <p className="text-red-700">{imageUploadError && imageUploadError}</p>

          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((item, index) => (
              <div
                key={index}
                className="p-3 flex justify-between items-center border border-gray-300"
              >
                <img
                  src={item}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                ></img>
                <button
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                  type="button"
                  onClick={() => removeSelectedImage(index)}
                >
                  Delete
                </button>
              </div>
            ))}

          <button
            disabled={loading}
            className="uppercase w-full rounded-lg p-3 bg-slate-700 text-white hover:opacity-90 disabled:opacity-80 mt-4"
            type="submit"
          >
            {loading ? "Creating..." : "Create Listing"}
          </button>

          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
