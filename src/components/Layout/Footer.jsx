export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white text-center py-6 mt-12">
      <p>&copy; {currentYear} ExpenseTracker. All rights reserved.</p>
      <p className="text-sm text-gray-400">Track your expenses efficiently</p>
    </footer>
  )
}