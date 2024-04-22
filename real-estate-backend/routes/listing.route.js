import express from "express";
import {
  createListing,
  getAllListings,
  deleteListing,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.get("/listings/:id", verifyToken, getAllListings);
router.delete("/delete/:id", verifyToken, deleteListing);

export default router;
