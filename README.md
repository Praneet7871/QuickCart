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


MONGODB_URI=<your MongoDB URI>

CLERK_SECRET_KEY=<your Clerk Secret Key>
CLERK_PUBLISHABLE_KEY=<your Clerk Publishable Key>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

CLOUDINARY_CLOUD_NAME=<your Cloudinary cloud name>
CLOUDINARY_API_KEY=<your Cloudinary API key>
CLOUDINARY_API_SECRET=<your Cloudinary API secret>

NEXT_PUBLIC_CURRENCY=$

INNGEST_SIGNING_KEY=<your Inngest key>
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

📦 API Endpoints
QuickCart uses Next.js API routes with Clerk auth.

🔐 Auth Required
Route	Description
GET /api/cart/get	Get user's cart
POST /api/cart/update	Update cart items
POST /api/order/create	Place an order
GET /api/order/list	User order history
GET /api/order/seller-orders	Seller view of all their orders
POST /api/product/add	Add product (Seller only)
GET /api/product/list	All products
GET /api/product/seller-list	Seller's products
GET /api/user/data	Get user info

Example: Fetching user data with token
js
Copy
Edit
import axios from 'axios';

const token = await getToken(); // Clerk auth token

const { data } = await axios.get('/api/user/data', {
  headers: {
    Authorization: Bearer ${token},
  },
});
🤝 Contributing
Fork the repo

Create a new branch (git checkout -b feature/thing)

Make your changes and commit

Push and open a pull request

📄 License
This project does not currently specify a license. All rights reserved.

🧩 Need Help?
Open an issue or contact Praneet7871 directly.

css
Copy
Edit

Let me know if you want a logo/banner, license, badges (like Vercel deploy status or GitHub stars), or 
