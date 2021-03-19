const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const app = express();

//Routes
const userRoutes = require("./routes/user.route");
const pollRoutes = require("./routes/poll.route");

// Middleware
env.config();
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.mfg8v.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Database connected!");
  });

app.use("/api/user", userRoutes);
app.use("/api/poll", pollRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
