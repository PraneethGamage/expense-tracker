import Button from '../components/Common/Button'
import Input from '../components/Common/Input'
import { useState } from 'react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    currency: 'INR',
    dateFormat: 'DD/MM/YYYY',
    theme: 'light',
    notifications: true,
  })

  const handleSave = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings))
    alert('Settings saved successfully!')
  }

  const handleReset = () => {
    const confirmed = window.confirm('Are you sure you want to delete all data? This action cannot be undone.')
    if (confirmed) {
      localStorage.clear()
      alert('All data has been cleared!')
      window.location.reload()
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Settings</h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Preferences</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              value={settings.currency}
              onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
              <option value="GBP">British Pound (£)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Format
            </label>
            <select
              value={settings.dateFormat}
              onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Theme
            </label>
            <select
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="notifications"
              checked={settings.notifications}
              onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label htmlFor="notifications" className="ml-2 text-sm font-medium text-gray-700">
              Enable Notifications
            </label>
          </div>

          <div className="flex gap-4 pt-6">
            <Button onClick={handleSave} variant="primary">
              Save Settings
            </Button>
            <Button variant="secondary">
              Cancel
            </Button>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Management</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Backup Data</h3>
            <p className="text-gray-600 text-sm mb-3">Download your expense data as a JSON file.</p>
            <Button variant="success">
              📥 Download Backup
            </Button>
          </div>

          <hr className="my-6" />

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Export to CSV</h3>
            <p className="text-gray-600 text-sm mb-3">Export all transactions to CSV format for spreadsheet analysis.</p>
            <Button variant="success">
              📊 Export to CSV
            </Button>
          </div>

          <hr className="my-6" />

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Danger Zone</h3>
            <p className="text-gray-600 text-sm mb-3">Delete all data permanently. This action cannot be undone.</p>
            <Button variant="danger" onClick={handleReset}>
              🗑️ Delete All Data
            </Button>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">About</h2>
        <p className="text-gray-600">
          <strong>ExpenseTracker v1.0.0</strong><br />
          A simple and efficient way to track your daily expenses.
        </p>
      </div>
    </div>
  )
}