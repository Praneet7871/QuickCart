# QuickCart 🛒

QuickCart is a full-stack e-commerce platform built with **Next.js**, designed for fast, smooth shopping and a dedicated dashboard for sellers to manage everything from products to orders.

---

## 🚀 Features

- **Product Catalog** – Browse products by category or search directly
- **Shopping Cart** – Add, update, and remove items
- **User Auth** – Powered by Clerk for secure login and signup
- **Seller Dashboard** – Add/edit products, manage orders
- **Order Management** – Users can track orders; sellers handle incoming ones
- **Image Uploads** – Cloudinary support for multiple product images
- **Address Book** – Add and select shipping addresses
- **Payments** – COD for now; online payment coming soon
- **Event Handling** – Inngest used to manage order events and clear cart

---

## 🛠️ Tech Stack

**Frontend**
- Next.js + React
- Tailwind CSS
- Clerk (Auth)
- react-hot-toast (Notifications)

**Backend**
- Node.js
- Next.js API routes
- Mongoose + MongoDB
- Cloudinary (Media storage)
- Inngest (Event-driven tasks)

**Database**
- MongoDB

---

## ✅ Prerequisites

Make sure you have:

- Node.js 18+
- npm or yarn
- MongoDB instance
- Clerk account
- Cloudinary account
- Inngest account

Create a .env.local file in the root:



🧑‍💻 Getting Started
Clone the repo

bash
Copy
Edit
git clone https://github.com/Praneet7871/QuickCart.git
cd QuickCart
Install dependencies

bash
Copy
Edit
npm install
# or
yarn install
Start the dev server

bash
Copy
Edit
npm run dev
# or
yarn dev
Open http://localhost:3000

🧭 App Overview
Authentication (Clerk)
Click the Account icon to sign up or log in

After login, users can shop, checkout, or become sellers

Browsing Products
Home shows featured items

"Shop" lists all products: /all-products

Product detail: /product/[id]

Cart
Add to cart from product page

View/edit cart at /cart

Proceed to checkout with address selection and place order

Seller Dashboard
/seller: Add product

/seller/product-list: View your products

/seller/orders: Manage incoming orders

Orders
User order history: /my-orders

Confirmation page after placing an order: /order-placed

🤝 Contributing
Fork the repo

Create a new branch (git checkout -b feature/thing)

Make your changes and commit

Push and open a pull request

📄 License
This project does not currently specify a license. All rights reserved.
