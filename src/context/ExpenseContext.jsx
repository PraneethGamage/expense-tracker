import { createContext, useContext, useState, useEffect } from 'react'
import { categoryAPI, subCategoryAPI, vendorAPI, paymentMethodAPI } from '../services/api'

const ExpenseContext = createContext()

export const ExpenseProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [vendors, setVendors] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch all initial data
  useEffect(() => {
    fetchInitialData()
  }, [])

  const fetchInitialData = async () => {
    setLoading(true)
    try {
      const [catRes, subCatRes, vendorRes, pmRes] = await Promise.all([
        categoryAPI.getAll(),
        subCategoryAPI.getAll(),
        vendorAPI.getAll(),
        paymentMethodAPI.getAll(),
      ])

      setCategories(catRes.data)
      setSubCategories(subCatRes.data)
      setVendors(vendorRes.data)
      setPaymentMethods(pmRes.data)
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Failed to fetch initial data:', err)
    } finally {
      setLoading(false)
    }
  }

  // Get sub-categories by main category
  const getSubCategoriesByMain = (mainCategoryId) => {
    return subCategories.filter(
      (sub) => sub.Main_Category_ID === mainCategoryId
    )
  }

  // Get vendors by sub-category
  const getVendorsBySubCategory = (subCategoryId) => {
    return vendors.filter((vendor) => vendor.Sub_Category_ID === subCategoryId)
  }

  const value = {
    categories,
    subCategories,
    vendors,
    paymentMethods,
    loading,
    error,
    fetchInitialData,
    getSubCategoriesByMain,
    getVendorsBySubCategory,
  }

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  )
}

export const useExpense = () => {
  const context = useContext(ExpenseContext)
  if (!context) {
    throw new Error('useExpense must be used within ExpenseProvider')
  }
  return context
}