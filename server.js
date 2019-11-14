const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const cors = require('cors');
const topics = require('./routes/topicRoutes');
const comments = require('./routes/commentRoutes');
const images = require('./routes/imageRoutes');
// const authRoutes = require('./routes/auth')
// const apiRoutes = require('./routes/api');
// const passport = require("passport");
// const config = require('./config');
// const LocalStrategy = require('passport-local').Strategy;


app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
// app.use(passport.initialize());

// load passport strategies
// const localSignupStrategy = require('./passport/local-signup');
// const localLoginStrategy = require('./passport/local-login');
// passport.use('local-signup', localSignupStrategy);
// passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
// const authCheckMiddleware = require('./middleware/auth-check');
// app.use('/api', authCheckMiddleware);

// Routes// routes
// const authRoutes = require('./routes/auth');
// const apiRoutes = require('./routes/api');
// app.use('/auth', authRoutes);
// app.use('/api', apiRoutes);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} 

//connecting to mongoose
mongoose.promise = Promise
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/people", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
  process.exit(1);
});

// load models
// require('./models/User');

// Send every request to the React app
// Define any API routes before this runs
app.use('/api/topics', topics);
app.use('/api/comments', comments)
app.use('/api/uploads', images);
// app.use('/api/users', authRoutes)
// const registrationRoutes = require("./routes")(passport);
// app.use(registrationRoutes);

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
