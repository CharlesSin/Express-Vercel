const express = require("express");
const cors = require("cors");
const app = express();

const EXPENSE_API = require("./api/expense-api");
const EXPENSE_MOCK = require("./api/expense-mock");
const PRODUCT = require("./api/product");
const RECIPE = require("./api/recipe");

require("dotenv").config();

const allowlist = [
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  process.env.EY_EXPENSE_TRACKER_URL,
];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

app.use(express.json({ extended: false }));

app.use("/api/product", PRODUCT);
app.use("/api/recipe", RECIPE);
app.use("/api/expensebak", EXPENSE_MOCK);
app.use("/api/expense", EXPENSE_API);

app.get("/", (req, res) => {
  let title = process.env.TITLE;
  let description = process.env.DESCRIPTION;
  res.status(200).json({ title, description });
});

const PORT = process.env.PORT || 8282;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
