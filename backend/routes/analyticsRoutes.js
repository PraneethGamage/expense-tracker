import express from 'express'
import * as analyticsController from '../controllers/analyticsController.js'

const router = express.Router()

router.get('/summary', analyticsController.getSummary)
router.get('/category-breakdown', analyticsController.getCategoryBreakdown)
router.get('/monthly-trends/:year', analyticsController.getMonthlyTrends)
router.get('/top-vendors', analyticsController.getTopVendors)
router.get('/payment-method-breakdown', analyticsController.getPaymentMethodBreakdown)

export default router
