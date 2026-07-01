# ExpenseTracker - Backend API

Complete Node.js/Express backend for the ExpenseTracker application with PostgreSQL database.

## Features

- ✅ All CRUD operations for Transactions, Categories, Vendors, Payment Methods
- ✅ Sub-categories management
- ✅ Advanced analytics (summary, trends, breakdowns)
- ✅ Date range filtering
- ✅ Aggregation queries
- ✅ Error handling
- ✅ CORS enabled

## Prerequisites

- Node.js v16+
- PostgreSQL 12+
- npm

## Installation

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup Database

Create PostgreSQL database with the schema:

```sql
-- Create database
CREATE DATABASE expense_tracker;

-- Create tables
CREATE TABLE "Main_Category" (
  "Main_Category_ID" VARCHAR(10) PRIMARY KEY,
  "Main_Category_Name" VARCHAR(50) NOT NULL
);

CREATE TABLE "Sub_Category" (
  "Sub_Category_ID" VARCHAR(10) PRIMARY KEY,
  "Sub_Category_Name" VARCHAR(50) NOT NULL,
  "Main_Category_ID" VARCHAR(10) NOT NULL,
  FOREIGN KEY ("Main_Category_ID") REFERENCES "Main_Category"("Main_Category_ID")
);

CREATE TABLE "Payment_Method" (
  "Payment_Method_ID" VARCHAR(10) PRIMARY KEY,
  "Payment_Method_Name" VARCHAR(50) NOT NULL
);

CREATE TABLE "Vendor" (
  "Vendor_ID" VARCHAR(10) PRIMARY KEY,
  "Vendor_Name" VARCHAR(100) NOT NULL,
  "Sub_Category_ID" VARCHAR(10) NOT NULL,
  FOREIGN KEY ("Sub_Category_ID") REFERENCES "Sub_Category"("Sub_Category_ID")
);

CREATE TABLE "Transaction" (
  "Transaction_ID" SERIAL PRIMARY KEY,
  "Date" DATE NOT NULL,
  "Main_Category_ID" VARCHAR(10) NOT NULL,
  "Sub_Category_ID" VARCHAR(10) NOT NULL,
  "Vendor_ID" VARCHAR(10) NOT NULL,
  "Payment_Method_ID" VARCHAR(10) NOT NULL,
  "Amount" DECIMAL(10, 2) NOT NULL,
  "Payment_Status" VARCHAR(20) NOT NULL,
  FOREIGN KEY ("Main_Category_ID") REFERENCES "Main_Category"("Main_Category_ID"),
  FOREIGN KEY ("Sub_Category_ID") REFERENCES "Sub_Category"("Sub_Category_ID"),
  FOREIGN KEY ("Vendor_ID") REFERENCES "Vendor"("Vendor_ID"),
  FOREIGN KEY ("Payment_Method_ID") REFERENCES "Payment_Method"("Payment_Method_ID")
);
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials:
```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=expense_tracker
PORT=5000
```

### 4. Start Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs on `http://localhost:5000`

## API Endpoints

### Transactions
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:id` - Get transaction by ID
- `GET /api/transactions/range?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` - Get transactions by date range
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Sub-Categories
- `GET /api/subcategories` - Get all sub-categories
- `GET /api/subcategories/:id` - Get sub-category by ID
- `GET /api/subcategories/main/:mainCategoryId` - Get sub-categories by main category
- `POST /api/subcategories` - Create sub-category
- `PUT /api/subcategories/:id` - Update sub-category
- `DELETE /api/subcategories/:id` - Delete sub-category

### Vendors
- `GET /api/vendors` - Get all vendors
- `GET /api/vendors/:id` - Get vendor by ID
- `GET /api/vendors/subcategory/:subCategoryId` - Get vendors by sub-category
- `POST /api/vendors` - Create vendor
- `PUT /api/vendors/:id` - Update vendor
- `DELETE /api/vendors/:id` - Delete vendor

### Payment Methods
- `GET /api/payment-methods` - Get all payment methods
- `GET /api/payment-methods/:id` - Get payment method by ID
- `POST /api/payment-methods` - Create payment method
- `PUT /api/payment-methods/:id` - Update payment method
- `DELETE /api/payment-methods/:id` - Delete payment method

### Analytics
- `GET /api/analytics/summary` - Get expense summary
- `GET /api/analytics/category-breakdown?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` - Get category breakdown
- `GET /api/analytics/monthly-trends/:year` - Get monthly trends for a year
- `GET /api/analytics/top-vendors?limit=10` - Get top vendors
- `GET /api/analytics/payment-method-breakdown` - Get payment method distribution

## Project Structure

```
backend/
├── config/
│   └── db.js                 # Database connection
├── controllers/
│   ├── transactionController.js
│   ├── categoryController.js
│   ├── subCategoryController.js
│   ├── vendorController.js
│   ├── paymentMethodController.js
│   └── analyticsController.js
├── routes/
│   ├── transactionRoutes.js
│   ├── categoryRoutes.js
│   ├── subCategoryRoutes.js
│   ├── vendorRoutes.js
│   ├── paymentMethodRoutes.js
│   └── analyticsRoutes.js
├── server.js                 # Main Express app
├── package.json
├── .env.example
└── README.md
```

## Example API Calls

### Create a Transaction
```bash
curl -X POST http://localhost:5000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "Date": "2026-06-18",
    "Main_Category_ID": "MC_001",
    "Sub_Category_ID": "SC_001",
    "Vendor_ID": "V_001",
    "Amount": 500.00,
    "Payment_Method_ID": "PM_001",
    "Payment_Status": "Completed"
  }'
```

### Get All Transactions
```bash
curl http://localhost:5000/api/transactions
```

### Get Analytics Summary
```bash
curl http://localhost:5000/api/analytics/summary
```

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database exists and tables are created

### CORS Errors
- CORS is enabled for all origins by default
- Modify in `server.js` if needed

### Port Already in Use
- Change `PORT` in `.env` to an available port

## License

MIT License - feel free to use this project for personal or commercial purposes.
