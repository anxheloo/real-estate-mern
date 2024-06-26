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

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }
  if (req.user.id !== listing.userRef)
    return next(errorHandler(401, "You can only update your own listings!"));

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json(updatedListing);
  } catch (error) {
    // res.status(400).json({ error: error.message });
    next(error);
    console.log(error);
    // next(errorHandler(550, "error from the function"));
  }
};

export const getListingById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const listing = await Listing.findById(id);

    if (!listing) {
      return next(errorHandler(404, " Listing not found"));
    }

    return res.status(200).json(listing);
  } catch (error) {
    // res.status(400).json({ error: error.message });
    next(error);
    console.log(error);
    // next(errorHandler(550, "error from the function"));
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const listings = await Listing.find({
      // dont care about uppercase and lowercase => $options: "i"
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
