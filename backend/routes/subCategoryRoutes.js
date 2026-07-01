import express from 'express'
import * as subCategoryController from '../controllers/subCategoryController.js'

const router = express.Router()

router.get('/', subCategoryController.getAllSubCategories)
router.get('/:id', subCategoryController.getSubCategoryById)
router.get('/main/:mainCategoryId', subCategoryController.getSubCategoriesByMainCategory)
router.post('/', subCategoryController.createSubCategory)
router.put('/:id', subCategoryController.updateSubCategory)
router.delete('/:id', subCategoryController.deleteSubCategory)

export default router
