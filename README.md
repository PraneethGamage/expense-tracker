# ExpenseTracker - React Frontend

A modern, user-friendly expense tracking application built with React, Tailwind CSS, and Recharts.

## Features

- 📊 **Dashboard** - View expense summaries and analytics
- 💰 **Transaction Management** - Add, edit, and delete transactions
- 📁 **Category Management** - Manage main and sub-categories
- 🏪 **Vendor Management** - Track expenses by vendor
- 📈 **Reports & Analytics** - Visualize spending patterns
- 🎨 **Responsive Design** - Works on desktop and mobile
- ⚡ **Real-time Updates** - Instant feedback on actions

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Icons**: Lucide React

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on http://localhost:5000

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
```bash
cp .env.example .env
# Edit .env and set your API URL (default: http://localhost:5000/api)
```

### 3. Start Development Server
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/          # React components
│   ├── Layout/         # Header, Footer, Layout
│   ├── Transaction/    # Transaction-related components
│   ├── Common/         # Reusable components (Button, Modal, Input)
│   └── ...
├── pages/              # Page components
│   ├── DashboardPage.jsx
│   ├── TransactionsPage.jsx
│   ├── CategoriesPage.jsx
│   ├── VendorsPage.jsx
│   ├── ReportsPage.jsx
│   └── SettingsPage.jsx
├── services/           # API service layer
│   └── api.js
├── context/            # React Context (State Management)
│   └── ExpenseContext.jsx
├── hooks/              # Custom React hooks
│   └── useTransaction.js
├── App.jsx             # Main App component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## API Endpoints Required

Your backend should provide these endpoints:

### Transactions
- `GET /api/transactions`
- `POST /api/transactions`
- `PUT /api/transactions/:id`
- `DELETE /api/transactions/:id`
- `GET /api/transactions/range?startDate=&endDate=`

### Categories
- `GET /api/categories`
- `POST /api/categories`
- `PUT /api/categories/:id`
- `DELETE /api/categories/:id`

### Sub-Categories
- `GET /api/subcategories`
- `GET /api/subcategories/main/:mainCategoryId`
- `POST /api/subcategories`
- `PUT /api/subcategories/:id`
- `DELETE /api/subcategories/:id`

### Vendors
- `GET /api/vendors`
- `GET /api/vendors/subcategory/:subCategoryId`
- `POST /api/vendors`
- `PUT /api/vendors/:id`
- `DELETE /api/vendors/:id`

### Payment Methods
- `GET /api/payment-methods`
- `POST /api/payment-methods`
- `PUT /api/payment-methods/:id`
- `DELETE /api/payment-methods/:id`

### Analytics
- `GET /api/analytics/summary`
- `GET /api/analytics/category-breakdown?startDate=&endDate=`
- `GET /api/analytics/monthly-trends/:year`
- `GET /api/analytics/top-vendors?limit=10`
- `GET /api/analytics/payment-method-breakdown`

## Usage Guide

### Adding a Transaction
1. Click "Add Transaction" button on Transactions page
2. Fill in all required fields
3. Click "Add Transaction"

### Managing Categories
1. Go to "Categories" section
2. Switch between "Main Categories" and "Sub Categories" tabs
3. Click "Add" to create new entries
4. Click "Edit" or "Delete" to modify entries

### Viewing Reports
1. Navigate to "Reports" section
2. Select the year to view
3. View monthly trends, category breakdown, and payment methods

### Customizing Settings
1. Go to "Settings" page
2. Adjust currency, date format, and theme
3. Click "Save Settings"

## Troubleshooting

### API Connection Issues
- Ensure backend is running on `http://localhost:5000`
- Check `.env` file for correct `VITE_API_URL`
- Open browser console (F12) to see error messages

### Port Already in Use
- Default port is 5173. To use a different port:
```bash
npm run dev -- --port 3001
```

### Styling Issues
- Tailwind CSS classes not working? Run:
```bash
npm install
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub.