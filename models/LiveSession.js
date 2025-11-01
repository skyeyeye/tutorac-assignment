// models/LiveSession.js
// const mongoose = require('mongoose');

// const liveSessionSchema = new mongoose.Schema({
//   type: { type: String, required: true },        // "admin" or "student"
//   unique_id: { type: String, required: true },   // unique session id
//   userurl: { type: String, required: true }      // unique session link
// });

// module.exports = mongoose.model('LiveSession', liveSessionSchema);
// import mongoose from "mongoose";

// const liveSessionSchema = new mongoose.Schema({
//   type: { type: String, required: true },
//   unique_id: { type: String, required: true, unique: true },
//   userurl: { type: String, required: true },
// });

// const LiveSession = mongoose.model("LiveSession", liveSessionSchema);

// export default LiveSession;
const mongoose = require("mongoose");

const LiveSessionSchema = new mongoose.Schema({
  type: { type: String, required: true },
 unique_id: { type: String, required: true, unique: true },
 userurl: { type: String, required: true },
});

const LiveSession = mongoose.model("LiveSession", LiveSessionSchema);

module.exports = LiveSession;

