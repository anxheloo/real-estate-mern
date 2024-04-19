import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  console.log("Inside create Listing");

  console.log("This is req.body: ", req.body);

  try {
    const listing = await Listing.create(req.body);

    console.log("This is listing:", listing);

    return res.status(201).json(listing);
  } catch (error) {
    // res.status(400).json({ error: error.message });
    next(error);
    console.log(error);
    // next(errorHandler(550, "error from the function"));
  }
};
