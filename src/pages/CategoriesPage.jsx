import { useEffect, useState } from 'react'
import { useExpense } from '../context/ExpenseContext'
import { categoryAPI, subCategoryAPI } from '../services/api'
import Button from '../components/Common/Button'
import Modal from '../components/Common/Modal'
import Input from '../components/Common/Input'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function CategoriesPage() {
  const { categories, subCategories, fetchInitialData } = useExpense()
  const [activeTab, setActiveTab] = useState('main')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)

  const handleOpenModal = (item = null) => {
    setSelectedItem(item)
    setFormData(item ? { ...item } : {})
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedItem(null)
    setFormData({})
    setIsModalOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (activeTab === 'main') {
        if (selectedItem) {
          await categoryAPI.update(selectedItem.Main_Category_ID, formData)
          alert('Category updated successfully!')
        } else {
          await categoryAPI.create(formData)
          alert('Category added successfully!')
        }
      } else {
        if (selectedItem) {
          await subCategoryAPI.update(selectedItem.Sub_Category_ID, formData)
          alert('Sub-category updated successfully!')
        } else {
          await subCategoryAPI.create(formData)
          alert('Sub-category added successfully!')
        }
      }
      await fetchInitialData()
      handleCloseModal()
    } catch (error) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        if (type === 'category') {
          await categoryAPI.delete(id)
        } else {
          await subCategoryAPI.delete(id)
        }
        alert(`${type} deleted successfully!`)
        await fetchInitialData()
      } catch (error) {
        alert('Error: ' + error.message)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
        <Button onClick={() => handleOpenModal()}>
          <Plus size={20} className="mr-2" /> Add {activeTab === 'main' ? 'Category' : 'Sub-Category'}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab('main')}
          className={`px-4 py-2 font-semibold ${activeTab === 'main' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
        >
          Main Categories
        </button>
        <button
          onClick={() => setActiveTab('sub')}
          className={`px-4 py-2 font-semibold ${activeTab === 'sub' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
        >
          Sub Categories
        </button>
      </div>

      {/* Categories Table */}
      {activeTab === 'main' && (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">ID</th>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.Main_Category_ID} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{cat.Main_Category_ID}</td>
                  <td className="px-6 py-3">{cat.Main_Category_Name}</td>
                  <td className="px-6 py-3 flex gap-2">
                    <button
                      onClick={() => handleOpenModal(cat)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.Main_Category_ID, 'category')}
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
      )}

      {/* Sub-Categories Table */}
      {activeTab === 'sub' && (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">ID</th>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Main Category</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subCategories.map((subCat) => (
                <tr key={subCat.Sub_Category_ID} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{subCat.Sub_Category_ID}</td>
                  <td className="px-6 py-3">{subCat.Sub_Category_Name}</td>
                  <td className="px-6 py-3">{subCat.Main_Category_ID}</td>
                  <td className="px-6 py-3 flex gap-2">
                    <button
                      onClick={() => handleOpenModal(subCat)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(subCat.Sub_Category_ID, 'sub-category')}
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
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedItem ? `Edit ${activeTab === 'main' ? 'Category' : 'Sub-Category'}` : `Add ${activeTab === 'main' ? 'Category' : 'Sub-Category'}`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'main' ? (
            <>
              <Input
                label="Category ID"
                value={formData.Main_Category_ID || ''}
                onChange={(e) => setFormData({ ...formData, Main_Category_ID: e.target.value })}
                disabled={!!selectedItem}
              />
              <Input
                label="Category Name"
                value={formData.Main_Category_Name || ''}
                onChange={(e) => setFormData({ ...formData, Main_Category_Name: e.target.value })}
              />
            </>
          ) : (
            <>
              <Input
                label="Sub-Category ID"
                value={formData.Sub_Category_ID || ''}
                onChange={(e) => setFormData({ ...formData, Sub_Category_ID: e.target.value })}
                disabled={!!selectedItem}
              />
              <Input
                label="Sub-Category Name"
                value={formData.Sub_Category_Name || ''}
                onChange={(e) => setFormData({ ...formData, Sub_Category_Name: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Main Category
                </label>
                <select
                  value={formData.Main_Category_ID || ''}
                  onChange={(e) => setFormData({ ...formData, Main_Category_ID: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.Main_Category_ID} value={cat.Main_Category_ID}>
                      {cat.Main_Category_Name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
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