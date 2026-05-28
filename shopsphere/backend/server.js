require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");

const loggerMiddleware = require("./middleware/loggerMiddleware");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());

app.use(loggerMiddleware);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("ShopSphere API Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});