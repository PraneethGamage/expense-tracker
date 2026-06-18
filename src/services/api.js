import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Transaction APIs
export const transactionAPI = {
  getAll: () => api.get('/transactions'),
  getById: (id) => api.get(`/transactions/${id}`),
  create: (data) => api.post('/transactions', data),
  update: (id, data) => api.put(`/transactions/${id}`, data),
  delete: (id) => api.delete(`/transactions/${id}`),
  getByDateRange: (startDate, endDate) => 
    api.get('/transactions/range', { params: { startDate, endDate } }),
}

// Category APIs
export const categoryAPI = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
}

// Sub-Category APIs
export const subCategoryAPI = {
  getAll: () => api.get('/subcategories'),
  getById: (id) => api.get(`/subcategories/${id}`),
  getByMainCategory: (mainCategoryId) => 
    api.get(`/subcategories/main/${mainCategoryId}`),
  create: (data) => api.post('/subcategories', data),
  update: (id, data) => api.put(`/subcategories/${id}`, data),
  delete: (id) => api.delete(`/subcategories/${id}`),
}

// Vendor APIs
export const vendorAPI = {
  getAll: () => api.get('/vendors'),
  getById: (id) => api.get(`/vendors/${id}`),
  getBySubCategory: (subCategoryId) => 
    api.get(`/vendors/subcategory/${subCategoryId}`),
  create: (data) => api.post('/vendors', data),
  update: (id, data) => api.put(`/vendors/${id}`, data),
  delete: (id) => api.delete(`/vendors/${id}`),
}

// Payment Method APIs
export const paymentMethodAPI = {
  getAll: () => api.get('/payment-methods'),
  getById: (id) => api.get(`/payment-methods/${id}`),
  create: (data) => api.post('/payment-methods', data),
  update: (id, data) => api.put(`/payment-methods/${id}`, data),
  delete: (id) => api.delete(`/payment-methods/${id}`),
}

// Analytics APIs
export const analyticsAPI = {
  getSummary: () => api.get('/analytics/summary'),
  getCategoryBreakdown: (startDate, endDate) =>
    api.get('/analytics/category-breakdown', { params: { startDate, endDate } }),
  getMonthlyTrends: (year) =>
    api.get(`/analytics/monthly-trends/${year}`),
  getTopVendors: (limit = 10) =>
    api.get('/analytics/top-vendors', { params: { limit } }),
  getPaymentMethodBreakdown: () =>
    api.get('/analytics/payment-method-breakdown'),
}

export default api