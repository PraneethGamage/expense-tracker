import express from 'express'
import * as transactionController from '../controllers/transactionController.js'

const router = express.Router()

router.get('/', transactionController.getAllTransactions)
router.get('/:id', transactionController.getTransactionById)
router.get('/range', transactionController.getTransactionsByDateRange)
router.post('/', transactionController.createTransaction)
router.put('/:id', transactionController.updateTransaction)
router.delete('/:id', transactionController.deleteTransaction)

export default router
