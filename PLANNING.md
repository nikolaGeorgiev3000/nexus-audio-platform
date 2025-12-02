# Nexus Audio Platform - Planning & Architecture

## 1. Project Vision

**Nexus Audio Platform** is a specialized B2C e-commerce system for digital audio distribution. Unlike traditional streaming services (Spotify), Nexus focuses on **selling licenses** and high-quality files (WAV/Stems) to content creators, DJs, and studios.

### Core Value Proposition

- **Tiered Licensing:** Users can buy MP3 (Basic), WAV (Pro), or Stems (Commercial).
- **Direct-to-Creator:** No aggregators, direct sales logic.
- **Modern UX:** SPA experience with React, blurred UI effects, and seamless audio previewing.

---

## 2. University Project Requirements

This project is developed for the **Systems for E-Business** course and must meet specific requirements across three development stages.

### Database Requirements (Minimum)

- **Departments (Genres):** Minimum 2-3 departments
- **Categories per Department (Sub-Genres):** Minimum 2-3 categories per department
- **Products per Category (Tracks):** Minimum 8-10 products per category

### Stage 1: Catalog Foundation (Week 1-4)

**Deliverables:**

- Creation and display of product catalog in database
- Department (Genre) structure and management
- Category (Sub-Genre) and sub-category structure
- Product (Track) characteristics and attributes
- Catalog search functionality
- Administration of catalog, departments, categories, and their characteristics

**Documentation Requirements:**

1. Project description
2. System architecture and design
3. E-business description
4. Functionality description using standard methods (UML, use cases)
5. Database description (departments, categories, products count)
6. Category and department description
7. Stage 1 implementation details

### Stage 2: Shopping Cart & Recommendations (Week 5-8)

**Deliverables:**

- Shopping cart/basket implementation
- Data storage in local database
- Cart content editing and display
- User order processing
- Simple but effective recommendation system

**Documentation Requirements:**

1. All Stage 1 documentation (updated with feedback)
2. Stage 2 implementation description
3. Shopping cart/portfolio implementation details
4. Content editing and display features
5. Order processing workflow

### Stage 3: User Accounts & Payment Processing (Week 9-12)

**Deliverables:**

- User account module
- Advanced order processing
- Order processing pipeline including:
  - Credit card authorization
  - Inventory availability check
  - Product shipping/delivery
  - Email notification system
- Credit card transaction processing

**Documentation Requirements:**

1. All Stage 1 & 2 documentation (updated)
2. Stored procedures description
3. Stage 3 module implementation
4. Innovation characteristics description
5. Integration with external systems description

### Innovation & Business Model

The project must demonstrate:

- Development of new business model OR modification of existing one
- Need for and implementation of integration with other systems
- Use of various UML diagrams (class diagrams, interaction diagrams, state diagrams, activity diagrams)
- Rational Unified Process (RUP) and use case models
- FURPS+ where applicable

---

## 3. Technical Architecture (3-Tier)

The system follows a strict **3-Tier Architecture** to meet enterprise standards:

### Tier 1: Presentation (Client)

- **Stack:** React 19, TypeScript, Vite, TailwindCSS
- **Pattern:** Feature-Based Architecture (`src/features/catalog`, `src/features/cart`, `src/features/admin`)
- **Responsibility:** UI rendering, State Management, API consumption
- **Key Libraries:** `lucide-react` (icons), `react-router-dom` (routing), `framer-motion` (animations)
- **State Management:** React Context API for global state (Cart, User, Player)

### Tier 2: Business Logic (Server)

- **Stack:** Node.js, Express, TypeScript
- **Pattern:** Layered Architecture (Controller → Service → Data Access)
- **Responsibility:** Request validation, Business rules (pricing logic, order pipeline), Auth, Data formatting
- **Key Rules:**
  - Controllers never access the DB directly
  - Services handle all business logic
  - Middleware for authentication, validation, error handling

### Tier 3: Data (Database)

- **Stack:** MySQL 8.x (Relational)
- **Responsibility:** Data persistence, Referential integrity, Complex queries
- **Requirements:**
  - Must use **Stored Procedures** for key operations (e.g., `GetTracksByGenre`, `ProcessOrder`, `CheckInventory`)
  - Foreign key constraints for data integrity
  - Indexes for performance optimization

---

## 4. Global Development Rules (AI & Human)

### General

- **Language:** Strict TypeScript everywhere. No `any` types
- **File Size:** Keep files under **500 lines**. Refactor if they grow larger
- **Comments:** Use JSDoc (`/** ... */`) for all exported functions
- **Error Handling:** Comprehensive error handling at all layers
- **Security:** Sanitize inputs, use prepared statements, hash passwords

### Frontend

- **Components:** Use Functional Components with Hooks
- **Structure:** Logic goes into custom hooks (`useGenres.ts`), UI goes into components (`GenreCard.tsx`)
- **Styling:** Utility-first with TailwindCSS
- **Accessibility:** Semantic HTML, ARIA labels where needed
- **Performance:** Lazy loading, code splitting, memoization

### Backend

- **API Response:** Standard JSON format: `{ data: ..., meta: ..., error: ... }`
- **Error Handling:** Never crash the server. Use `try/catch` in controllers and pass errors to middleware
- **Validation:** Validate all inputs before processing
- **Authentication:** JWT-based authentication for protected routes
- **Authorization:** Role-based access control (Admin vs Customer)

### Database

- **Naming:** snake_case for tables and columns
- **Relationships:** Use foreign keys with proper CASCADE rules
- **Transactions:** Use transactions for multi-step operations (e.g., order processing)
- **Stored Procedures:** Use for complex queries and business logic

---

## 5. Data Model (Schema Overview)

### Core Entities

#### Users Table

- **Purpose:** Store customer and admin accounts
- **Fields:** id, email, password_hash, full_name, role (customer/admin), created_at, updated_at
- **Relationships:** One-to-Many with Orders

#### Genres Table (Departments)

- **Purpose:** Top-level categorization
- **Fields:** id, name, slug, description, image_url, created_at
- **Examples:** Electronic, Cinematic, Urban
- **Relationships:** One-to-Many with Sub-Genres

#### Sub-Genres Table (Categories)

- **Purpose:** Specific styles within genres
- **Fields:** id, genre_id (FK), name, slug, description, created_at
- **Examples:** Melodic Techno, Drum & Bass, Trailer Music
- **Relationships:**
  - Many-to-One with Genres
  - One-to-Many with Tracks

#### Tracks Table (Products)

- **Purpose:** The audio assets for sale
- **Fields:**
  - id, sub_genre_id (FK), title, artist, bpm, key_signature, duration_sec
  - price_basic (MP3), price_pro (WAV), price_stems (Full Stems)
  - demo_url, cover_image_url, file_url_basic, file_url_pro, file_url_stems
  - stock_quantity, is_active, created_at, updated_at
- **Pricing Model:** Three-tier licensing (Basic €0.99, Pro €2.49, Stems €19.99)
- **Relationships:**
  - Many-to-One with Sub-Genres
  - One-to-Many with Order Items
  - One-to-Many with Cart Items

#### Cart Items Table

- **Purpose:** Store items in user's shopping cart
- **Fields:** id, user_id (FK), track_id (FK), license_type (basic/pro/stems), price, created_at
- **Relationships:**
  - Many-to-One with Users
  - Many-to-One with Tracks

#### Orders Table

- **Purpose:** Store completed orders
- **Fields:** id, user_id (FK), total_amount, payment_status, order_status, payment_method, created_at, updated_at
- **Relationships:**
  - Many-to-One with Users
  - One-to-Many with Order Items
  - One-to-One with Payment Transactions

#### Order Items Table

- **Purpose:** Store individual items in an order
- **Fields:** id, order_id (FK), track_id (FK), license_type, price, download_url, created_at
- **Relationships:**
  - Many-to-One with Orders
  - Many-to-One with Tracks

#### Payment Transactions Table

- **Purpose:** Store payment processing details
- **Fields:** id, order_id (FK), transaction_id, amount, payment_method, status, processed_at
- **Relationships:** Many-to-One with Orders

### Stored Procedures

1. **GetTracksByGenre(genreName VARCHAR)** ✅ Implemented

   - Returns all tracks for a specific genre with joins

2. **GetTracksBySubGenre(subGenreId INT)** - To be implemented

   - Returns all tracks for a specific sub-genre

3. **ProcessOrder(userId INT, OUT orderId INT)** - To be implemented

   - Creates order from cart items
   - Validates inventory
   - Calculates total
   - Returns new order ID

4. **CheckInventory(trackId INT, quantity INT)** - To be implemented

   - Checks if sufficient stock exists
   - Returns availability status

5. **UpdateInventory(trackId INT, quantity INT)** - To be implemented

   - Decrements stock after successful order

6. **GetOrderHistory(userId INT)** - To be implemented
   - Returns all orders for a user with details

---

## 6. Feature Mapping to University Requirements

### Stage 1: Catalog Foundation

| Requirement             | Implementation                            | Status                   |
| ----------------------- | ----------------------------------------- | ------------------------ |
| Product catalog display | Genre browsing, track listing             | ✅ Partial (Genres done) |
| Department structure    | Genres table + API                        | ✅ Complete              |
| Category structure      | Sub-Genres table + API                    | 🔄 Schema ready          |
| Product characteristics | Tracks with metadata (BPM, key, duration) | 🔄 Schema ready          |
| Catalog search          | Search by title, artist, genre            | ❌ To implement          |
| Catalog administration  | Admin CRUD for genres, sub-genres, tracks | ❌ To implement          |

### Stage 2: Shopping Cart & Recommendations

| Requirement            | Implementation                      | Status          |
| ---------------------- | ----------------------------------- | --------------- |
| Shopping cart          | CartContext + CartItems table       | ❌ To implement |
| Local database storage | MySQL cart_items table              | 🔄 Schema ready |
| Cart editing           | Add/remove/update items             | ❌ To implement |
| Order processing       | Create order from cart              | ❌ To implement |
| Recommendation system  | "Similar tracks" based on genre/BPM | ❌ To implement |

### Stage 3: User Accounts & Payment

| Requirement               | Implementation                     | Status          |
| ------------------------- | ---------------------------------- | --------------- |
| User account module       | Registration, login, profile       | ❌ To implement |
| Advanced order processing | Order pipeline with multiple steps | ❌ To implement |
| Credit card authorization | Stripe/PayPal integration          | ❌ To implement |
| Inventory check           | CheckInventory stored procedure    | ❌ To implement |
| Email notifications       | Order confirmation emails          | ❌ To implement |
| Product delivery          | Digital download links             | ❌ To implement |

---

## 7. Innovation Aspects

### Unique Business Model Features

1. **Three-Tier Licensing Model**

   - Unlike traditional e-commerce (single price per product)
   - Allows flexible monetization: €0.99 (Basic) → €2.49 (Pro) → €19.99 (Stems)
   - Targets different customer segments (hobbyists vs professionals)

2. **Digital Rights Management**

   - License-based sales (not subscription)
   - Different file formats per license tier
   - Automatic download link generation post-purchase

3. **Audio-Specific Metadata**

   - BPM (Beats Per Minute) for DJ mixing
   - Key signature for harmonic mixing
   - Duration and genre classification

4. **Intelligent Recommendations**
   - Based on musical characteristics (BPM range, key compatibility)
   - Purchase history analysis
   - Genre affinity scoring

### External System Integrations

1. **Payment Gateway Integration**

   - Stripe API for credit card processing
   - Webhook handling for payment confirmations

2. **Email Service Integration**

   - SendGrid/Mailgun for transactional emails
   - Order confirmations, download links, receipts

3. **Cloud Storage Integration (Future)**
   - AWS S3 / Cloudflare R2 for audio file storage
   - CDN for fast global delivery

---

## 8. UML & Modeling Requirements

### Required Diagrams

1. **Use Case Diagram** - Shows actors (Customer, Admin) and their interactions
2. **Class Diagram** - Static structure (entities, relationships)
3. **Sequence Diagram** - Order processing flow, payment flow
4. **State Diagram** - Order states (Pending → Processing → Completed/Failed)
5. **Activity Diagram** - Business processes (Add to cart, Checkout process)
6. **ER Diagram** - Database relationships

### FURPS+ Analysis

- **Functionality:** Catalog browsing, cart management, order processing, admin panel
- **Usability:** Modern UI, responsive design, intuitive navigation
- **Reliability:** Error handling, transaction rollback, data validation
- **Performance:** Lazy loading, caching, optimized queries
- **Supportability:** Modular architecture, TypeScript for maintainability
- **+Design:** 3-tier architecture, separation of concerns
- **+Implementation:** Modern tech stack, best practices
- **+Interface:** RESTful API, standard JSON responses
- **+Physical:** Cloud-deployable, containerizable

---

## 9. Security Considerations

### Authentication & Authorization

- **Password Security:** bcrypt hashing with salt rounds
- **JWT Tokens:** Short-lived access tokens, refresh token rotation
- **Role-Based Access Control (RBAC):** Customer vs Admin permissions

### Data Protection

- **SQL Injection Prevention:** Prepared statements, parameterized queries
- **XSS Prevention:** Input sanitization, Content Security Policy
- **CSRF Protection:** CSRF tokens for state-changing operations

### Payment Security

- **PCI DSS Compliance:** Never store full credit card numbers
- **Tokenization:** Use payment gateway tokens
- **HTTPS Only:** Enforce secure connections

---

## 10. Development Workflow

### Git Workflow

- **Main Branch:** Production-ready code
- **Develop Branch:** Integration branch
- **Feature Branches:** `feature/stage-1-catalog`, `feature/stage-2-cart`
- **Commit Messages:** Conventional commits (feat:, fix:, docs:)

### Code Review Process

- Self-review before commit
- Use TypeScript compiler for type checking
- ESLint for code quality

### Testing Strategy

- **Unit Tests:** Jest for business logic
- **Integration Tests:** API endpoint testing
- **Manual Testing:** User flow testing

### Documentation Updates

- Keep TASKS.md updated with progress
- Update README.md with new features
- Document API endpoints in separate API.md file

---

## 11. Deployment Strategy (Future)

### Development Environment

- Local MySQL database
- Vite dev server (port 5173)
- Express server (port 3000)

### Production Environment (Optional)

- Docker containerization
- MySQL in container or managed service
- Nginx reverse proxy
- Environment-based configuration

---

## 12. Risk Management

### Technical Risks

- **Database Performance:** Mitigate with indexes, query optimization
- **Payment Integration Complexity:** Use well-documented SDKs
- **File Storage Limits:** Plan for cloud migration path

### Business Risks

- **Scope Creep:** Stick to 3-stage requirements
- **Time Constraints:** Prioritize core features over polish
- **Data Quality:** Ensure sufficient seed data for demo

### Mitigation Strategies

- Regular progress tracking via TASKS.md
- Incremental development (stage-by-stage)
- Early testing of critical paths (payment, order processing)
