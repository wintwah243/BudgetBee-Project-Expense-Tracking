const xlsx = require("xlsx");
const Expense = require("../models/Expense");

exports.addExpense = async(req,res) => {
    const userId = req.user.id;

    try{
        const {icon, category, description, amount, date} = req.body;

        if(!category || !amount || !date){
            return res.status(400).json({message:"All fields are required!"});
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            description,
            amount,
            date: new Date(date)
        });
        await newExpense.save();
        res.status(200).json(newExpense);
    }catch(error){
        res.status(500).json({message: "Server error"});
    }
}

exports.getAllExpense = async(req,res) => {
    const userId = req.user.id;

    try{
        const expense = await Expense.find({userId}).sort({date:-1});
        res.json(expense);
    }catch(err){
        res.status(500).json({message: "Sever error"});
    }
}

exports.deleteExpense = async(req,res) => {

    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message:"Expense successfully deleted!"});
    }catch(err){
        res.status(500).json({message:"Server error"});
    }
}

exports.downloadExpenseExcel = async(req,res) => {
    const userId = req.user.id;
    try{
        const expense = await Expense.find({userId}).sort({date: -1});

        const data = expense.map((item) => ({
            Category: item.category,
            description: item.description,
            Amount: item.amount,
            Date: item.date
        }));
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');
    }catch(err){
        res.status(500).json({message:"Server error"});
    }
}

exports.updateExpense = async (req, res) => {
    const userId = req.user.id;
    const expenseId = req.params.id;

    try {
        const { icon, category, description, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const expense = await Expense.findOne({ _id: expenseId, userId });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found or not authorized" });
        }

        // Update fields
        expense.icon = icon;
        expense.category = category;
        expense.description = description;
        expense.amount = amount;
        expense.date = new Date(date);

        await expense.save();

        res.status(200).json({ message: "Expense updated successfully!", expense });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
