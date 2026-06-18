import { useState, useEffect } from 'react'
import { Edit, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import Button from '../Common/Button'
import { useExpense } from '../../context/ExpenseContext'

export default function TransactionList({ 
  transactions, 
  onEdit, 
  onDelete,
  loading = false 
}) {
  const [sortConfig, setSortConfig] = useState({ key: 'Date', direction: 'desc' })
  const [filteredTransactions, setFilteredTransactions] = useState(transactions)
  const { categories, subCategories, vendors, paymentMethods } = useExpense()

  useEffect(() => {
    let sorted = [...transactions]
    
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }

    setFilteredTransactions(sorted)
  }, [transactions, sortConfig])

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const getCategoryName = (id) => {
    return categories.find((c) => c.Main_Category_ID === id)?.Main_Category_Name || '-'
  }

  const getSubCategoryName = (id) => {
    return subCategories.find((sc) => sc.Sub_Category_ID === id)?.Sub_Category_Name || '-'
  }

  const getVendorName = (id) => {
    return vendors.find((v) => v.Vendor_ID === id)?.Vendor_Name || '-'
  }

  const getPaymentMethodName = (id) => {
    return paymentMethods.find((pm) => pm.Payment_Method_ID === id)?.Payment_Method_Name || '-'
  }

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <ChevronUp size={16} className="text-gray-400" />
    return sortConfig.direction === 'asc' ? 
      <ChevronUp size={16} /> : 
      <ChevronDown size={16} />
  }

  if (loading) {
    return <div className="text-center py-8">Loading transactions...</div>
  }

  if (filteredTransactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No transactions found. Add one to get started!</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-lg shadow">
        <thead className="bg-gray-100 border-b-2 border-gray-300">
          <tr>
            <th 
              className="px-6 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort('Date')}
            >
              <div className="flex items-center gap-2">
                Date <SortIcon column="Date" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Main Category</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Sub Category</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Vendor</th>
            <th 
              className="px-6 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort('Amount')}
            >
              <div className="flex items-center gap-2">
                Amount <SortIcon column="Amount" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Payment Method</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction, index) => (
            <tr 
              key={transaction.Transaction_ID} 
              className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              <td className="px-6 py-4 text-sm">{new Date(transaction.Date).toLocaleDateString()}</td>
              <td className="px-6 py-4 text-sm">{getCategoryName(transaction.Main_Category_ID)}</td>
              <td className="px-6 py-4 text-sm">{getSubCategoryName(transaction.Sub_Category_ID)}</td>
              <td className="px-6 py-4 text-sm">{getVendorName(transaction.Vendor_ID)}</td>
              <td className="px-6 py-4 text-sm font-semibold text-green-600">
                ₹{parseFloat(transaction.Amount).toFixed(2)}
              </td>
              <td className="px-6 py-4 text-sm">{getPaymentMethodName(transaction.Payment_Method_ID)}</td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  transaction.Payment_Status === 'Completed' ? 'bg-green-100 text-green-800' :
                  transaction.Payment_Status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {transaction.Payment_Status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm flex gap-2">
                <button
                  onClick={() => onEdit(transaction)}
                  className="text-blue-600 hover:text-blue-800 p-1"
                  title="Edit"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => onDelete(transaction.Transaction_ID)}
                  className="text-red-600 hover:text-red-800 p-1"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}