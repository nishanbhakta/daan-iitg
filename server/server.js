require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const cabShareRoutes = require("./routes/cabShareRoutes");

const app = express();

connectDB();

<<<<<<< Updated upstream
app.use(
  cors({
    origin: "*",
  })
);
=======
// Allow requests from everywhere
app.use(cors());

>>>>>>> Stashed changes
app.use(express.json());

app.use("/api", cabShareRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
