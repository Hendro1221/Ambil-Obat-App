import express from "express";
import cors from "cors";
import obatRoutes from "./routes/obat.routes.js";

const app = express();
const PORT = 5000;

// ✅ MIDDLEWARE
app.use(cors());

app.use(express.json());
app.use(express.static('public'));

// ✅ ROOT ROUTE (TEST)
app.get("/", (req, res) => {

  res.send("🚀 Backend Apotek Berkah Sehat berjalan!");
});

// ✅ API ROUTES
app.use("/api/obat", obatRoutes);

// ✅ ERROR HANDLER (optional tapi bagus)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Terjadi kesalahan server" });
});

// ✅ START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server jalan di http://localhost:${PORT}`);
});