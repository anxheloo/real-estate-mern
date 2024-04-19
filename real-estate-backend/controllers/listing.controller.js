import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    // res.status(400).json({ error: error.message });
    next(error);
    // next(errorHandler(550, "error from the function"));
  }
};
