const express = require("express");
const app = express();

const EXPENSE_API = require("./api/expense-api");
const EXPENSE_MOCK = require("./api/expense-mock");
const PRODUCT = require("./api/product");
const RECIPE = require("./api/recipe");

require("dotenv").config();

app.use(express.json({ extended: false }));

app.use("/api/product", PRODUCT);
app.use("/api/recipe", RECIPE);
app.use("/api/expensebak", EXPENSE_MOCK);
app.use("/api/expense", EXPENSE_API);

app.get("/", (req, res) => {
  let title = process.env.TITLE;
  let description = process.env.DESCRIPTION;
  let environment = process.env;
  res.status(200).json({ title, description, environment });
});

const PORT = process.env.PORT || 8282;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
