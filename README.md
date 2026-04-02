# 🌍 Premium Travel Agency Application

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)

A full-stack, production-ready Travel Agency booking application built with Node.js, Express, and MongoDB. The project leverages a high-end, bespoke **Glassmorphism Design System** featuring native CSS animations, rigorous backend seat validation, and a realistic simulated payment funnel.

---

## ✨ Key Features

- **BookMyShow-Style Seat Matrix**: Intuitive seat grid selection UI equipped with row labels and real-time available/booked rendering.
- **Premium Checkout Simulation**: A realistic Stripe-like payment page with synchronized credit card preview, floating labels, loading spinners, and CSS Confetti.
- **Dynamic Boarding Passes**: Automatically generates responsive printable travel receipts paired with mock API-rendered QR Codes upon success.
- **Bulletproof Backend Locking**: Strict backend validation rules to inherently prevent double-bookings regardless of front-end timing collisions.
- **Modern UI Architecture**: Uses Glassmorphism, Neumorphic shadows, native CSS staggering animations, and a local-storage synchronized Dark Mode.
- **Analytics Dashboard**: Custom Admin dashboard displaying revenue metrics (₹), active package counts, and deep booking management.

---

## 🛠️ Technology Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Frontend Template Engine:** EJS
- **Styling:** Vanilla CSS (CSS Variables, Flexbox, CSS Grid)
- **Authentication:** Express-Session, bcrypt.js
- **Environment Management:** dotenv, dotenvx

---

## 📂 Folder Structure

```text
Travel-Agency/
│
├── config/
│   └── db.js                   # MongoDB connection logic
├── controllers/
│   ├── adminController.js      # Package management & Analytics logic
│   ├── authController.js       # Signup, Login, Password hashing
│   └── userController.js       # Core booking, payment, receipt routing
│
├── middleware/
│   ├── authMiddleware.js       # Role-based route protection
│   └── errorMiddleware.js      # Global error handling
│
├── models/
│   ├── Booking.js              # Booking schema (`paymentStatus`, `selectedSeats`)
│   ├── TravelPackage.js        # Package schema (`availableSeats`, `totalSeats`)
│   └── User.js                 # User schema (`role`, `email`, password hook)
│
├── public/                     # Static assets
│   ├── css/
│   │   └── style.css           # Global Design System, Glassmorphism, Keyframes
│   └── js/
│       ├── seatSelection.js    # Client-side seat matrix logic
│       └── themeToggle.js      # Dark Mode persistence logic
│
├── routes/
│   ├── adminRoutes.js          # /admin/* router
│   ├── authRoutes.js           # /login, /signup router
│   └── userRoutes.js           # /book, /payment, /receipt router
│
├── views/                      # EJS Frontend Templates
│   ├── admin/
│   │   ├── add-package.ejs
│   │   └── dashboard.ejs       # Revenue & Booking tables
│   ├── pages/
│   │   ├── home.ejs
│   │   ├── landing.ejs         # High-end Hero Video layout
│   │   ├── login.ejs
│   │   ├── my-bookings.ejs
│   │   ├── package-details.ejs # Seat Selection wrapper
│   │   ├── payment.ejs         # Stripe-Emulation & Confetti
│   │   ├── receipt.ejs         # Printable ticket & QR Generation
│   │   └── signup.ejs
│   ├── partials/               # Reusable Components (Navbar, Footer, Flash)
│   └── error.ejs
│
├── app.js                      # Main Server entry point
├── seed.js                     # Utility script to inject demo DB data (₹)
└── .env                        # Environment variables (Mongo URI, Port, Secret)
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URI)

### 2. Installation Let's Setup
Clone the repository and install dependencies:
```bash
git clone https://github.com/Atharva7652005/Travel-Agency.git
cd Travel-Agency
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory (already injected if using dotenvx):
```env
PORT=3000
MONGO_URI=mongodb+srv://<your_cluster_uri>
SESSION_SECRET=your_secure_random_string_here
```

### 4. Seed the Database
To populate the database with an Admin account, a Test User account, and 7 gorgeous Indian Travel Packages, run:
```bash
npm run seed
```
**Login Credentials after Seeding:**
- Admin: `admin@example.com` / `password123`
- User: `john@example.com` / `password123`

### 5. Start the Server
For development with Nodemon hot-reloading:
```bash
npm run dev
```
For standard production execution:
```bash
npm start
```

Access the application via your browser at: `http://localhost:3000`

---
*Built with passion, robust backend checks, and a pixel-perfect design system.*
