const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const posts = require("./routes/api/posts");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const passport = require("passport");

const port = process.env.PORT || 5000;
const app = express();

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config File
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

app.get("/", (req, res) => res.send("hello world"));
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
