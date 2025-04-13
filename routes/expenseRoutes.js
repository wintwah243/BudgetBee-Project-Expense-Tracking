const express = require("express");

const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel,
    updateExpense
} = require("../controllers/expenseController");

const {protect} = require("../middleware/authMiddleware");
const { model } = require("mongoose");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/downloadexcel", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);
router.put("/update/:id", protect, updateExpense);

module.exports = router;

