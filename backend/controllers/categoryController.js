import pool from '../config/db.js'

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM "Main_Category" ORDER BY "Main_Category_ID"'
    )
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
}

// Get category by ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'SELECT * FROM "Main_Category" WHERE "Main_Category_ID" = $1',
      [id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' })
    }
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching category:', error)
    res.status(500).json({ error: 'Failed to fetch category' })
  }
}

// Create category
export const createCategory = async (req, res) => {
  try {
    const { Main_Category_ID, Main_Category_Name } = req.body

    if (!Main_Category_ID || !Main_Category_Name) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const result = await pool.query(
      'INSERT INTO "Main_Category" ("Main_Category_ID", "Main_Category_Name") VALUES ($1, $2) RETURNING *',
      [Main_Category_ID, Main_Category_Name]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error creating category:', error)
    res.status(500).json({ error: 'Failed to create category' })
  }
}

// Update category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params
    const { Main_Category_Name } = req.body

    const result = await pool.query(
      'UPDATE "Main_Category" SET "Main_Category_Name" = $1 WHERE "Main_Category_ID" = $2 RETURNING *',
      [Main_Category_Name, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error updating category:', error)
    res.status(500).json({ error: 'Failed to update category' })
  }
}

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'DELETE FROM "Main_Category" WHERE "Main_Category_ID" = $1 RETURNING *',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' })
    }

    res.json({ message: 'Category deleted successfully' })
  } catch (error) {
    console.error('Error deleting category:', error)
    res.status(500).json({ error: 'Failed to delete category' })
  }
}
