import express from "express";
import { addSchool, getSchools } from "../controllers/schoolController.js";

const router = express.Router();

// Add and get routes
router.post("/add", addSchool);
router.get("/list", getSchools);

export default router;
