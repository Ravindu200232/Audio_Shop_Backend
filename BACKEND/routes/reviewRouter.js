import express from "express";
import { addReview, approveReview, deleteReview, getReview } from "../Controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/",addReview);

reviewRouter.get("/",getReview);

reviewRouter.delete("/delete/:email",deleteReview);

reviewRouter.put("/approve/:email",approveReview);

export default reviewRouter;