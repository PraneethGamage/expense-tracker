import pool from '../config/db.js'

// Get all transactions
export const getAllTransactions = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM "Transaction" ORDER BY "Date" DESC'
    )
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching transactions:', error)
    res.status(500).json({ error: 'Failed to fetch transactions' })
  }
}

// Get transaction by ID
export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'SELECT * FROM "Transaction" WHERE "Transaction_ID" = $1',
      [id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Transaction not found' })
    }
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching transaction:', error)
    res.status(500).json({ error: 'Failed to fetch transaction' })
  }
}

// Create transaction
export const createTransaction = async (req, res) => {
  try {
    const { Date, Main_Category_ID, Sub_Category_ID, Vendor_ID, Amount, Payment_Method_ID, Payment_Status } = req.body

    // Validation
    if (!Date || !Main_Category_ID || !Sub_Category_ID || !Vendor_ID || !Amount || !Payment_Method_ID) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const result = await pool.query(
      'INSERT INTO "Transaction" ("Date", "Main_Category_ID", "Sub_Category_ID", "Vendor_ID", "Amount", "Payment_Method_ID", "Payment_Status") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [Date, Main_Category_ID, Sub_Category_ID, Vendor_ID, Amount, Payment_Method_ID, Payment_Status || 'Completed']
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error creating transaction:', error)
    res.status(500).json({ error: 'Failed to create transaction' })
  }
}

// Update transaction
export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params
    const { Date, Main_Category_ID, Sub_Category_ID, Vendor_ID, Amount, Payment_Method_ID, Payment_Status } = req.body

    const result = await pool.query(
      'UPDATE "Transaction" SET "Date" = $1, "Main_Category_ID" = $2, "Sub_Category_ID" = $3, "Vendor_ID" = $4, "Amount" = $5, "Payment_Method_ID" = $6, "Payment_Status" = $7 WHERE "Transaction_ID" = $8 RETURNING *',
      [Date, Main_Category_ID, Sub_Category_ID, Vendor_ID, Amount, Payment_Method_ID, Payment_Status, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Transaction not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error updating transaction:', error)
    res.status(500).json({ error: 'Failed to update transaction' })
  }
}

// Delete transaction
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'DELETE FROM "Transaction" WHERE "Transaction_ID" = $1 RETURNING *',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Transaction not found' })
    }

    res.json({ message: 'Transaction deleted successfully' })
  } catch (error) {
    console.error('Error deleting transaction:', error)
    res.status(500).json({ error: 'Failed to delete transaction' })
  }
}

// Get transactions by date range
export const getTransactionsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate are required' })
    }

    const result = await pool.query(
      'SELECT * FROM "Transaction" WHERE "Date" BETWEEN $1 AND $2 ORDER BY "Date" DESC',
      [startDate, endDate]
    )

    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching transactions by date range:', error)
    res.status(500).json({ error: 'Failed to fetch transactions' })
  }
}
