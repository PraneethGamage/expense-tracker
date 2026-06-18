import { useEffect, useState } from 'react'
import TransactionForm from '../components/Transaction/TransactionForm'
import TransactionList from '../components/Transaction/TransactionList'
import Modal from '../components/Common/Modal'
import Button from '../components/Common/Button'
import { useTransaction } from '../hooks/useTransaction'
import { Plus } from 'lucide-react'

export default function TransactionsPage() {
  const { 
    transactions, 
    loading, 
    fetchTransactions, 
    addTransaction, 
    updateTransaction, 
    deleteTransaction 
  } = useTransaction()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const handleOpenModal = (transaction = null) => {
    setSelectedTransaction(transaction)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedTransaction(null)
    setIsModalOpen(false)
  }

  const handleSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      if (selectedTransaction) {
        await updateTransaction(selectedTransaction.Transaction_ID, data)
        alert('Transaction updated successfully!')
      } else {
        await addTransaction(data)
        alert('Transaction added successfully!')
      }
      handleCloseModal()
      await fetchTransactions()
    } catch (error) {
      alert('Error saving transaction: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransaction(id)
        alert('Transaction deleted successfully!')
        await fetchTransactions()
      } catch (error) {
        alert('Error deleting transaction: ' + error.message)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
        <Button 
          onClick={() => handleOpenModal()}
        >
          <Plus size={20} className="mr-2" /> Add Transaction
        </Button>
      </div>

      <TransactionList 
        transactions={transactions}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
        loading={loading}
      />

      <Modal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedTransaction ? 'Edit Transaction' : 'Add New Transaction'}
      >
        <TransactionForm 
          initialData={selectedTransaction}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  )
}