import { useEffect, useState } from 'react'
import { useExpense } from '../context/ExpenseContext'
import { vendorAPI } from '../services/api'
import Button from '../components/Common/Button'
import Modal from '../components/Common/Modal'
import Input from '../components/Common/Input'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function VendorsPage() {
  const { vendors, subCategories, fetchInitialData } = useExpense()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)

  const handleOpenModal = (vendor = null) => {
    setSelectedVendor(vendor)
    setFormData(vendor ? { ...vendor } : {})
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedVendor(null)
    setFormData({})
    setIsModalOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (selectedVendor) {
        await vendorAPI.update(selectedVendor.Vendor_ID, formData)
        alert('Vendor updated successfully!')
      } else {
        await vendorAPI.create(formData)
        alert('Vendor added successfully!')
      }
      await fetchInitialData()
      handleCloseModal()
    } catch (error) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      try {
        await vendorAPI.delete(id)
        alert('Vendor deleted successfully!')
        await fetchInitialData()
      } catch (error) {
        alert('Error: ' + error.message)
      }
    }
  }

  const getSubCategoryName = (id) => {
    return subCategories.find((sc) => sc.Sub_Category_ID === id)?.Sub_Category_Name || '-'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Vendors</h1>
        <Button onClick={() => handleOpenModal()}>
          <Plus size={20} className="mr-2" /> Add Vendor
        </Button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">ID</th>
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">Sub-Category</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.Vendor_ID} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{vendor.Vendor_ID}</td>
                <td className="px-6 py-3">{vendor.Vendor_Name}</td>
                <td className="px-6 py-3">{getSubCategoryName(vendor.Sub_Category_ID)}</td>
                <td className="px-6 py-3 flex gap-2">
                  <button
                    onClick={() => handleOpenModal(vendor)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(vendor.Vendor_ID)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedVendor ? 'Edit Vendor' : 'Add New Vendor'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Vendor ID"
            value={formData.Vendor_ID || ''}
            onChange={(e) => setFormData({ ...formData, Vendor_ID: e.target.value })}
            disabled={!!selectedVendor}
          />
          <Input
            label="Vendor Name"
            value={formData.Vendor_Name || ''}
            onChange={(e) => setFormData({ ...formData, Vendor_Name: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sub-Category
            </label>
            <select
              value={formData.Sub_Category_ID || ''}
              onChange={(e) => setFormData({ ...formData, Sub_Category_ID: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Sub-Category</option>
              {subCategories.map((subCat) => (
                <option key={subCat.Sub_Category_ID} value={subCat.Sub_Category_ID}>
                  {subCat.Sub_Category_Name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}