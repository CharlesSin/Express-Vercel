const express = require("express");
const app = express();
const expense = require("./api/expenseTracker");
const product = require("./api/product");
const recipe = require("./api/recipe");

app.use(express.json({ extended: false }));

app.use("/api/product", product);
app.use("/api/recipe", recipe);
app.use("/api/expensebak", expense);

const PORT = process.env.PORT || 8282;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
