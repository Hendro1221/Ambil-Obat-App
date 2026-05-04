import express from "express";
import { getObat, getObatById } from "../controllers/obat.controller.js";

const router = express.Router();

router.get("/", getObat);
router.get("/:id", getObatById);

export default router;