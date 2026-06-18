import { useEffect, useState } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { analyticsAPI } from '../services/api'
import Button from '../components/Common/Button'

export default function ReportsPage() {
  const [monthlyTrends, setMonthlyTrends] = useState([])
  const [categoryBreakdown, setCategoryBreakdown] = useState([])
  const [paymentMethodBreakdown, setPaymentMethodBreakdown] = useState([])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReportsData()
  }, [selectedYear])

  const fetchReportsData = async () => {
    setLoading(true)
    try {
      const [trendsRes, categoryRes, paymentRes] = await Promise.all([
        analyticsAPI.getMonthlyTrends(selectedYear),
        analyticsAPI.getCategoryBreakdown(
          `${selectedYear}-01-01`,
          `${selectedYear}-12-31`
        ),
        analyticsAPI.getPaymentMethodBreakdown(),
      ])

      setMonthlyTrends(trendsRes.data || [])
      setCategoryBreakdown(categoryRes.data || [])
      setPaymentMethodBreakdown(paymentRes.data || [])
    } catch (error) {
      console.error('Failed to fetch reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value))
  }

  if (loading) {
    return <div className="text-center py-12 text-lg">Loading reports...</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
        <div className="flex items-center gap-2">
          <label className="font-semibold">Year:</label>
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            {[...Array(5)].map((_, i) => {
              const year = new Date().getFullYear() - i
              return <option key={year} value={year}>{year}</option>
            })}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Spending Trends</h2>
          {monthlyTrends.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#8884d8" 
                  name="Amount"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-8">No data available</p>
          )}
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Category Breakdown</h2>
          {categoryBreakdown.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-8">No data available</p>
          )}
        </div>
      </div>

      {/* Payment Method Breakdown */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method Distribution</h2>
        {paymentMethodBreakdown.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={paymentMethodBreakdown}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="method" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" name="Amount" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center py-8">No data available</p>
        )}
      </div>

      {/* Export Button */}
      <div className="flex justify-center">
        <Button variant="success">
          📊 Export to CSV
        </Button>
      </div>
    </div>
  )
}