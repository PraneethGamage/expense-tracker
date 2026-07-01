import express from 'express'
import * as paymentMethodController from '../controllers/paymentMethodController.js'

const router = express.Router()

router.get('/', paymentMethodController.getAllPaymentMethods)
router.get('/:id', paymentMethodController.getPaymentMethodById)
router.post('/', paymentMethodController.createPaymentMethod)
router.put('/:id', paymentMethodController.updatePaymentMethod)
router.delete('/:id', paymentMethodController.deletePaymentMethod)

export default router
