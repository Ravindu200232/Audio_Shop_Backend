// routes/packageRoutes.js
import express from "express";
import { createPackage, deletePackage, getAllPackages, getPackageById, updatePackage } from "../Controllers/packageController.js";


const packageRoute = express.Router();

// Route to create a new package
packageRoute.post("/create", createPackage);

// Route to get all packages
packageRoute.get("/", getAllPackages);

// Route to get a specific package by ID
packageRoute.get("/:id", getPackageById);

// Route to update a package by ID
packageRoute.put("/:id", updatePackage);

// Route to delete a package by ID
packageRoute.delete("/:id", deletePackage);

export default packageRoute;
