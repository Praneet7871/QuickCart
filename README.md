# QuickCart

QuickCart is an e-commerce platform built with Next.js, designed to provide a seamless shopping experience for users and a robust dashboard for sellers.

## Features and Functionality

*   **Product Catalog:** Browse a wide variety of products across different categories.
*   **Shopping Cart:** Add, update, and remove items from your cart.
*   **User Authentication:** Secure user accounts managed by Clerk.
*   **Seller Dashboard:** Dedicated interface for sellers to add and manage their products.
*   **Order Management:** Users can view their order history, and sellers can manage incoming orders.
*   **Image Uploads:** Sellers can upload multiple images for their products using Cloudinary.
*   **Address Management:** Users can add and select shipping addresses.
*   **Payment Processing:** (Note: The current implementation indicates COD "Cash on Delivery" and pending payments, a full payment gateway integration is expected for a production environment).
*   **Event Driven Architecture:** Order creation events are handled using Inngest to manage the creation of orders and clear the user cart.

## Technology Stack

*   **Frontend:**
    *   Next.js
    *   React
    *   Tailwind CSS
    *   Clerk (for authentication)
    *   react-hot-toast (for notifications)
*   **Backend:**
    *   Node.js
    *   Next.js API routes
    *   Mongoose (for MongoDB interaction)
    *   Cloudinary (for image storage)
    *   Inngest (for event queue)
*   **Database:**
    *   MongoDB

## Prerequisites

Before you begin, ensure you have the following installed:

*   Node.js (version 18 or higher)
*   npm or yarn
*   MongoDB
*   Clerk account
*   Cloudinary account
*   Inngest Account

Also ensure to create a `.env.local` file in the root directory, and add the following environment variables:

```
MONGODB_URI=<Your MongoDB Connection String>
CLERK_SECRET_KEY=<Your Clerk Secret Key>
CLERK_PUBLISHABLE_KEY=<Your Clerk Publishable Key>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
CLOUDINARY_API_KEY=<Your Cloudinary API Key>
CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
NEXT_PUBLIC_CURRENCY=$
INNGEST_SIGNING_KEY=<Your Inngest Signing Key>
```

## Installation Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Praneet7871/QuickCart.git
    cd QuickCart
    ```

2.  **Install dependencies:**

    ```bash
    npm install # or yarn install
    ```

3.  **Set up your `.env.local` file:**

    Create a `.env.local` file in the root of your project and populate it with the required environment variables (see Prerequisites section above).

4.  **Connect to MongoDB:**

    Ensure your MongoDB instance is running and accessible. Update the `MONGODB_URI` in your `.env.local` file accordingly.

5.  **Run the development server:**

    ```bash
    npm run dev # or yarn dev
    ```

    This will start the Next.js development server, usually on `http://localhost:3000`.

## Usage Guide

1.  **Access the application:**

    Open your web browser and navigate to `http://localhost:3000` (or the port your development server is running on).

2.  **User Authentication:**

    *   Click on the "Account" icon in the navigation bar to sign in or sign up.
    *   You'll be redirected to Clerk's authentication pages.

3.  **Browsing Products:**

    *   The homepage displays featured products and popular categories.
    *   Click on "Shop" in the navigation bar to view all products (`/all-products`).
    *   Click on a product card to view detailed information (`/product/[id]`).

4.  **Adding to Cart:**

    *   On the product details page, click "Add to Cart" to add the product to your cart.
    *   Click "Buy now" to add the product to your cart and navigate to `/cart`.
    *   From `/all-products`, click "Buy Now" on a product to go directly to the product's details page.

5.  **Viewing and Modifying Cart:**

    *   Click on the cart icon in the top right to view your cart (`/cart`).
    *   Update the quantity of items in your cart using the "+" and "-" buttons or directly entering the value.
    *   Click "Remove" to remove an item from your cart.

6.  **Seller Dashboard:**

    *   If you have been assigned the "seller" role, a "Seller Dashboard" button will appear in the navigation bar.
    *   Click this button to access the seller dashboard (`/seller`).
    *   Sellers can add new products (`/seller`), view their product list (`/seller/product-list`), and manage orders (`/seller/orders`).

7.  **Placing an Order:**
    *   Go to the cart page(`/cart`).
    *   Select a shipping address from the dropdown or add a new one by clicking "+ Add New Address" (navigates to `/add-address`).
    *   Click "Place Order" to submit your order.
    *   You'll be redirected to an order confirmation page (`/order-placed`) and then to your order history (`/my-orders`).

## API Documentation

The application uses Next.js API routes for backend functionality. Here's a brief overview:

*   `/api/cart/get`: Retrieves the user's cart items. Requires authentication.
*   `/api/cart/update`: Updates the user's cart items. Requires authentication.
*   `/api/order/create`: Creates a new order. Requires authentication.
*   `/api/order/list`: Lists the user's orders. Requires authentication.
*   `/api/order/seller-orders`: Lists all orders (accessible only to sellers). Requires authentication and seller role.
*   `/api/product/add`: Adds a new product (accessible only to sellers). Requires authentication and seller role.
*   `/api/product/list`: Lists all products.
*   `/api/product/seller-list`: Lists all products (accessible only to sellers). Requires authentication and seller role.
*   `/api/user/data`: Retrieves user data. Requires authentication.

**Authentication:**

Most API endpoints require authentication via Clerk. The JWT token is passed in the `Authorization` header as `Bearer <token>`.

**Example: Fetching User Data**

```javascript
import axios from 'axios';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(request) {
  const { userId } = getAuth(request);
  try {
    const token = await getToken();
    const { data } = await axios.get('/api/user/data', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
```

## Contributing Guidelines

Contributions are welcome! Please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive commit messages.
4.  Test your changes thoroughly.
5.  Submit a pull request with a clear description of your changes.

## License Information

This project does not specify a license. All rights are reserved.

## Contact/Support Information

For any questions or support requests, please contact [Praneet7871](https://github.com/Praneet7871).