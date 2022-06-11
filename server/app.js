import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
import router from "./routes/user-routes";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://admin:qwertyuiop@cluster0.sz4zp.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() => console.log(`Connected to Database and Listening to ${PORT}`))
  .catch((err) => console.log(err));

app.use("/api/user", router);
app.use("/api/blog", blogRouter);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
}
