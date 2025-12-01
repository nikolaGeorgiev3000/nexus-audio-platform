# Setup Guide - Nexus Audio Platform

Complete step-by-step guide to get the project running.

## 📋 Prerequisites Checklist

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MySQL 8.x installed and running
- [ ] Git installed

## 🚀 Quick Start (5 minutes)

### Step 1: Clone and Install

```bash
# Navigate to project directory
cd nexus-audio-platform

# Install all dependencies (root, server, client)
npm run install:all
```

### Step 2: Configure Environment

**Create `/server/.env`:**
```bash
cd server
cp .env.example .env
```

Edit `/server/.env`:
```env
PORT=3000
NODE_ENV=development

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=nexus_audio_db

CLIENT_URL=http://localhost:5173
```

**Create `/client/.env`:**
```bash
cd ../client
cp .env.example .env
```

Edit `/client/.env`:
```env
VITE_API_URL=http://localhost:3000/api
```

### Step 3: Setup Database

**Option A: Using npm scripts (requires mysql CLI)**
```bash
cd ..  # Back to root
npm run db:setup
# Enter your MySQL password when prompted

npm run db:seed
# Enter your MySQL password when prompted
```

**Option B: Manual setup**
```bash
# Login to MySQL
mysql -u root -p

# Run schema
source database/schema.sql

# Run seeds
source database/seeds.sql

# Verify
USE nexus_audio_db;
SHOW TABLES;
SELECT * FROM genres;
```

### Step 4: Start Development Servers

```bash
# From root directory
npm run dev
```

This will start:
- 🟦 **Server** at http://localhost:3000
- 🟪 **Client** at http://localhost:5173

## ✅ Verify Installation

### Test Server

Open http://localhost:3000/health

You should see:
```json
{
  "success": true,
  "status": "active",
  "system": "Nexus Audio Platform API",
  "timestamp": "2024-..."
}
```

### Test Database Connection

Check server terminal output for:
```
✅ Database connected successfully!
```

### Test API

Open http://localhost:3000/api/genres

You should see an array of genres:
```json
[
  {
    "id": 1,
    "name": "Electronic",
    "description": "Synthesizers...",
    "slug": "electronic"
  },
  ...
]
```

### Test Client

Open http://localhost:5173

You should see:
- ✅ Navbar with logo
- ✅ Hero section
- ✅ Departments section with genre cards

## 🐛 Troubleshooting

### MySQL Connection Failed

**Error:** `❌ Database connection failed`

**Solutions:**
1. Check MySQL is running:
   ```bash
   # macOS
   mysql.server status

   # Linux
   sudo systemctl status mysql

   # Windows
   # Check Services for MySQL
   ```

2. Verify credentials in `/server/.env`

3. Test MySQL login:
   ```bash
   mysql -u root -p
   ```

4. Check database exists:
   ```sql
   SHOW DATABASES;
   ```

### Port Already in Use

**Error:** `Port 3000 is already in use`

**Solutions:**
1. Change port in `/server/.env`:
   ```env
   PORT=3001
   ```

2. Update client API URL in `/client/.env`:
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

3. Or kill the process using the port:
   ```bash
   # macOS/Linux
   lsof -ti:3000 | xargs kill

   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

### CORS Errors in Browser

**Error:** `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution:**
Ensure `CLIENT_URL` in `/server/.env` matches your client URL:
```env
CLIENT_URL=http://localhost:5173
```

### Client Shows "Unable to load catalog data"

**Causes:**
1. Server not running
2. Wrong API URL
3. Database empty

**Solutions:**
1. Check server is running at http://localhost:3000/health
2. Verify `/client/.env` has correct `VITE_API_URL`
3. Check browser Network tab for API errors
4. Run seeds: `npm run db:seed`

### TypeScript Errors in Client

**Error:** `Cannot find module '@/...'`

**Solution:**
Ensure path aliases are configured in `client/tsconfig.app.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

And in `client/vite.config.ts`:
```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

### Import Errors in Server

**Error:** `Cannot find module` or `ERR_MODULE_NOT_FOUND`

**Solution:**
Server uses ES modules. All imports must use `.js` extensions:
```typescript
// ✅ Correct
import { getAllGenres } from '../services/genre.service.js';

// ❌ Wrong
import { getAllGenres } from '../services/genre.service';
```

## 🔄 Restart Everything

If things get messy:

```bash
# Stop all processes (Ctrl+C in terminal running npm run dev)

# Clean and reinstall
rm -rf node_modules server/node_modules client/node_modules
npm run install:all

# Reset database
mysql -u root -p < database/schema.sql
mysql -u root -p nexus_audio_db < database/seeds.sql

# Start fresh
npm run dev
```

## 📊 Check Installation Status

Run this checklist:

- [ ] `node --version` shows v18+
- [ ] `mysql --version` shows 8.x
- [ ] `/server/.env` exists with correct values
- [ ] `/client/.env` exists with correct values
- [ ] `npm run dev` starts without errors
- [ ] http://localhost:3000/health returns success
- [ ] http://localhost:3000/api/genres returns data
- [ ] http://localhost:5173 loads homepage
- [ ] Genre cards appear on homepage
- [ ] No errors in browser console
- [ ] Server terminal shows database connected

## 🎉 Success!

If all checks pass, you're ready to develop!

Next steps:
- Explore the codebase structure
- Read `/client/src/README.md` for client architecture
- Read `/README.md` for project overview
- Start building features!

## 💡 Development Tips

1. **Hot Reload**: Both client and server auto-reload on changes
2. **Database Changes**: After schema changes, re-run `npm run db:setup`
3. **New Dependencies**:
   - Server: `cd server && npm install <package>`
   - Client: `cd client && npm install <package>`
4. **TypeScript Errors**: Server and client have separate TypeScript configs
5. **API Testing**: Use Postman or curl for API testing

## 📞 Getting Help

If you're stuck:
1. Check this guide's troubleshooting section
2. Check server/client terminal output for errors
3. Check browser console for errors
4. Verify environment variables
5. Try the "Restart Everything" section
