# Project Tasks & Roadmap

## ✅ Phase 1: Setup & Architecture (Completed)

- [x] **Project Initialization:** Setup Monorepo structure (Client/Server).
- [x] **Tech Stack:** Install React (Vite), Tailwind, Express, TypeScript.
- [x] **Database Design:** Create ER Diagram logic and SQL Schema (`schema.sql`).
- [x] **Database Seeding:** Create initial test data (`seeds.sql`).
- [x] **DB Connection:** Implement `db.ts` with MySQL connection pool.
- [x] **Basic API:** Create `/api/genres` endpoint.
- [x] **Frontend Connection:** Fetch and display Genres in React.
- [x] **UI Modernization:** Implement Dark Mode, Blur Navbar, and Card designs.
- [x] **Refactoring:**
  - [x] Implement Feature-Based structure in Client (`features/catalog`).
  - [x] Implement Layered structure in Server (Controller/Service).
  - [x] Cleanup root directories.

## 🚧 Phase 2: Catalog & Browsing (Current Focus)

- [ ] **Sub-Genres Logic:**
  - [ ] Backend: Update API to return Sub-genres for a specific Genre.
  - [ ] Frontend: Create `CatalogPage` to display sub-genres.
- [ ] **Track Listing:**
  - [ ] Database: Ensure `tracks` table is populated.
  - [ ] Backend: Create `GET /api/tracks?genreId=X` endpoint.
  - [ ] Frontend: Create `TrackList` component.
- [ ] **Audio Player:**
  - [ ] Create global `PlayerContext`.
  - [ ] Implement `PlayerBar` (Play/Pause, Volume, Progress).
  - [ ] Connect track "Play" buttons to the global player.

## 📅 Phase 3: E-Commerce Features (Next)

- [ ] **Shopping Cart:**
  - [ ] Create `CartContext` (add/remove items).
  - [ ] Implement Slide-over Cart UI.
- [ ] **Checkout Process:**
  - [ ] Mock Payment form.
  - [ ] Order summary.

## 🚀 Phase 4: Polish & Documentation (Final)

- [ ] **Documentation:** Generate PDFs for University requirements.
- [ ] **Testing:** Add basic unit tests for API.
- [ ] **Deployment Prep:** Dockerize the application (Optional).
