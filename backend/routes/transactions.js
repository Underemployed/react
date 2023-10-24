const express = require('express');
const { addIncome, getIncomes, deleteIncome  } = require('../controllers/income');
const {addExpense,deleteExpense,getExpenses } = require('../controllers/expense');
const router = express.Router();

router.post('/add-income', addIncome)
.get('/get-incomes', getIncomes)
.delete('/delete-income/:id', deleteIncome)
.post('/add-expense',addExpense)
.get('/get-expenses', getExpenses)
.delete('/delete-expense/:id', deleteExpense)
.post('/add-expense',addExpense)

module.exports = router;
