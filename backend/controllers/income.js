const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
    const { title, amount, type, date, category, description } = req.body;
    const income = new IncomeSchema({
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
        await income.save();
        res.status(200).json({ message: 'Income Added' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedIncome = await IncomeSchema.findByIdAndDelete(id);

        if (!deletedIncome) {
            return res.status(404).json({ message: "Income not found" });
        }

        res.status(200).json({ message: "Income deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
