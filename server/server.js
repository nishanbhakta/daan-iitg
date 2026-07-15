require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const cabShareRoutes = require("./routes/cabShareRoutes");

const app = express();

connectDB();

// Allow requests from everywhere
app.use(cors());

app.use(express.json());

app.use("/api", cabShareRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
