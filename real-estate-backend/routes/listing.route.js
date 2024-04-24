import express from "express";
import {
  createListing,
  getAllListings,
  deleteListing,
  updateListing,
  getListingById,
  getListings,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/get", getListings);
router.post("/create", verifyToken, createListing);
router.get("/:id", verifyToken, getAllListings);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListingById);

export default router;
