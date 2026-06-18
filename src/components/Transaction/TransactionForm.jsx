import { useEffect, useState } from 'react'
import Input from '../Common/Input'
import Button from '../Common/Button'
import { useExpense } from '../../context/ExpenseContext'

export default function TransactionForm({ initialData = null, onSubmit }) {
  const [formData, setFormData] = useState(initialData || {})
  const [subCategories, setSubCategories] = useState([])
  const [vendors, setVendors] = useState([])
  const { categories, getSubCategoriesByMain, getVendorsBySubCategory, paymentMethods } = useExpense()

  // Update sub-categories when main category changes
  useEffect(() => {
    if (formData.Main_Category_ID) {
      const filtered = getSubCategoriesByMain(formData.Main_Category_ID)
      setSubCategories(filtered)
      setVendors([])
    }
  }, [formData.Main_Category_ID, getSubCategoriesByMain])

  // Update vendors when sub-category changes
  useEffect(() => {
    if (formData.Sub_Category_ID) {
      const filtered = getVendorsBySubCategory(formData.Sub_Category_ID)
      setVendors(filtered)
    }
  }, [formData.Sub_Category_ID, getVendorsBySubCategory])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleReset = () => {
    setFormData(initialData || {})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Date"
        type="date"
        name="Date"
        value={formData.Date || ''}
        onChange={handleChange}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Main Category *
        </label>
        <select
          name="Main_Category_ID"
          value={formData.Main_Category_ID || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Main Category</option>
          {categories.map((cat) => (
            <option key={cat.Main_Category_ID} value={cat.Main_Category_ID}>
              {cat.Main_Category_Name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sub Category *
        </label>
        <select
          name="Sub_Category_ID"
          value={formData.Sub_Category_ID || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!formData.Main_Category_ID}
          required
        >
          <option value="">Select Sub Category</option>
          {subCategories.map((subCat) => (
            <option key={subCat.Sub_Category_ID} value={subCat.Sub_Category_ID}>
              {subCat.Sub_Category_Name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Vendor *
        </label>
        <select
          name="Vendor_ID"
          value={formData.Vendor_ID || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!formData.Sub_Category_ID}
          required
        >
          <option value="">Select Vendor</option>
          {vendors.map((vendor) => (
            <option key={vendor.Vendor_ID} value={vendor.Vendor_ID}>
              {vendor.Vendor_Name}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Amount"
        type="number"
        name="Amount"
        step="0.01"
        placeholder="0.00"
        value={formData.Amount || ''}
        onChange={handleChange}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Payment Method *
        </label>
        <select
          name="Payment_Method_ID"
          value={formData.Payment_Method_ID || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Payment Method</option>
          {paymentMethods.map((pm) => (
            <option key={pm.Payment_Method_ID} value={pm.Payment_Method_ID}>
              {pm.Payment_Method_Name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          name="Payment_Status"
          value={formData.Payment_Status || 'Completed'}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" variant="primary">
          {initialData ? 'Update Transaction' : 'Add Transaction'}
        </Button>
        <Button type="button" variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  )
}