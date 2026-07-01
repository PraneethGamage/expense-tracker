import pool from '../config/db.js'

// Get all payment methods
export const getAllPaymentMethods = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM "Payment_Method" ORDER BY "Payment_Method_ID"'
    )
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching payment methods:', error)
    res.status(500).json({ error: 'Failed to fetch payment methods' })
  }
}

// Get payment method by ID
export const getPaymentMethodById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'SELECT * FROM "Payment_Method" WHERE "Payment_Method_ID" = $1',
      [id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payment method not found' })
    }
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching payment method:', error)
    res.status(500).json({ error: 'Failed to fetch payment method' })
  }
}

// Create payment method
export const createPaymentMethod = async (req, res) => {
  try {
    const { Payment_Method_ID, Payment_Method_Name } = req.body

    if (!Payment_Method_ID || !Payment_Method_Name) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const result = await pool.query(
      'INSERT INTO "Payment_Method" ("Payment_Method_ID", "Payment_Method_Name") VALUES ($1, $2) RETURNING *',
      [Payment_Method_ID, Payment_Method_Name]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error creating payment method:', error)
    res.status(500).json({ error: 'Failed to create payment method' })
  }
}

// Update payment method
export const updatePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params
    const { Payment_Method_Name } = req.body

    const result = await pool.query(
      'UPDATE "Payment_Method" SET "Payment_Method_Name" = $1 WHERE "Payment_Method_ID" = $2 RETURNING *',
      [Payment_Method_Name, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payment method not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error updating payment method:', error)
    res.status(500).json({ error: 'Failed to update payment method' })
  }
}

// Delete payment method
export const deletePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'DELETE FROM "Payment_Method" WHERE "Payment_Method_ID" = $1 RETURNING *',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payment method not found' })
    }

    res.json({ message: 'Payment method deleted successfully' })
  } catch (error) {
    console.error('Error deleting payment method:', error)
    res.status(500).json({ error: 'Failed to delete payment method' })
  }
}
