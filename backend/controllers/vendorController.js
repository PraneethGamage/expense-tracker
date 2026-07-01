import pool from '../config/db.js'

// Get all vendors
export const getAllVendors = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM "Vendor" ORDER BY "Vendor_ID"'
    )
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching vendors:', error)
    res.status(500).json({ error: 'Failed to fetch vendors' })
  }
}

// Get vendor by ID
export const getVendorById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'SELECT * FROM "Vendor" WHERE "Vendor_ID" = $1',
      [id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vendor not found' })
    }
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching vendor:', error)
    res.status(500).json({ error: 'Failed to fetch vendor' })
  }
}

// Get vendors by sub-category
export const getVendorsBySubCategory = async (req, res) => {
  try {
    const { subCategoryId } = req.params
    const result = await pool.query(
      'SELECT * FROM "Vendor" WHERE "Sub_Category_ID" = $1 ORDER BY "Vendor_ID"',
      [subCategoryId]
    )
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching vendors:', error)
    res.status(500).json({ error: 'Failed to fetch vendors' })
  }
}

// Create vendor
export const createVendor = async (req, res) => {
  try {
    const { Vendor_ID, Vendor_Name, Sub_Category_ID } = req.body

    if (!Vendor_ID || !Vendor_Name || !Sub_Category_ID) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const result = await pool.query(
      'INSERT INTO "Vendor" ("Vendor_ID", "Vendor_Name", "Sub_Category_ID") VALUES ($1, $2, $3) RETURNING *',
      [Vendor_ID, Vendor_Name, Sub_Category_ID]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error creating vendor:', error)
    res.status(500).json({ error: 'Failed to create vendor' })
  }
}

// Update vendor
export const updateVendor = async (req, res) => {
  try {
    const { id } = req.params
    const { Vendor_Name, Sub_Category_ID } = req.body

    const result = await pool.query(
      'UPDATE "Vendor" SET "Vendor_Name" = $1, "Sub_Category_ID" = $2 WHERE "Vendor_ID" = $3 RETURNING *',
      [Vendor_Name, Sub_Category_ID, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vendor not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error updating vendor:', error)
    res.status(500).json({ error: 'Failed to update vendor' })
  }
}

// Delete vendor
export const deleteVendor = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'DELETE FROM "Vendor" WHERE "Vendor_ID" = $1 RETURNING *',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vendor not found' })
    }

    res.json({ message: 'Vendor deleted successfully' })
  } catch (error) {
    console.error('Error deleting vendor:', error)
    res.status(500).json({ error: 'Failed to delete vendor' })
  }
}
