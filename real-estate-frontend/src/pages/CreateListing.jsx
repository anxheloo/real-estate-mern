import React, { useState } from "react";

const CreateListing = () => {
  const [offerChecked, setOfferChecked] = useState(false);

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>

      <form className="flex flex-col sm:flex-row gap-4">
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
          ></input>

          <textarea
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            rows={2}
            className="border p-3 outline-blue-400 rounded"
          ></textarea>

          <input
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            className="border p-3 outline-blue-400 rounded"
          ></input>

          <div className="flex flex-row gap-4 flex-wrap mt-3">
            <div className="w-fit flex gap-2">
              <input
                type="checkbox"
                id="sale"
                name="sale"
                className="w-5"
              ></input>
              <label htmlFor="sale">Sell</label>
            </div>

            <div className="w-fit flex gap-2">
              <input
                type="checkbox"
                id="rent"
                name="rent"
                className="w-5"
              ></input>
              <label htmlFor="rent">Rent</label>
            </div>

            <div className="w-fit flex gap-2">
              <input
                type="checkbox"
                id="parking"
                name="parking"
                className="w-5"
              ></input>
              <label htmlFor="parking">Parking spot</label>
            </div>

            <div className="w-fit flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                name="furnished"
                className="w-5"
              ></input>
              <label htmlFor="furnished">Furnished</label>
            </div>

            <div className="w-fit flex gap-2">
              <input
                type="checkbox"
                id="offer"
                name="offer"
                className="w-5"
                onChange={(e) => setOfferChecked(e.target.checked)}
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
              ></input>
              <label htmlFor="bathrooms">Baths</label>
            </div>
          </div>

          <div className="w-fit flex gap-2 items-center mt-3">
            <input
              type="number"
              id="regularPrice"
              min="1"
              max="10"
              required
              name="regularPrice"
              className="p-3 border border-gray-300 rounded-lg min-w-28"
            ></input>
            <label htmlFor="regularPrice" className="">
              <h3>Regular price</h3>
              <h3 className=" text-center text-[12px]">($ / Month)</h3>
            </label>
          </div>

          {offerChecked && (
            <div className="w-fit flex gap-2 items-center mt-3">
              <input
                type="number"
                id="discountedPrice"
                min="1"
                max="10"
                required
                name="discountedPrice"
                className="p-3 border border-gray-300 rounded-lg min-w-28"
              ></input>
              <label htmlFor="discountedPrice" className="">
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
            ></input>
            <button
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg active:opacity-85 disabled:opacity-80"
              type="button"
            >
              Upload
            </button>
          </div>

          <button
            className="uppercase w-full rounded-lg p-3 bg-slate-700 text-white hover:opacity-90 disabled:opacity-80 mt-4"
            type="submit"
          >
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
