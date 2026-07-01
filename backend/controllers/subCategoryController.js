import pool from '../config/db.js'

// Get all sub-categories
export const getAllSubCategories = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM "Sub_Category" ORDER BY "Sub_Category_ID"'
    )
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching sub-categories:', error)
    res.status(500).json({ error: 'Failed to fetch sub-categories' })
  }
}

// Get sub-category by ID
export const getSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'SELECT * FROM "Sub_Category" WHERE "Sub_Category_ID" = $1',
      [id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sub-category not found' })
    }
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching sub-category:', error)
    res.status(500).json({ error: 'Failed to fetch sub-category' })
  }
}

// Get sub-categories by main category
export const getSubCategoriesByMainCategory = async (req, res) => {
  try {
    const { mainCategoryId } = req.params
    const result = await pool.query(
      'SELECT * FROM "Sub_Category" WHERE "Main_Category_ID" = $1 ORDER BY "Sub_Category_ID"',
      [mainCategoryId]
    )
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching sub-categories:', error)
    res.status(500).json({ error: 'Failed to fetch sub-categories' })
  }
}

// Create sub-category
export const createSubCategory = async (req, res) => {
  try {
    const { Sub_Category_ID, Sub_Category_Name, Main_Category_ID } = req.body

    if (!Sub_Category_ID || !Sub_Category_Name || !Main_Category_ID) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const result = await pool.query(
      'INSERT INTO "Sub_Category" ("Sub_Category_ID", "Sub_Category_Name", "Main_Category_ID") VALUES ($1, $2, $3) RETURNING *',
      [Sub_Category_ID, Sub_Category_Name, Main_Category_ID]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error creating sub-category:', error)
    res.status(500).json({ error: 'Failed to create sub-category' })
  }
}

// Update sub-category
export const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params
    const { Sub_Category_Name, Main_Category_ID } = req.body

    const result = await pool.query(
      'UPDATE "Sub_Category" SET "Sub_Category_Name" = $1, "Main_Category_ID" = $2 WHERE "Sub_Category_ID" = $3 RETURNING *',
      [Sub_Category_Name, Main_Category_ID, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sub-category not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error updating sub-category:', error)
    res.status(500).json({ error: 'Failed to update sub-category' })
  }
}

// Delete sub-category
export const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'DELETE FROM "Sub_Category" WHERE "Sub_Category_ID" = $1 RETURNING *',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sub-category not found' })
    }

    res.json({ message: 'Sub-category deleted successfully' })
  } catch (error) {
    console.error('Error deleting sub-category:', error)
    res.status(500).json({ error: 'Failed to delete sub-category' })
  }
}
