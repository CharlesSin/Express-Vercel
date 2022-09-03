const express = require("express");
const router = express.Router();

const CRUDMODULE = require("../utils/firebaseCRUD");

const {
  createNewData: created,
  updateAccountData: updated,
  removeAccountData: deleted,
  readAccountData: selected,
} = CRUDMODULE;

/* GET: Get Expense Tracker Data. */
router.post("/", (req, res, next) => {
  // req.body must have collection name, start date and end date.
  const { collection, start, end } = req.body;

  selected(collection, start, end)
    .then((expenseData) => {
      // console.log({expenseData});
      res.status(200).json({ expenseData });
    })
    .catch((err) => {
      console.log({ err });
      res.status(400).json({ msg: "bad request", err });
    });
});

/* POST: Create Expense Tracker Data. */
router.post("/create", (req, res, next) => {
  // req.body must have collection name and data.
  // data must be Object.
  // Object item : date, item, pay and price.
  const { collection, data } = req.body;
  created(collection, data)
    .then((msg) => {
      res.status(200).json({ msg });
    })
    .catch((error) => {
      res.status(403).json({ error });
    });
});

/* POST: Update Expense Tracker Data. */
router.post("/update", (req, res, next) => {
  // req.body must have collection name, id and data.
  // data must be Object.
  // Object item : date, item, pay, price and timestamp.
  const { collection, id, data } = req.body;
  updated(collection, id, data)
    .then((msg) => {
      res.status(200).json({ msg });
    })
    .catch((err) => {
      res.status(403).json({ err });
    });
});

/* DELETE: Remove Expense Tracker Data. */
router.post("/delete", (req, res, next) => {
  // req.body must have collection name and id.
  const { collection, id } = req.body;
  deleted(collection, id)
    .then((msg) => {
      res.status(200).json({ msg });
    })
    .catch((err) => {
      res.status(403).json({ err });
    });
});

module.exports = router;
