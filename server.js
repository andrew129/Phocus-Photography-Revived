const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors');
const topics = require('./routes/topicRoutes');
const comments = require('./routes/commentRoutes');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
//connecting to mongoose
mongoose.promise = Promise
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/people", { useNewUrlParser: true, useUnifiedTopology: true });

// Send every request to the React app
// Define any API routes before this runs
app.use('/api/topics', topics);
app.use('/api/comments', comments)
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
