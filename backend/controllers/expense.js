const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
    const { title, amount, type, date, category, description } = req.body;
    const expense = new ExpenseSchema({ 
        title,
        amount,
        type,
        date,
        category,
        description
    });

    try {
        if (!title || !category || !date || !description) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0 || isNaN(amount)) {
            return res.status(400).json({ message: 'Amount must be a positive number' });
        }
        await expense.save(); 
        res.status(200).json({ message: 'Expense Added' }); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 }); 
        res.status(200).json(expenses); 
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedExpense = await ExpenseSchema.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({ message: "Expense deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
