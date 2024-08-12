# PlayShop
PlayShop is a full-stack e-commerce platform built using the MERN stack. This application allows users to browse products, add them to their cart, and make purchases securely. Admin users can manage products, orders, and users through a dedicated admin dashboard.

## Features
- User Authentication: Secure user registration and login with JWT-based authentication. Supports both regular users and admin roles.
- Product Management: Users can browse products, view product details, and search for products. Admins can create, update, and delete products.
- Cart and Checkout: Users can add products to their cart, adjust quantities, and proceed to checkout. Integration with PayPal for secure payments.
- Order Management: Users can view their order history. Admins can manage all orders, including updating order statuses.
- Admin Dashboard: Admins have access to additional features like managing users and viewing top products.
- Responsive Design: The application is fully responsive and works well on both desktop and mobile devices.
## Technologies Used
- Frontend: React, Redux Toolkit, Tailwind CSS
- Backend: Node.js, Express, MongoDB
- Authentication: JSON Web Tokens (JWT), HTTP-only cookies
- Payment Integration: PayPal
## Installation
### Prerequisites
- Node.js
- MongoDB
### Clone the Repository
`bash`
```
git clone https://github.com/yourusername/playshop.git
cd playshop
```
### Backend Setup<br/>
Navigate to the backend directory.<br/>
Create a .env file and add the following environment variables:<br/>
`plaintext`
```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
REACT_APP_FRONTEND_URL=https://playshoponline.onrender.com
```
### Install dependencies and start the server:
`bash`
```
npm install
npm run dev
```
### Frontend Setup<br/>
Navigate to the frontend directory.<br/>
Install dependencies and start the development server:<br/>
`bash`
```
npm install
npm start
```
## Running the Application
- The backend server will run on http://localhost:5000.
- The frontend will run on http://localhost:3000.

## Usage
- Register a new account or log in with an existing one.
- Browse products and add them to your cart.
- Proceed to checkout and complete the payment via PayPal.
- Admin users can manage products, orders, and users from the admin dashboard.

### Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

### License
This project is licensed under the MIT License.

