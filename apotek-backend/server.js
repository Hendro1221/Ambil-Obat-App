import express from "express";
import cors from "cors";
import path from "path";

import obatRoutes from "./routes/obat.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ STATIC IMAGE (PENTING BANGET)
app.use("/images", express.static("public/images"));

app.use("/api/obat", obatRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Backend Apotek Berkah Sehat berjalan!");
});

app.listen(5000, () => {
  console.log("🚀 Server jalan di http://localhost:5000");
});