import React from "react";

const Search = () => {
  return (
    <main className="">
      <div className="flex flex-col md:flex-row ">
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
          <form onSubmit={""} className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
              <label className="font-semibold whitespace-nowrap">
                Search Term:
              </label>
              <input
                type="text"
                name="searchTerm"
                id="searchTerm"
                placeholder="Search..."
                className=" border rounded-lg p-3 w-full"
              ></input>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <label className="font-semibold whitespace-nowrap">Type:</label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="all"
                  name="all"
                  className="w-5 h-5"
                ></input>
                <span>Rent & Sale</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  name="rent"
                  className="w-5 h-5"
                ></input>
                <span>Rent</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  name="sale"
                  className="w-5 h-5"
                ></input>
                <span>Sale</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  name="offer"
                  className="w-5 h-5"
                ></input>
                <span>offer</span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <label className="font-semibold whitespace-nowrap">
                Aminities:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  name="parking"
                  className="w-5 h-5"
                ></input>
                <span>Parking</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  name="furnished"
                  className="w-5 h-5"
                ></input>
                <span>Furnished</span>
              </div>
            </div>

            <div className="flex items-center gap-2 ">
              <label className="font-semibold whitespace-nowrap">Sort:</label>
              <select
                id="sort_order"
                name="sort_order"
                className=" border rounded-lg p-3 w-full"
              >
                <option value="">Price high to low</option>
                <option value="">Price low to high</option>
                <option value="">Latest</option>
                <option value="">Oldest</option>
              </select>
            </div>

            <button
              type="submit "
              className="w-full p-3 bg-slate-700 text-white rounded-lg"
            >
              Search
            </button>
          </form>
        </div>

        <div className="w-full">
          <h1 className="text-3xl font-semibold border-b p-5 text-slate-700 ">
            Listing Results :
          </h1>
        </div>
      </div>
    </main>
  );
};

export default Search;
