import { useState, useCallback } from 'react'
import { transactionAPI } from '../services/api'

export const useTransaction = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTransactions = useCallback(async () => {
    setLoading(true)
    try {
      const response = await transactionAPI.getAll()
      setTransactions(response.data)
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Failed to fetch transactions:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchTransactionsByDateRange = useCallback(async (startDate, endDate) => {
    setLoading(true)
    try {
      const response = await transactionAPI.getByDateRange(startDate, endDate)
      setTransactions(response.data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const addTransaction = useCallback(async (data) => {
    try {
      const response = await transactionAPI.create(data)
      setTransactions([...transactions, response.data])
      return response.data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [transactions])

  const updateTransaction = useCallback(async (id, data) => {
    try {
      const response = await transactionAPI.update(id, data)
      setTransactions(
        transactions.map((t) => (t.Transaction_ID === id ? response.data : t))
      )
      return response.data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [transactions])

  const deleteTransaction = useCallback(async (id) => {
    try {
      await transactionAPI.delete(id)
      setTransactions(transactions.filter((t) => t.Transaction_ID !== id))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [transactions])

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    fetchTransactionsByDateRange,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  }
}