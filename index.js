const express = require("express");
const app = express();
const expense = require("./api/expenseTracker");
const product = require("./api/product");
const recipe = require("./api/recipe");

require("dotenv").config();

app.use(express.json({ extended: false }));

app.use("/api/product", product);
app.use("/api/recipe", recipe);
app.use("/api/expensebak", expense);

app.get("/", (req, res) => {
  let title = process.env.TITLE;
  let description = process.env.DESCRIPTION;
  res.status(200).json({ title, description });
});

const PORT = process.env.PORT || 8282;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
