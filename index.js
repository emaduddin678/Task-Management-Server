import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect, ifDisconnect } from "./connectionDb.js";
import cookieParser from "cookie-parser";
// here all routes are importing
import TaskRouter from "./routes/TaskRoute.js";
import AuthRouter from "./routes/AuthRouter.js";
import User from "./models/UserModel.js";
// here all routes are importing

const app = express();
dotenv.config();

connect();
ifDisconnect(); 
 
app.use(
  cors({
    origin: [
     "http://localhost:5173",
     "http://localhost:5174",
      "https://task-management-app-9f99e.web.app",
      "https://task-management-app-9f99e.firebaseapp.com",
      "https://task-management-app-9f99e.firebaseapp.com/?_gl=1*ked0vo*_ga*MTk4OTA4NDE1OC4xNjkyNzI5MzIy*_ga_CW55HF8NVT*MTY5OTM3MzE1OC4yMS4xLjE2OTkzNzMyMDcuMTEuMC4w",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.json({ value: "Congrats Server is working" });
});

app.post("/test", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  await newUser.save();

  res.send({
    user: newUser,
  });
});

app.use(TaskRouter);
app.use("/auth", AuthRouter);

app.get("/cookie", (req, res) => {
  res.send(req.cookies.access_token);
});

// app.get("/", (req, res) => {
//   res.send("Welcome to the Task Management API");
// });

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
