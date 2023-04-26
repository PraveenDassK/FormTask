const express = require("express");
const mongoose = require("mongoose");
const CORS = require("cors");
const PORT = 3001;
const formRoute = require("./routes/formRoute");
const app = express();
app.use(CORS({ origin: "*" }));
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/formtask")
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((e) => {
    console.log(e.message);
  });

app.use("/form", formRoute);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
