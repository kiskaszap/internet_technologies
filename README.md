# University of Glasgow Student Marketplace

Full Stack Web Application developed as part of the *Internet Technologies* course at the University of Glasgow.

---

##  Project Background

This full-stack web application enables students and staff of the University of Glasgow to securely buy and sell goods within the university community.

The system implements:

- University email-based authentication
- JSON Web Token (JWT) security
- Secure CRUD operations
- Accessibility best practices
- Sustainability and performance optimisation principles

---

##  System Architecture

### Front-End

- React (via Vite)
- React Router
- Axios (centralised API instance with JWT token interceptor)
- Tailwind CSS
- React Toastify

### Back-End

- Django 5
- Django REST Framework
- SimpleJWT
- Custom User Model
- OTP (One-Time Password) Email Verification
- SQLite (development environment)

---

##  Authentication & Security

### Secure Authentication Flow

#### Registration Process

1. Users register with a valid University of Glasgow email address.
2. A 6-digit OTP is sent via email.
3. Account activation only occurs after successful OTP validation.
4. JWT tokens are generated for authenticated users.
5. Owner-based permission control enforces secure CRUD operations.

### Additional Security Features

- Custom user model
- Object-level permissions
- Server-side filtering via `?my=true`
- OTP expiration time of 10 minutes
- Edit/delete protection restricted to owners
- JWT access and refresh tokens
- Centralised Axios token injection
- Protection against user spoofing (read-only serializer enforcement)

---

##  Accessibility Implementation

The accessibility plan developed during the design phase was implemented and tested.

### Pages Tested

- Home Page
- Create Listing Page

### Accessibility Improvements Implemented

- Semantic HTML structure (`section`, proper heading hierarchy)
- Label-input relationships using `htmlFor`
- Required field indicators
- Focus styles (e.g., `focus:ring`)
- ARIA roles where appropriate
- Keyboard-accessible buttons and links
- Accessible form validation
- `alt` attributes for all images
- Improved colour contrast

---

##  Sustainability & Performance Optimisation

Google Lighthouse was used to evaluate sustainability-related performance.

### Pages Tested

- Home Page
- Listing Details Page

---

### Initial Scores (Before Optimisation)

**Performance Score (Mobile):** 44–71%

#### Identified Issues

- Large image file sizes
- Images not optimised
- Excessive JavaScript payload
- No lazy loading of non-critical images
- Missing `robots.txt`

---

### Improvements Implemented

- Banner image converted to WebP format
- `loading="lazy"` added to non-critical images
- `decoding="async"` attribute applied
- Explicit width/height attributes added (prevent layout shift)
- Reduced unnecessary API calls (server-side filtering)
- Skeleton loaders implemented (improves perceived performance)
- Nested anchor tags removed
- `robots.txt` file added
- Lighthouse SEO warnings addressed
- URL routing structure optimised
- Centralised Axios instance implemented (avoids duplicate config)

---

### Final Scores (After Optimisation)

**Performance Score (Desktop):** > 90%

### Major Improvements Observed In

- Largest Contentful Paint (LCP)
- Total Blocking Time (TBT)
- Cumulative Layout Shift (CLS)
- Image loading efficiency
- Overall page weight reduction

---

##  Conclusion

The most significant sustainability-related performance improvements were achieved through:

- Image optimisation
- Lazy loading
- Reduction of unnecessary API requests
- Elimination of redundant HTML structure

These optimisations substantially improved Lighthouse performance metrics while maintaining usability and security.

## Project Structure 
internet_technologies/
│
├── backend/
│   ├── backend/                 # Django project configuration
│   ├── marketplace/             # Main Django app
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── admin.py
│   │
│   ├── media/                   # Uploaded images
│   ├── manage.py
│   ├── db.sqlite3               # Development database
│   └── .env                     # Environment variables
│
├── uofg-marketplace-frontend/
│   ├── public/
│   │   └── robots.txt
│   │
│   ├── src/
│   │   ├── api/                 # Axios instance (JWT interceptor)
│   │   ├── assets/              # Images (WebP optimised banner)
│   │   ├── components/          # Reusable UI components
│   │   ├── context/             # AuthContext (global auth state)
│   │   ├── layouts/             # Main layout wrapper
│   │   ├── pages/               # Application pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   └── eslint.config.js
│
└── README.md

## Setup instructions
### Backend

cd backend
python -m venv venv
venv\Scripts\activate   (Windows)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


### Create .env file
SECRET_KEY=
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=

### Frontend
cd uofg-marketplace-frontend
npm install
npm run dev

## API endpoints

| Endpoint           | Description       |
| ------------------ | ----------------- |
| /categories/       | List categories   |
| /listings/         | List all listings |
| /listings/?my=true | User’s listings   |
| /comments/         | Listing comments  |
| /register/         | Create account    |
| /verify-otp/       | Verify email      |
| /token/            | JWT login         |


## Design Decisions

- Custom User model for extensibility
- Nested serializers to reduce frontend API calls
- Server-side filtering for performance
- JWT for stateless SPA authentication
- OTP activation for identity assurance
- Centralised API instance in frontend
- Layout-based routing for consistency


## Production Considerations

For production deployment:

- Move `SECRET_KEY` and email credentials to environment variables
- Disable `DEBUG`
- Restrict CORS origins
- Replace SQLite with PostgreSQL
- Use secure email backend
- Enable HTTPS


## Academic Objectives Covered

- Full-stack architecture
- Authentication and authorisation
- REST API design
- Accessibility implementation
- Sustainability evaluation and optimisation
- Performance improvement analysis
- Secure coding practices
