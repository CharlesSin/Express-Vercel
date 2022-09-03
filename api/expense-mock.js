const express = require("express");
const router = express.Router();

const mockData2020 = require("../mock/2020AccData");
const mockData2021 = require("../mock/2021AccData");
const mockData2022 = require("../mock/2022AccData");

const expenseArray = ["mockData2020", "mockData2021", "mockData2022"];
const expenseArrayData = [mockData2020, mockData2021, mockData2022];

/**
 * POST Expense Tracker List.
 * 
 * Body { reqYear: request year }
 *
 * @return expense tracker list | empty.
 */
router.post("/", async (req, res) => {
  const { reqYear } = req.body;
  let arrayKey = expenseArray.findIndex((item) => item == `mockData${reqYear}`);

  try {
    res.status(200).json({
      message: "Get data has successfully",
      data: expenseArrayData[arrayKey],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
