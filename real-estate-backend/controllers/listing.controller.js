import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  console.log("Inside create Listing");

  console.log("This is req.body: ", req.body);

  try {
    const newListing = new Listing(req.body);
    await newListing.save();

    // const listing = await Listing.create(req.body);

    console.log("This is listing:", newListing);

    return res.status(201).json(newListing);
  } catch (error) {
    // res.status(400).json({ error: error.message });
    next(error);
    console.log(error);
    // next(errorHandler(550, "error from the function"));
  }
};

export const getAllListings = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, "You can only show your own listings!"));

    const listings = await Listing.find({ userRef: req.params.id });
    return res.status(200).json(listings);
  } catch (error) {
    // res.status(400).json({ error: error.message });
    next(error);
    console.log(error);
    // next(errorHandler(550, "error from the function"));
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }

    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, "You can only delete your own listings!"));
    }

    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("List successfully deleted!");
  } catch (error) {
    next(error);
  }
};
