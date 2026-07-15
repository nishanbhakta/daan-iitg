require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const cabShareRoutes = require("./routes/cabShareRoutes");

const app = express();

connectDB();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://daan-iitg.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api", cabShareRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
