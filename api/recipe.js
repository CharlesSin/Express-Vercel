const express = require("express");
const router = express.Router();

const recipe = require("../data/recipe");

/**
 * GET Recipe List.
 *
 * @return recipe list | empty.
 */
router.get("/", async (req, res) => {
  try {
    res.status(200).json({
      message: "Get data has successfully",
      data: recipe,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
