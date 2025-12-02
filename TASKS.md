# Project Tasks & Roadmap

## ✅ STAGE 0: Foundation & Architecture (COMPLETED)

### Project Setup

- [x] **Project Initialization:** Setup Monorepo structure (Client/Server)
- [x] **Tech Stack:** Install React (Vite), Tailwind, Express, TypeScript
- [x] **Database Design:** Create ER Diagram logic and SQL Schema (`schema.sql`)
- [x] **Database Seeding:** Create initial test data (`seeds.sql`)
- [x] **DB Connection:** Implement `db.ts` with MySQL connection pool
- [x] **Basic API:** Create `/api/genres` endpoint (GET)
- [x] **Frontend Connection:** Fetch and display Genres in React
- [x] **UI Modernization:** Implement Dark Mode, Blur Navbar, and Card designs
- [x] **Documentation:** Create comprehensive README, SETUP, PLANNING guides

### Architecture Refactoring

- [x] **Client Structure:** Implement Feature-Based architecture (`features/catalog`)
- [x] **Server Structure:** Implement Layered architecture (Controller/Service)
- [x] **Code Organization:** Cleanup root directories
- [x] **TypeScript:** Strict type checking across entire codebase
- [x] **Error Handling:** Global error handler middleware

---

## 🔥 STAGE 1: Catalog Foundation (CURRENT - DUE: Week 4)

### University Requirements for Stage 1

> Catalog display, Departments (Genres), Categories (Sub-Genres), Products (Tracks), Search, Administration

### 1.1 Database Expansion

- [ ] **Expand Seed Data:**
  - [ ] Add more genres (minimum 3 total): Electronic ✅, Cinematic ✅, Urban ✅, + Add Hip-Hop, Rock
  - [ ] Add more sub-genres (minimum 3 per genre): Currently 5 total → Need 15+ total
  - [ ] Add more tracks (minimum 8-10 per sub-genre): Currently 2 total → Need 120+ total
- [ ] **Create Additional Stored Procedures:**
  - [ ] `GetTracksBySubGenre(subGenreId INT)` - Returns tracks for a sub-genre
  - [ ] `SearchTracks(keyword VARCHAR, genreId INT, minBpm INT, maxBpm INT)` - Advanced search
  - [ ] `GetTrackById(trackId INT)` - Single track details with all joins

### 1.2 Backend API Development

- [ ] **Sub-Genre Endpoints:**
  - [ ] `GET /api/genres/:genreId/sub-genres` - Get all sub-genres for a genre
  - [ ] `GET /api/sub-genres/:id` - Get single sub-genre details
  - [ ] Create `sub-genre.controller.ts`, `sub-genre.service.ts`
- [ ] **Track Endpoints:**
  - [ ] `GET /api/tracks` - Get all tracks (with pagination, filters)
  - [ ] `GET /api/tracks/:id` - Get single track details
  - [ ] `GET /api/genres/:genreId/tracks` - Get all tracks in a genre
  - [ ] `GET /api/sub-genres/:subGenreId/tracks` - Get all tracks in a sub-genre
  - [ ] Complete `track.controller.ts`, `track.service.ts`
- [ ] **Search Endpoint:**
  - [ ] `GET /api/search?q=keyword&genre=X&bpm=120-140` - Search tracks
  - [ ] Create `search.controller.ts`, `search.service.ts`

### 1.3 Frontend Catalog Pages

- [ ] **Genre Detail Page:**
  - [ ] Create `/genres/:slug` route
  - [ ] Display genre info and sub-genre grid
  - [ ] Create `GenreDetailPage.tsx`
- [ ] **Sub-Genre Page:**
  - [ ] Create `/genres/:genreSlug/:subGenreSlug` route
  - [ ] Display track listing for sub-genre
  - [ ] Create `SubGenrePage.tsx`
- [ ] **Track Components:**
  - [ ] Create `TrackCard.tsx` - Display track with cover, title, artist, BPM, duration
  - [ ] Create `TrackList.tsx` - Grid/list view of tracks
  - [ ] Create `TrackDetail.tsx` - Full track page with pricing tiers
- [ ] **Browse/Catalog Page:**
  - [ ] Create `/catalog` route
  - [ ] Show all genres and featured tracks
  - [ ] Create `CatalogPage.tsx`

### 1.4 Search Functionality

- [ ] **Search UI:**
  - [ ] Enhance existing `SearchOverlay.tsx` component
  - [ ] Add filters (genre, BPM range, price range)
  - [ ] Add search results display
  - [ ] Create `SearchResults.tsx` component
- [ ] **Search Logic:**
  - [ ] Create `useSearch.ts` custom hook
  - [ ] Implement debounced search
  - [ ] Add search history (localStorage)

### 1.5 Admin Panel - Catalog Management

- [ ] **Admin Authentication:**
  - [ ] Create basic admin login (hardcoded credentials for now)
  - [ ] Create `/admin/login` page
  - [ ] Admin route protection
- [ ] **Genre Management:**
  - [ ] Create `GET/POST/PUT/DELETE /api/admin/genres` endpoints
  - [ ] Create admin genres CRUD UI (`/admin/genres`)
  - [ ] Create `GenreForm.tsx`, `GenreList.tsx`
- [ ] **Sub-Genre Management:**
  - [ ] Create `GET/POST/PUT/DELETE /api/admin/sub-genres` endpoints
  - [ ] Create admin sub-genres CRUD UI (`/admin/sub-genres`)
  - [ ] Create `SubGenreForm.tsx`, `SubGenreList.tsx`
- [ ] **Track Management:**
  - [ ] Create `GET/POST/PUT/DELETE /api/admin/tracks` endpoints
  - [ ] Create admin tracks CRUD UI (`/admin/tracks`)
  - [ ] Create `TrackForm.tsx` (multi-step form with metadata)
  - [ ] Create `TrackListAdmin.tsx`
- [ ] **Admin Dashboard:**
  - [ ] Create `/admin` dashboard page
  - [ ] Show stats (total genres, sub-genres, tracks)
  - [ ] Create `AdminDashboard.tsx`

### 1.6 Stage 1 Documentation

- [ ] **UML Diagrams:**
  - [ ] Create Use Case Diagram (Customer browse, Admin manage catalog)
  - [ ] Create Class Diagram (Genre, SubGenre, Track entities)
  - [ ] Create ER Diagram (Database schema visualization)
- [ ] **Written Documentation:**
  - [ ] Project description (business concept)
  - [ ] System architecture (3-tier detailed explanation)
  - [ ] E-business description (value proposition, target market)
  - [ ] Functionality description (catalog features)
  - [ ] Database description (table counts, relationships)
  - [ ] Stage 1 implementation details
- [ ] **Screenshots:**
  - [ ] Homepage with genres
  - [ ] Genre detail page with sub-genres
  - [ ] Track listing page
  - [ ] Search functionality
  - [ ] Admin panel

---

## 🛒 STAGE 2: Shopping Cart & Recommendations (DUE: Week 8)

### University Requirements for Stage 2

> Shopping cart implementation, Local DB storage, Cart editing, Order processing, Recommendation system

### 2.1 Database Updates

- [ ] **Add Cart Tables:**
  - [ ] Create `cart_items` table (if not exists)
  - [ ] Add indexes for performance
- [ ] **Add Orders Tables:**
  - [ ] Create `orders` table
  - [ ] Create `order_items` table
  - [ ] Add foreign keys and constraints
- [ ] **Stored Procedures:**
  - [ ] `AddToCart(userId INT, trackId INT, licenseType VARCHAR)` - Add item to cart
  - [ ] `RemoveFromCart(cartItemId INT)` - Remove item from cart
  - [ ] `GetCartItems(userId INT)` - Get all cart items for user
  - [ ] `ClearCart(userId INT)` - Empty cart after order
  - [ ] `CreateOrderFromCart(userId INT, OUT orderId INT)` - Convert cart to order
  - [ ] `GetRecommendations(trackId INT, limit INT)` - Recommend similar tracks

### 2.2 User Authentication (Basic)

- [ ] **Backend Auth:**
  - [ ] Install bcrypt, jsonwebtoken packages
  - [ ] Create `POST /api/auth/register` - User registration
  - [ ] Create `POST /api/auth/login` - User login (returns JWT)
  - [ ] Create `auth.middleware.ts` - JWT verification
  - [ ] Create `auth.service.ts` - Password hashing, token generation
- [ ] **Frontend Auth:**
  - [ ] Create `AuthContext` for global auth state
  - [ ] Create `LoginPage.tsx` and `RegisterPage.tsx`
  - [ ] Create `useAuth.ts` hook
  - [ ] Store JWT in localStorage
  - [ ] Add auth header to API requests

### 2.3 Shopping Cart Implementation

- [ ] **Backend Cart Endpoints:**
  - [ ] `GET /api/cart` - Get current user's cart items
  - [ ] `POST /api/cart` - Add item to cart
  - [ ] `PUT /api/cart/:itemId` - Update cart item (change license type)
  - [ ] `DELETE /api/cart/:itemId` - Remove item from cart
  - [ ] `DELETE /api/cart` - Clear entire cart
  - [ ] Create `cart.controller.ts`, `cart.service.ts`
- [ ] **Frontend Cart UI:**
  - [ ] Create `CartContext` (state: items, total, count)
  - [ ] Create `useCart.ts` hook (add, remove, update, clear)
  - [ ] Create `CartSlideOver.tsx` - Slide-in panel from right
  - [ ] Create `CartItem.tsx` - Individual cart item component
  - [ ] Create `CartSummary.tsx` - Total price breakdown
  - [ ] Add "Add to Cart" buttons on track cards
  - [ ] Add cart icon with item count in Navbar

### 2.4 Order Processing (Basic)

- [ ] **Backend Order Endpoints:**
  - [ ] `POST /api/orders` - Create order from cart
  - [ ] `GET /api/orders` - Get user's order history
  - [ ] `GET /api/orders/:id` - Get single order details
  - [ ] Create `order.controller.ts`, `order.service.ts`
- [ ] **Frontend Order Pages:**
  - [ ] Create `/checkout` page (order review before payment)
  - [ ] Create `CheckoutPage.tsx`
  - [ ] Create `OrderSummary.tsx` component
  - [ ] Create `/orders` page (order history)
  - [ ] Create `OrderHistory.tsx`
  - [ ] Create `OrderDetails.tsx` page (`/orders/:id`)

### 2.5 Recommendation System

- [ ] **Backend Recommendation Logic:**
  - [ ] Create recommendation algorithm (based on genre + BPM similarity)
  - [ ] Create `GET /api/tracks/:id/recommendations` endpoint
  - [ ] Create `recommendation.service.ts`
- [ ] **Frontend Recommendations UI:**
  - [ ] Create `RecommendedTracks.tsx` component
  - [ ] Add "Similar Tracks" section on track detail page
  - [ ] Add "You Might Like" section on homepage
  - [ ] Create `useRecommendations.ts` hook

### 2.6 Stage 2 Documentation

- [ ] **UML Diagrams:**
  - [ ] Update Use Case Diagram (add cart, checkout flows)
  - [ ] Create Sequence Diagram (Add to Cart, Checkout process)
  - [ ] Create Activity Diagram (Shopping flow from browse → cart → order)
- [ ] **Written Documentation:**
  - [ ] Update all Stage 1 documentation with feedback
  - [ ] Stage 2 implementation description
  - [ ] Shopping cart technical details
  - [ ] Order processing workflow
  - [ ] Recommendation algorithm explanation
- [ ] **Screenshots:**
  - [ ] Cart slide-over with items
  - [ ] Checkout page
  - [ ] Order confirmation
  - [ ] Order history page
  - [ ] Recommendations display

---

## 💳 STAGE 3: User Accounts & Payment Processing (DUE: Week 12)

### University Requirements for Stage 3

> User accounts, Advanced order processing, Payment pipeline (card auth, inventory check, email notifications)

### 3.1 Database Finalization

- [ ] **Add Payment Tables:**
  - [ ] Create `payment_transactions` table
  - [ ] Add payment status tracking to orders
- [ ] **Add Inventory Tracking:**
  - [ ] Add `stock_quantity` to tracks (if not exists)
  - [ ] Add `download_limit` and `download_count` to order_items
- [ ] **Stored Procedures:**
  - [ ] `CheckInventory(trackId INT, quantity INT)` - Verify stock availability
  - [ ] `UpdateInventory(trackId INT, quantity INT)` - Decrement stock
  - [ ] `ProcessOrder(userId INT, paymentMethod VARCHAR, OUT orderId INT)` - Full order pipeline
  - [ ] `GenerateDownloadLinks(orderId INT)` - Create temporary download URLs

### 3.2 Enhanced User Account System

- [ ] **Backend User Endpoints:**
  - [ ] `GET /api/users/profile` - Get current user profile
  - [ ] `PUT /api/users/profile` - Update user profile
  - [ ] `PUT /api/users/password` - Change password
  - [ ] `GET /api/users/downloads` - Get purchased tracks
  - [ ] Create `user.controller.ts`, `user.service.ts`
- [ ] **Frontend User Pages:**
  - [ ] Create `/profile` page
  - [ ] Create `ProfilePage.tsx` (edit name, email, password)
  - [ ] Create `/my-library` page (purchased tracks)
  - [ ] Create `LibraryPage.tsx`
  - [ ] Add user dropdown menu in Navbar

### 3.3 Payment Integration

- [ ] **Choose Payment Provider:**
  - [ ] Research: Stripe vs PayPal vs Mock implementation
  - [ ] Install SDK (e.g., `@stripe/stripe-js`)
- [ ] **Backend Payment Endpoints:**
  - [ ] `POST /api/payments/create-intent` - Create payment intent (Stripe)
  - [ ] `POST /api/payments/confirm` - Confirm payment
  - [ ] `POST /api/webhooks/payment` - Handle payment webhooks
  - [ ] Create `payment.controller.ts`, `payment.service.ts`
- [ ] **Frontend Payment UI:**
  - [ ] Create `PaymentForm.tsx` (credit card input)
  - [ ] Integrate Stripe Elements or use mock form
  - [ ] Create `/checkout/payment` page
  - [ ] Create `PaymentPage.tsx`
  - [ ] Add loading states, error handling

### 3.4 Order Processing Pipeline

- [ ] **Implement Multi-Step Order Flow:**
  - [ ] Step 1: Cart Review
  - [ ] Step 2: Payment Processing
  - [ ] Step 3: Inventory Check (via stored procedure)
  - [ ] Step 4: Order Creation
  - [ ] Step 5: Download Link Generation
  - [ ] Step 6: Email Notification
- [ ] **Backend Pipeline Logic:**
  - [ ] Create transaction-based order processing
  - [ ] Implement rollback on failure
  - [ ] Add order status updates (pending → processing → completed/failed)
  - [ ] Create `orderPipeline.service.ts`

### 3.5 Email Notification System

- [ ] **Choose Email Service:**
  - [ ] Research: SendGrid vs Mailgun vs Nodemailer (SMTP)
  - [ ] Install SDK
- [ ] **Backend Email Service:**
  - [ ] Create `email.service.ts`
  - [ ] Implement `sendOrderConfirmation(orderId)` function
  - [ ] Implement `sendDownloadLinks(orderId)` function
  - [ ] Create email templates (HTML)
- [ ] **Email Triggers:**
  - [ ] Send on order creation
  - [ ] Send on payment success
  - [ ] Send download links after payment

### 3.6 Inventory Management

- [ ] **Backend Inventory Logic:**
  - [ ] Create `inventory.service.ts`
  - [ ] Implement stock checking before order creation
  - [ ] Implement stock decrementing after payment
  - [ ] Add low-stock alerts (admin)
- [ ] **Admin Inventory UI:**
  - [ ] Add stock quantity field to admin track form
  - [ ] Display stock levels in admin track list
  - [ ] Add bulk inventory update feature

### 3.7 Download System

- [ ] **Backend Download Endpoints:**
  - [ ] `GET /api/downloads/:orderId/:trackId` - Generate temporary download link
  - [ ] Implement signed URLs with expiration
  - [ ] Track download count per order item
  - [ ] Create `download.controller.ts`, `download.service.ts`
- [ ] **Frontend Download UI:**
  - [ ] Add download buttons in Library page
  - [ ] Add download buttons in Order details page
  - [ ] Show download limits (e.g., "3 downloads remaining")
  - [ ] Create `DownloadButton.tsx` component

### 3.8 Advanced Admin Features

- [ ] **Order Management:**
  - [ ] Create `GET /api/admin/orders` - List all orders
  - [ ] Create admin orders page (`/admin/orders`)
  - [ ] Add order status update (mark as shipped, refunded, etc.)
  - [ ] Create `OrderListAdmin.tsx`, `OrderDetailsAdmin.tsx`
- [ ] **User Management:**
  - [ ] Create `GET /api/admin/users` - List all users
  - [ ] Create admin users page (`/admin/users`)
  - [ ] Add ability to disable/enable users
  - [ ] Create `UserListAdmin.tsx`
- [ ] **Analytics Dashboard:**
  - [ ] Add sales metrics (total revenue, orders count)
  - [ ] Add popular tracks widget
  - [ ] Add recent orders widget
  - [ ] Update `AdminDashboard.tsx`

### 3.9 Stage 3 Documentation

- [ ] **UML Diagrams:**
  - [ ] Update all previous diagrams
  - [ ] Create State Diagram (Order states: Pending → Processing → Completed/Failed/Refunded)
  - [ ] Create Sequence Diagram (Payment & Order Pipeline flow)
  - [ ] Create Activity Diagram (Complete purchase flow with all checks)
- [ ] **Written Documentation:**
  - [ ] Update all Stage 1 & 2 documentation
  - [ ] Stored procedures detailed description
  - [ ] Stage 3 implementation (user accounts, payment, order pipeline)
  - [ ] **Innovation characteristics:**
    - [ ] Three-tier licensing model explanation
    - [ ] Digital rights management approach
    - [ ] Audio-specific metadata usage
  - [ ] **External system integrations:**
    - [ ] Payment gateway integration details
    - [ ] Email service integration details
    - [ ] (Future) Cloud storage integration plan
- [ ] **Screenshots:**
  - [ ] User profile page
  - [ ] Payment form
  - [ ] Order confirmation with download links
  - [ ] Email notification examples
  - [ ] Admin order management

---

## 🎨 STAGE 4: Polish, Testing & Final Documentation (DUE: Final Submission)

### 4.1 UI/UX Enhancements

- [ ] **Audio Player Implementation:**
  - [ ] Create global `PlayerContext`
  - [ ] Create `PlayerBar.tsx` component (sticky at bottom)
  - [ ] Implement play/pause, volume, progress bar
  - [ ] Add waveform visualization (optional)
  - [ ] Create `useAudioPlayer.ts` hook
- [ ] **Responsive Design:**
  - [ ] Test all pages on mobile, tablet, desktop
  - [ ] Fix layout issues
  - [ ] Optimize touch interactions
- [ ] **Loading States:**
  - [ ] Add skeleton loaders for all data fetching
  - [ ] Add loading spinners for actions
  - [ ] Create `LoadingSpinner.tsx`, `SkeletonCard.tsx`
- [ ] **Error Handling:**
  - [ ] Add error boundaries in React
  - [ ] Create user-friendly error pages (404, 500)
  - [ ] Add toast notifications for actions
  - [ ] Install `react-hot-toast` or similar

### 4.2 Testing

- [ ] **Backend Tests:**
  - [ ] Install Jest + Supertest
  - [ ] Write unit tests for services (genre, track, cart, order)
  - [ ] Write integration tests for API endpoints
  - [ ] Target minimum 50% code coverage
- [ ] **Frontend Tests (Optional):**
  - [ ] Install Vitest + React Testing Library
  - [ ] Write component tests for critical components
  - [ ] Write hook tests
- [ ] **Manual Testing:**
  - [ ] Create test checklist for all user flows
  - [ ] Test complete purchase flow end-to-end
  - [ ] Test admin CRUD operations

### 4.3 Performance Optimization

- [ ] **Database:**
  - [ ] Add indexes to foreign keys
  - [ ] Optimize slow queries
  - [ ] Add query result caching (Redis - optional)
- [ ] **Frontend:**
  - [ ] Implement lazy loading for routes
  - [ ] Optimize images (compress, use WebP)
  - [ ] Add pagination to track listings
  - [ ] Implement infinite scroll (optional)
- [ ] **Backend:**
  - [ ] Add rate limiting to API
  - [ ] Add request compression (gzip)
  - [ ] Optimize API response sizes

### 4.4 Security Hardening

- [ ] **Backend Security:**
  - [ ] Add input validation to all endpoints (use Joi or Zod)
  - [ ] Add rate limiting (express-rate-limit)
  - [ ] Add CORS whitelist
  - [ ] Add helmet.js for security headers
  - [ ] Sanitize SQL inputs (already using prepared statements)
- [ ] **Frontend Security:**
  - [ ] Add Content Security Policy
  - [ ] Sanitize user inputs
  - [ ] Prevent XSS attacks

### 4.5 Code Quality

- [ ] **Linting & Formatting:**
  - [ ] Setup ESLint for both client and server
  - [ ] Setup Prettier for consistent formatting
  - [ ] Run linter and fix all warnings
- [ ] **Code Review:**
  - [ ] Review all code for consistency
  - [ ] Add JSDoc comments to all functions
  - [ ] Remove unused imports, variables, files
  - [ ] Ensure TypeScript has no `any` types

### 4.6 Deployment Preparation (Optional)

- [ ] **Docker:**
  - [ ] Create `Dockerfile` for server
  - [ ] Create `Dockerfile` for client (Nginx)
  - [ ] Create `docker-compose.yml`
  - [ ] Test Docker build and run
- [ ] **Environment Configuration:**
  - [ ] Create `.env.example` with all variables
  - [ ] Document environment setup
  - [ ] Add config validation on startup
- [ ] **Build Process:**
  - [ ] Test production builds (client + server)
  - [ ] Optimize bundle sizes
  - [ ] Add build scripts to package.json

### 4.7 Final Documentation Package

- [ ] **Technical Documentation:**
  - [ ] Complete API documentation (endpoints, request/response formats)
  - [ ] Complete database schema documentation
  - [ ] Complete setup guide (SETUP.md)
  - [ ] Update README.md with final features
- [ ] **University Documentation:**
  - [ ] Compile all UML diagrams into single document
  - [ ] Write comprehensive project report covering:
    - [ ] Executive summary
    - [ ] Business model description
    - [ ] Technical architecture (3-tier detailed)
    - [ ] Implementation details for all 3 stages
    - [ ] Innovation aspects (licensing model, metadata usage)
    - [ ] External integrations (payment, email)
    - [ ] FURPS+ analysis
    - [ ] Risk management and mitigation
    - [ ] Testing approach and results
    - [ ] Conclusion and future work
  - [ ] Add screenshots for all major features
  - [ ] Add code snippets for key implementations
  - [ ] Generate PDF (formatting, table of contents, page numbers)
- [ ] **Presentation Materials:**
  - [ ] Create PowerPoint/Keynote presentation (10-15 slides)
  - [ ] Prepare live demo script
  - [ ] Prepare answers for common questions

### 4.8 Final Checks

- [ ] **Functionality Verification:**
  - [ ] Complete user journey (browse → add to cart → checkout → payment → download)
  - [ ] Admin functionality (create/edit/delete genres, sub-genres, tracks)
  - [ ] Search functionality
  - [ ] Recommendation system
  - [ ] Email notifications
- [ ] **Data Verification:**
  - [ ] Ensure minimum data requirements met:
    - [ ] ≥3 genres (departments)
    - [ ] ≥3 sub-genres per genre (categories)
    - [ ] ≥8-10 tracks per sub-genre (products)
  - [ ] Total: ≥3 genres × 3 sub-genres × 10 tracks = 90+ tracks
- [ ] **Documentation Verification:**
  - [ ] All required UML diagrams included
  - [ ] All written sections complete
  - [ ] Screenshots for all features
  - [ ] Proper formatting and references

---

## 📊 Progress Tracking

### Overall Completion Status

- **Stage 0 (Foundation):** ✅ 100% Complete
- **Stage 1 (Catalog):** 🔄 ~40% Complete
  - Database: ✅ Schema ready, ⚠️ Seed data insufficient
  - Backend: ✅ Genres API, ❌ Sub-genres API, ❌ Tracks API, ❌ Search API, ❌ Admin API
  - Frontend: ✅ Genre display, ❌ Sub-genre pages, ❌ Track pages, ❌ Search, ❌ Admin panel
  - Documentation: ❌ Not started
- **Stage 2 (Cart & Orders):** ❌ 0% Complete
- **Stage 3 (Users & Payments):** ❌ 0% Complete
- **Stage 4 (Polish):** ❌ 0% Complete

### Current Sprint Focus

**Priority 1 (This Week):** Complete Stage 1 core functionality

1. Expand seed data (more genres, sub-genres, tracks)
2. Implement sub-genre and track APIs
3. Create catalog browsing pages
4. Implement search functionality

**Priority 2 (Next Week):** Stage 1 admin + documentation

1. Implement admin panel for catalog management
2. Create all required UML diagrams
3. Write Stage 1 documentation

**Priority 3 (Following Weeks):** Stage 2 implementation

1. User authentication
2. Shopping cart
3. Basic order processing
4. Recommendation system

---

## 📝 Notes & Reminders

### Key Deadlines

- **Stage 1 Submission:** Week 4 (TBD - check university schedule)
- **Stage 2 Submission:** Week 8 (TBD)
- **Stage 3 Submission:** Week 12 (TBD)
- **Final Presentation:** End of semester (TBD)

### Important Requirements

- **Minimum Database Content:**

  - 3+ genres (departments)
  - 3+ sub-genres per genre (categories)
  - 8-10 tracks per sub-genre (products)
  - Total: 90+ tracks minimum

- **Required UML Diagrams:**

  - Use Case Diagram
  - Class Diagram
  - ER Diagram
  - Sequence Diagram (checkout flow)
  - State Diagram (order states)
  - Activity Diagram (business processes)

- **Required External Integrations:**
  - Payment gateway (Stripe recommended)
  - Email service (SendGrid/Mailgun)

### Technology Decisions

- **Authentication:** JWT-based (stateless)
- **Payment:** Stripe (or mock for demo)
- **Email:** SendGrid (or Nodemailer for development)
- **File Storage:** Local for MVP (cloud migration path documented)

### Known Technical Debt

- Audio file hosting not implemented (using mock URLs)
- No real file upload system yet
- No automated tests yet
- No CI/CD pipeline

### Questions to Resolve

- [ ] Confirm university deadline dates
- [ ] Decide on real vs mock payment integration
- [ ] Decide on real vs mock email service for demo
- [ ] Confirm documentation format requirements (PDF? Word?)

---

## 🎯 Success Criteria

### Stage 1 Success

- [x] ✅ Can browse genres
- [ ] Can browse sub-genres within a genre
- [ ] Can view track listings
- [ ] Can search for tracks
- [ ] Admin can create/edit/delete genres, sub-genres, tracks
- [ ] Database has minimum required data
- [ ] Complete documentation with UML diagrams

### Stage 2 Success

- [ ] Users can register and login
- [ ] Users can add tracks to cart
- [ ] Users can view and edit cart
- [ ] Users can create orders from cart
- [ ] Recommendation system shows relevant tracks
- [ ] Updated documentation

### Stage 3 Success

- [ ] Users can make payments (real or mock)
- [ ] Order pipeline includes: payment → inventory check → order creation → email
- [ ] Users can download purchased tracks
- [ ] Admin can manage orders and inventory
- [ ] Complete final documentation with all diagrams and innovation description

### Final Project Success

- [ ] All 3 stages completed and integrated
- [ ] All university requirements met
- [ ] Clean, professional UI/UX
- [ ] No critical bugs
- [ ] Comprehensive documentation
- [ ] Successful demo presentation
