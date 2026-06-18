import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold">
          💰 ExpenseTracker
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-200 transition">Dashboard</Link>
          <Link to="/transactions" className="hover:text-blue-200 transition">Transactions</Link>
          <Link to="/reports" className="hover:text-blue-200 transition">Reports</Link>
          <Link to="/categories" className="hover:text-blue-200 transition">Categories</Link>
          <Link to="/vendors" className="hover:text-blue-200 transition">Vendors</Link>
          <Link to="/settings" className="hover:text-blue-200 transition">Settings</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden flex items-center"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-blue-700 px-4 py-4 space-y-2">
          <Link to="/" className="block hover:text-blue-200 transition py-2">Dashboard</Link>
          <Link to="/transactions" className="block hover:text-blue-200 transition py-2">Transactions</Link>
          <Link to="/reports" className="block hover:text-blue-200 transition py-2">Reports</Link>
          <Link to="/categories" className="block hover:text-blue-200 transition py-2">Categories</Link>
          <Link to="/vendors" className="block hover:text-blue-200 transition py-2">Vendors</Link>
          <Link to="/settings" className="block hover:text-blue-200 transition py-2">Settings</Link>
        </nav>
      )}
    </header>
  )
}