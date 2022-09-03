const express = require("express");
const app = express();
const expense = require("./api/expenseTracker");
const product = require("./api/product");
const recipe = require("./api/recipe");

require('dotenv').config();

app.use(express.json({ extended: false }));

app.use("/api/product", product);
app.use("/api/recipe", recipe);
app.use("/api/expensebak", expense);

app.get("/hrllo",(req,res)=>{
    let hello = process.env.HELLO
    // 使用環境變數
    let secret = process.env.SECRET;
    let id = process.env.ID;
    res.status(200).json({hello,secret,id});
})

const PORT = process.env.PORT || 8282;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
