// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import { v4 as uuidv4 } from "uuid";
// import LiveSession from "./models/LiveSession.js";

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ MongoDB connection
// mongoose
//   .connect("mongodb://localhost:27017/live_sessions_db", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // ✅ Start session API
// app.post("/api/start-session", async (req, res) => {
//   try {
//     const unique_id = uuidv4();
//     const type = "admin";
//     const userurl = `http://localhost:5000/session/${unique_id}`;

//     const session = new LiveSession({ type, unique_id, userurl });
//     await session.save();

//     res.json({ success: true, type, unique_id, userurl });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// });

// // ✅ Fetch session by unique_id
// app.get("/api/session/:unique_id", async (req, res) => {
//   try {
//     const session = await LiveSession.findOne({ unique_id: req.params.unique_id });
//     if (!session) return res.status(404).json({ success: false, message: "Session not found" });

//     res.json({ success: true, session });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false });
//   }
// });

// app.listen(5000, () => console.log("🚀 Server running on port 5000"));

// // server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const LiveSession = require('./models/LiveSession');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ✅ Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/live_sessions_db')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// ✅ Step 2: Admin starts a session
app.post('/start-session', async (req, res) => {
  try {
    const unique_id = uuidv4();
    const userurl = `http://localhost:3000/session/${unique_id}`;
    const type = 'admin';

    const session = new LiveSession({ type, unique_id, userurl });
    await session.save();

    res.json(`<h1>success: true, unique_id, userurl</h1>`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating session' });
  }
});

// ✅ Step 3: Student opens the session link
app.get('/session/:unique_id', async (req, res) => {
  try {
    const { unique_id } = req.params;
    const session = await LiveSession.findOne({ unique_id });

    if (!session) {
      return res.status(404).send('Session not found');
    }

    res.sendFile(path.join(__dirname, 'public', 'session.html'));
    res.json({ success: true, unique_id, userurl });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import { v4 as uuidv4 } from "uuid";
// import LiveSession from "./models/LiveSession.js";

// const app = express();
// app.use(cors());
// app.use(express.json());

// // 🧩 Connect MongoDB
// mongoose
//   .connect("mongodb://localhost:27017/live_sessions_db", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB error:", err));

// // 🧠 Create new session
// app.post("/api/start-session", async (req, res) => {
//   try {
//     const unique_id = uuidv4();
//     const type = "admin";
//     const userurl = `http://localhost:5000/session/${unique_id}`;

//     const newSession = new LiveSession({ type, unique_id, userurl });
//     await newSession.save();

//     res.json({
//       success: true,
//       type,
//       unique_id,
//       userurl,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// });

// // 🧠 Fetch session by ID (for student access)
// app.get("/api/session/:unique_id", async (req, res) => {
//   try {
//     const session = await LiveSession.findOne({ unique_id: req.params.unique_id });
//     if (!session) return res.status(404).json({ success: false, message: "Session not found" });

//     res.json({ success: true, session });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// });

// app.listen(5000, () => console.log("🚀 Server running on port 5000"));
