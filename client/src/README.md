# Client Source Structure

## Overview

This is a modernized, scalable React + TypeScript application structure following best practices for maintainability and organization.

## Directory Structure

```
src/
├── components/           # Shared/reusable UI components
│   ├── layout/          # Layout-specific components (Navbar, Footer, etc.)
│   ├── shared/          # Shared components used across features (Hero, SearchOverlay, etc.)
│   └── ui/              # Generic UI components (Button, Input, Card, etc.)
│
├── features/            # Feature-based modules
│   ├── catalog/         # Catalog feature
│   │   ├── components/  # Feature-specific components
│   │   └── index.ts     # Public API exports
│   ├── player/          # Audio player feature
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.ts
│   ├── cart/            # Shopping cart feature
│   └── admin/           # Admin panel feature
│
├── lib/                 # Core utilities and configurations
│   ├── api/            # API client and endpoint definitions
│   │   ├── client.ts   # Base API client
│   │   ├── genres.ts   # Genre API endpoints
│   │   └── index.ts
│   ├── hooks/          # Shared custom hooks
│   │   ├── useGenres.ts
│   │   └── index.ts
│   ├── types/          # Global TypeScript types and interfaces
│   │   └── index.ts
│   ├── utils/          # Utility functions
│   │   ├── cn.ts       # Class name utility
│   │   └── index.ts
│   └── constants/      # Application constants
│       └── index.ts
│
├── layouts/            # Page layouts
│   ├── MainLayout.tsx
│   └── index.ts
│
├── pages/              # Page components
│   ├── Home.tsx
│   └── index.ts
│
├── routes/             # Routing configuration
│   └── AppRoutes.tsx
│
├── styles/             # Global styles
│   └── global.css
│
├── assets/             # Static assets (images, fonts, etc.)
│
├── App.tsx            # Root application component
├── main.tsx           # Application entry point
└── README.md          # This file
```

## Key Principles

### 1. Path Aliases
Uses `@/` prefix for cleaner imports:
```typescript
// ✅ Good
import { useGenres } from '@/lib/hooks';
import { Hero } from '@/components/shared';

// ❌ Avoid
import { useGenres } from '../../../lib/hooks';
```

### 2. Feature-Based Organization
Each feature is self-contained with its own components, hooks, and logic:
```
features/catalog/
├── components/    # Feature-specific components
├── hooks/         # Feature-specific hooks
└── index.ts       # Public exports
```

### 3. Centralized Configuration
- **Types**: All global types in `lib/types/`
- **Constants**: Application constants in `lib/constants/`
- **API**: Centralized API client in `lib/api/`
- **Hooks**: Shared hooks in `lib/hooks/`

### 4. Barrel Exports
Each directory has an `index.ts` for clean exports:
```typescript
// features/catalog/index.ts
export * from './components';

// Usage
import { GenreCard } from '@/features/catalog';
```

## API Layer

The API layer is centralized and type-safe:

```typescript
// lib/api/client.ts - Base client
export const apiClient = new ApiClient(API_BASE_URL);

// lib/api/genres.ts - Feature-specific endpoints
export const genresApi = {
    getAll: () => apiClient.get<Genre[]>('/genres'),
    getById: (id: number) => apiClient.get<Genre>(`/genres/${id}`),
};
```

## Best Practices

### Component Structure
```typescript
// 1. Imports (grouped)
import { useState } from 'react';
import { Icon } from 'lucide-react';
import { SomeType } from '@/lib/types';
import { CONSTANT } from '@/lib/constants';

// 2. Types/Interfaces
interface ComponentProps {
    // ...
}

// 3. Component
export default function Component({ }: ComponentProps) {
    // Logic
    return (/* JSX */);
}
```

### Custom Hooks
```typescript
// lib/hooks/useGenres.ts
import { useState, useEffect } from 'react';
import { genresApi } from '@/lib/api';
import type { Genre } from '@/lib/types';

export const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        genresApi.getAll()
            .then(setGenres)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { genres, loading, error };
};
```

### Constants
```typescript
// lib/constants/index.ts
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const ROUTES = {
    HOME: '/',
    CATALOG: '/catalog',
    PRICING: '/pricing',
} as const;
```

## Environment Configuration

Path aliases are configured in:
- `tsconfig.app.json` - TypeScript configuration
- `vite.config.ts` - Vite bundler configuration

```json
// tsconfig.app.json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["./src/*"]
        }
    }
}
```

```typescript
// vite.config.ts
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
```

## Migration Guide

When adding new features:

1. Create feature directory: `features/my-feature/`
2. Add subdirectories: `components/`, `hooks/`, etc.
3. Create `index.ts` for exports
4. Use path aliases for imports
5. Place shared code in `lib/`

## Benefits

✅ **Scalable**: Easy to add new features without restructuring
✅ **Maintainable**: Clear separation of concerns
✅ **Type-Safe**: Centralized types and API definitions
✅ **DRY**: Shared utilities and hooks
✅ **Clean Imports**: Path aliases prevent relative path hell
✅ **Testable**: Isolated features and utilities
