import Package from "../models/Package.js";
import { isItAdmin } from "./userController.js";

// Create a new package
export async function createPackage(req, res) {
  try {
    
    if(isItAdmin(req)){
       
    const newPackage = new Package(req.body);
    await newPackage.save();
    res.status(201).json(newPackage);
    }else{
        return res.status(403).json({ message: "Unauthorized action" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to create package", error });
  }
}

// Get all packages
export async function getAllPackages(_req, res) {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch packages", error });
  }
}

// Get a single package by ID
export async function getPackageById(req, res) {
  try {
    const packageId = req.params.id;
    const pkg = await Package.findById(packageId);
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json(pkg);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch package", error });
  }
}

// Update a package
export async function updatePackage(req, res) {
  try {
   
    if(isItAdmin(req)){
        const packageId = req.params.id;
    const updatedPackage = await Package.findByIdAndUpdate(packageId, req.body, { new: true });
    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json(updatedPackage);
    }else{
        return res.status(403).json({ message: "Unauthorized action" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update package", error });
  }
}

// Delete a package
export async function deletePackage(req, res) {
  try {
    
    if(isItAdmin(req)){
        const packageId = req.params.id;
    const deletedPackage = await Package.findByIdAndDelete(packageId);
    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json({ message: "Package deleted successfully" });
    }else{
        return res.status(403).json({ message: "Unauthorized action" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete package", error });
  }
}
