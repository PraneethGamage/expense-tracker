import pool from '../config/db.js'

// Get summary analytics
export const getSummary = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COALESCE(SUM("Amount"), 0) as "totalAmount",
        COUNT(*) as "transactionCount",
        COALESCE(AVG("Amount"), 0) as "averageAmount",
        COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM "Date") = EXTRACT(MONTH FROM CURRENT_DATE) 
          AND EXTRACT(YEAR FROM "Date") = EXTRACT(YEAR FROM CURRENT_DATE) THEN "Amount" ELSE 0 END), 0) as "monthlyAmount"
      FROM "Transaction"
    `)
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching summary:', error)
    res.status(500).json({ error: 'Failed to fetch summary' })
  }
}

// Get category breakdown
export const getCategoryBreakdown = async (req, res) => {
  try {
    const { startDate, endDate } = req.query

    let query = `
      SELECT 
        mc."Main_Category_Name" as "name",
        COALESCE(SUM(t."Amount"), 0) as "amount"
      FROM "Main_Category" mc
      LEFT JOIN "Transaction" t ON mc."Main_Category_ID" = t."Main_Category_ID"
    `

    const params = []

    if (startDate && endDate) {
      query += ` WHERE t."Date" IS NULL OR (t."Date" BETWEEN $1 AND $2)`
      params.push(startDate, endDate)
    }

    query += ` GROUP BY mc."Main_Category_ID", mc."Main_Category_Name"`

    const result = await pool.query(query, params)
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching category breakdown:', error)
    res.status(500).json({ error: 'Failed to fetch category breakdown' })
  }
}

// Get monthly trends
export const getMonthlyTrends = async (req, res) => {
  try {
    const { year } = req.params

    const result = await pool.query(`
      SELECT 
        TO_CHAR("Date", 'Mon') as "month",
        COALESCE(SUM("Amount"), 0) as "amount"
      FROM "Transaction"
      WHERE EXTRACT(YEAR FROM "Date") = $1
      GROUP BY EXTRACT(MONTH FROM "Date"), TO_CHAR("Date", 'Mon')
      ORDER BY EXTRACT(MONTH FROM "Date")
    `, [year])

    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching monthly trends:', error)
    res.status(500).json({ error: 'Failed to fetch monthly trends' })
  }
}

// Get top vendors
export const getTopVendors = async (req, res) => {
  try {
    const { limit = 10 } = req.query

    const result = await pool.query(`
      SELECT 
        v."Vendor_Name" as "vendor",
        COALESCE(SUM(t."Amount"), 0) as "amount"
      FROM "Vendor" v
      LEFT JOIN "Transaction" t ON v."Vendor_ID" = t."Vendor_ID"
      GROUP BY v."Vendor_ID", v."Vendor_Name"
      ORDER BY "amount" DESC
      LIMIT $1
    `, [limit])

    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching top vendors:', error)
    res.status(500).json({ error: 'Failed to fetch top vendors' })
  }
}

// Get payment method breakdown
export const getPaymentMethodBreakdown = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        pm."Payment_Method_Name" as "method",
        COALESCE(SUM(t."Amount"), 0) as "amount"
      FROM "Payment_Method" pm
      LEFT JOIN "Transaction" t ON pm."Payment_Method_ID" = t."Payment_Method_ID"
      GROUP BY pm."Payment_Method_ID", pm."Payment_Method_Name"
    `)

    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching payment method breakdown:', error)
    res.status(500).json({ error: 'Failed to fetch payment method breakdown' })
  }
}
