import express from "express";
import productRoute from "./src/routes/products_route.js";
import Mongoose from "mongoose";
const PORT = process.env.PORT || 3001;
const app = express();
//TODO change db url
const uri =
  "mongodb+srv://rohithkye:UfAO1zCfpJWmJ7a0@cluster0.lqhsr.mongodb.net/shop?retryWrites=true&w=majority";
Mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
})
  .then((result) =>
    app.listen(PORT, () => {
      console.log("server is running... ");
    })
  )
  .catch((err) => console.error(err));
const db = Mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to mogo"));
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("home");
});
app.use("/products", productRoute);
