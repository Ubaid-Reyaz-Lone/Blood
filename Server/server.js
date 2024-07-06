const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

// dot config
dotenv.config();

// MongoDb Connection

connectDB();
console.log("hay");

// rest objects
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// app.get("/",(req,res)=>{
//     res.status(200).json({
//         message:"welcome to blood bank app"
//     })

// })

// ROutes

app.use("/api/v1/test", require("./routes/testRoutes"));

app.use("/api/v1/auth", require("./routes/authROutes"));

app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));

app.use("/api/v1/analytics", require("./routes/AnalyticsRoute"));

const PORT = process.env.PORT || 8000;
// const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.sendStatus(200);
});
app.listen(PORT, () => {
  console.log(
    `Node Server running in ${process.env.DEV_MODE}  Modern Port  ${process.env.PORT}`
      .bgBlue.white
  );
});
