# Nexus Audio Platform

A premium marketplace for audiophiles and creators to license high-fidelity audio stems. Built with a modern 3-tier architecture.

## 🏗️ Architecture

```
nexus-audio-platform/
├── client/          # React + TypeScript + Vite frontend
├── server/          # Express + TypeScript API server
├── database/        # MySQL schema and seed files
└── package.json     # Root workspace configuration
```

### Technology Stack

**Frontend (Client)**
- React 19 with TypeScript
- Vite for fast development
- TailwindCSS for styling
- React Router for navigation
- Lucide React for icons

**Backend (Server)**
- Node.js + Express
- TypeScript
- MySQL2 for database
- CORS enabled

**Database**
- MySQL 8.x
- Structured schema with foreign keys
- Stored procedures for complex queries

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MySQL 8.x
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd nexus-audio-platform
```

2. **Install all dependencies**
```bash
npm run install:all
```

This will install dependencies for the root, server, and client.

3. **Setup environment variables**

**Server** (`/server/.env`):
```env
PORT=3000
NODE_ENV=development

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=nexus_audio_db

CLIENT_URL=http://localhost:5173
```

**Client** (`/client/.env`):
```env
VITE_API_URL=http://localhost:3000/api
```

4. **Setup the database**

```bash
# Create database and tables
npm run db:setup

# Seed with sample data
npm run db:seed
```

Or manually:
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p nexus_audio_db < database/seeds.sql
```

### Running the Application

**Development mode (recommended):**
```bash
npm run dev
```

This starts both server (port 3000) and client (port 5173) concurrently.

**Or run separately:**
```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client
cd client
npm run dev
```

### Building for Production

```bash
npm run build
```

This builds both client and server.

## 📁 Project Structure

### Client Structure

```
client/src/
├── components/      # Shared UI components
│   ├── layout/     # Layout components (Navbar, Footer)
│   ├── shared/     # Reusable components (Hero, SearchOverlay)
│   └── ui/         # Generic UI components
│
├── features/       # Feature-based modules
│   ├── catalog/    # Genre browsing
│   ├── player/     # Audio player
│   ├── cart/       # Shopping cart
│   └── admin/      # Admin panel
│
├── lib/            # Core utilities
│   ├── api/       # API client and endpoints
│   ├── hooks/     # Shared custom hooks
│   ├── types/     # TypeScript types
│   ├── utils/     # Utility functions
│   └── constants/ # App constants
│
├── layouts/       # Page layouts
├── pages/         # Page components
├── routes/        # Routing configuration
└── styles/        # Global styles
```

### Server Structure

```
server/src/
├── config/        # Configuration (database, etc.)
├── controllers/   # Route controllers
├── middleware/    # Express middleware
├── models/        # Data models (future)
├── routes/        # API routes
├── services/      # Business logic
├── types/         # TypeScript types
├── utils/         # Utility functions
└── index.ts       # Server entry point
```

## 🔌 API Endpoints

### Genres

- `GET /api/genres` - Get all genres
- `GET /api/genres/:id` - Get genre by ID
- `GET /api/genres/slug/:slug` - Get genre by slug

### Health Check

- `GET /health` - API health status

## 🗄️ Database Schema

### Tables

- **users** - Customer and admin accounts
- **genres** - Main musical categories (Departments)
- **sub_genres** - Specific styles within genres (Categories)
- **tracks** - Audio products with pricing tiers

### Pricing Tiers

- **Basic** ($0.99) - MP3 License
- **Pro** ($2.49) - WAV License
- **Stems** ($19.99) - Commercial/Stems License

## 🎨 Features

### Implemented

✅ Modern, responsive UI with dark theme
✅ Genre browsing
✅ Search overlay
✅ API client with error handling
✅ TypeScript throughout
✅ Path aliases for clean imports
✅ CORS configuration
✅ Error handling middleware

### Planned

- [ ] User authentication
- [ ] Shopping cart
- [ ] Payment integration
- [ ] Audio player
- [ ] Admin dashboard
- [ ] Track upload system

## 🛠️ Development

### Path Aliases

The project uses `@/` for cleaner imports:

```typescript
// Client
import { useGenres } from '@/lib/hooks';
import { Hero } from '@/components/shared';

// Server uses relative paths with .js extensions (ES modules)
import { getAllGenres } from '../services/genre.service.js';
```

### Code Style

- TypeScript strict mode enabled
- ES Modules (type: "module")
- Functional components with hooks
- Async/await for asynchronous operations

### Scripts

```bash
# Development
npm run dev              # Run both client and server
npm run dev:server       # Run server only
npm run dev:client       # Run client only

# Build
npm run build            # Build both
npm run build:server     # Build server
npm run build:client     # Build client

# Database
npm run db:setup         # Create database and tables
npm run db:seed          # Insert seed data

# Installation
npm run install:all      # Install all dependencies
```

## 🐛 Troubleshooting

### Database Connection Issues

1. Check MySQL is running:
```bash
mysql -u root -p
```

2. Verify credentials in `/server/.env`

3. Check database exists:
```sql
SHOW DATABASES;
USE nexus_audio_db;
```

### Port Conflicts

- Server default: `3000`
- Client default: `5173`

Change in respective `.env` files if needed.

### CORS Issues

Ensure `CLIENT_URL` in server `.env` matches your client URL.

## 📝 License

ISC

## 👥 Contributing

This is a university project for the Systems for E-Business course.
