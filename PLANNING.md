# Nexus Audio Platform - Planning & Architecture

## 1. Project Vision

**Nexus Audio Platform** is a specialized B2C e-commerce system for digital audio distribution. Unlike traditional streaming services (Spotify), Nexus focuses on **selling licenses** and high-quality files (WAV/Stems) to content creators, DJs, and studios.

### Core Value Proposition

- **Tiered Licensing:** Users can buy MP3 (Basic), WAV (Pro), or Stems (Commercial).
- **Direct-to-Creator:** No aggregators, direct sales logic.
- **Modern UX:** SPA experience with React, blurred UI effects, and seamless audio previewing.

---

## 2. Technical Architecture (3-Tier)

The system follows a strict **3-Tier Architecture** to meet enterprise standards:

### Tier 1: Presentation (Client)

- **Stack:** React 19, TypeScript, Vite, TailwindCSS.
- **Pattern:** Feature-Based Architecture (`src/features/catalog`, `src/features/cart`).
- **Responsibility:** UI rendering, State Management, API consumption.
- **Key Libraries:** `lucide-react` (icons), `react-router-dom` (routing), `framer-motion` (animations).

### Tier 2: Business Logic (Server)

- **Stack:** Node.js, Express, TypeScript.
- **Pattern:** Layered Architecture (Controller -> Service -> Data Access).
- **Responsibility:** Request validation, Business rules (pricing logic), Auth, Data formatting.
- **Key Rules:** Controllers never access the DB directly; Services handle the logic.

### Tier 3: Data (Database)

- **Stack:** MySQL (Relational).
- **Responsibility:** Data persistence, Referential integrity.
- **Requirements:** Must use **Stored Procedures** for key operations (e.g., `GetTracksByGenre`).

---

## 3. Global Development Rules (AI & Human)

### General

- **Language:** Strict TypeScript everywhere. No `any` types.
- **File Size:** Keep files under **500 lines**. Refactor if they grow larger.
- **Comments:** Use JSDoc (`/** ... */`) for all exported functions.

### Frontend

- **Components:** Use Functional Components with Hooks.
- **Structure:** Logic goes into custom hooks (`useGenres.ts`), UI goes into components (`GenreCard.tsx`).
- **Styling:** Utility-first with TailwindCSS.

### Backend

- **API Response:** Standard JSON format: `{ data: ..., meta: ..., error: ... }`.
- **Error Handling:** Never crash the server. Use `try/catch` in controllers and pass errors to middleware.

---

## 4. Data Model (Schema Overview)

- **Users:** Admin & Customers.
- **Genres (Departments):** Top-level categorization (Electronic, Rock).
- **Sub-Genres (Categories):** Specific styles (Techno, Trap).
- **Tracks (Products):** The audio assets with 3 price points.
