# 🏠 FindMyNest

**FindMyNest** is a full-stack web platform that helps people find rooms, PGs, and hostels for **daily or monthly stays**. It bridges the gap for students, employees, and travelers who are new to a city and need a safe, convenient place to stay — without the hassle of traditional accommodation hunting.

---

## 📌 Features

### For Tenants
- Browse and search rooms, PGs, hostels, apartments, and studios
- Filter by city, type, price range, stay type, gender preference, and amenities
- View detailed listing pages with image gallery, amenities, pricing, and owner info
- Book properties with a step-by-step booking wizard (daily or monthly stay)
- Manage bookings from a personal dashboard (view, cancel)
- Write reviews with star ratings after a completed stay

### For Property Owners
- List properties with photos, description, amenities, pricing, and availability
- Manage all listings from an owner dashboard
- View and respond to booking requests (confirm / decline)
- Track booking counts and pending requests at a glance

### General
- JWT-based authentication (login, register, logout)
- Role-based access control: `tenant`, `owner`, `admin`
- Responsive design — works on mobile, tablet, and desktop
- Toast notifications for all key actions
- Secure API with rate limiting, helmet, XSS protection, and mongo sanitization

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 17, React Router v5, Axios, React Toastify, React Datepicker, React Icons, date-fns |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Auth** | JSON Web Tokens (JWT), bcryptjs |
| **Security** | Helmet, xss-clean, express-mongo-sanitize, express-rate-limit |
| **Dev Tools** | Nodemon, Concurrently, dotenv |

---

## 📁 Project Structure

```
find_my_nest/
├── config/
│   ├── config.env          # Environment variables (not committed)
│   └── db.js               # MongoDB connection
├── controllers/
│   ├── auth.js             # Register, login, logout, getMe, updateDetails, updatePassword
│   ├── listings.js         # CRUD + search + getMyListings
│   ├── bookings.js         # Create, get, update status, cancel bookings
│   ├── reviews.js          # Add/get/delete reviews, auto-calculates average rating
│   └── users.js            # Admin user management
├── middleware/
│   ├── auth.js             # protect (JWT verify) + authorize (role check)
│   ├── error.js            # Global error handler
│   └── async.js            # Async/await wrapper
├── models/
│   ├── User.js             # name, email, password, phone, role, avatar
│   ├── Listing.js          # title, type, stayType, pricing, amenities, location
│   ├── Booking.js          # tenant, listing, dates, stayType, guests, status
│   └── Review.js           # rating, title, text → auto-updates listing averageRating
├── routes/
│   ├── auth.js             # /api/v1/auth
│   ├── listings.js         # /api/v1/listings
│   ├── bookings.js         # /api/v1/bookings
│   ├── reviews.js          # /api/v1/listings/:listingId/reviews
│   └── user.js             # /api/v1/users (admin only)
├── utils/
│   └── errorResponse.js    # Custom error class
├── client/                 # React frontend (Create React App)
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   └── src/
│       ├── context/
│       │   └── AuthContext.js      # Global auth state (login/register/logout)
│       ├── components/
│       │   ├── Navbar.js           # Responsive nav with user dropdown
│       │   ├── ListingCard.js      # Property grid card
│       │   ├── BookingForm.js      # Inline booking form on listing detail
│       │   ├── ReviewList.js       # Star rating input + review display
│       │   ├── SearchBar.js        # Keyword / city / type / stay-type search
│       │   └── PrivateRoute.js     # Role-based route guard
│       ├── pages/
│       │   ├── Home.js             # Hero, categories, featured listings, how-it-works
│       │   ├── Listings.js         # Browse with sidebar filters + pagination
│       │   ├── ListingDetail.js    # Full detail page + gallery + booking form
│       │   ├── BookingPage.js      # 2-step booking wizard (select dates → confirm)
│       │   ├── TenantDashboard.js  # Tenant bookings + profile
│       │   ├── OwnerDashboard.js   # Owner listings + booking management
│       │   ├── CreateListing.js    # New listing form
│       │   ├── EditListing.js      # Edit existing listing
│       │   ├── Login.js            # Sign-in form
│       │   ├── Register.js         # Sign-up with tenant/owner role selection
│       │   └── NotFound.js         # 404 page
│       ├── utils/
│       │   └── api.js              # Axios instance (baseURL + error interceptor)
│       ├── App.js                  # Router with all routes
│       ├── index.js                # Entry point with AuthProvider + ToastContainer
│       └── index.css               # Global stylesheet (CSS variables, responsive)
├── server.js               # Express app entry point
├── package.json            # Backend dependencies + run scripts
└── .gitignore
```

---

## 🔌 API Endpoints

### Auth — `/api/v1/auth`
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/register` | Public | Register new user |
| POST | `/login` | Public | Login and receive JWT |
| GET | `/logout` | Private | Logout (clears cookie) |
| GET | `/me` | Private | Get logged-in user |
| PUT | `/updatedetails` | Private | Update name/email/phone |
| PUT | `/updatepassword` | Private | Change password |

### Listings — `/api/v1/listings`
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/` | Public | Get all listings (filter, sort, paginate) |
| GET | `/search` | Public | Full-text search with filters |
| GET | `/my` | Owner | Get owner's own listings |
| GET | `/:id` | Public | Get single listing |
| POST | `/` | Owner | Create new listing |
| PUT | `/:id` | Owner | Update listing |
| DELETE | `/:id` | Owner | Delete listing |

### Bookings — `/api/v1/bookings`
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/` | Private | Get bookings (tenant: own, owner: for their listings) |
| POST | `/` | Tenant | Create booking request |
| PUT | `/:id` | Private | Update booking status (owner confirms/declines) |
| DELETE | `/:id` | Private | Cancel booking |

### Reviews — `/api/v1/listings/:listingId/reviews`
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/` | Public | Get all reviews for a listing |
| POST | `/` | Tenant | Add a review |
| DELETE | `/:id` | Private | Delete own review |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v14+
- npm v6+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/find_my_nest.git
cd find_my_nest
```

### 2. Configure environment variables
Create `config/config.env`:
```env
NODE_ENV=development
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

CLIENT_URL=http://localhost:3000
```

### 3. Install dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
npm install --prefix client
```

### 4. Run the application
```bash
# Run both backend and frontend concurrently
npm run dev
```

- Backend API: `http://localhost:5000/api/v1`
- React Frontend: `http://localhost:3000`

### Production build
```bash
npm run build --prefix client
npm start
```

---

## 👥 User Roles

| Role | Permissions |
|---|---|
| `tenant` | Browse listings, make bookings, write reviews |
| `owner` | All tenant permissions + create/edit/delete own listings, manage booking requests |
| `admin` | Full access to all users and listings |

---

## 🏗 Data Models

### Listing
- **Types:** room, hostel, PG, apartment, studio
- **Stay Types:** daily, monthly (or both)
- **Amenities:** wifi, AC, parking, meals, gym, laundry, geyser, security, furnished, and more
- **Gender Preference:** any, male only, female only
- Auto-calculates `averageRating` and `reviewCount` from reviews

### Booking
- Linked to a listing and tenant
- Status lifecycle: `pending` → `confirmed` / `cancelled` / `completed`
- Stores check-in/check-out dates, number of guests, total price

---

## 📄 License

ISC © Pavan Kusunuri

