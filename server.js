import express from "express";
import productRoute from "./routes/products.js";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("home");
});
app.use("/products", productRoute);
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log("server is running... ", server.address().address, PORT);
});