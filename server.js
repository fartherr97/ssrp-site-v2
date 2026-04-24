import express from "express";
import dotenv from "dotenv";

console.log("SERVER FILE LOADED - CIV ROSTER ROUTE ACTIVE");

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

app.get("/api/civ-roster", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Mike",
      discord: "123456789",
      tier: "Manager",
      discipline: "None",
      hired: "2026-04-24",
      lastMove: "2026-04-24",
      notes: "Loaded from Express",
    },
  ]);
});

app.listen(PORT, () => {
  console.log(`Civilian Hub running on port ${PORT}`);
});