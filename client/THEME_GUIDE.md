# Theme Support Guide

Quick reference for adding light/dark theme support to new components in the Nexus Audio Platform.

## Basic Usage

### 1. Use Tailwind's `dark:` Variant

All new components should include both light and dark mode styles:

```tsx
<div className="bg-white dark:bg-slate-900">
  <h1 className="text-slate-900 dark:text-white">Title</h1>
  <p className="text-slate-600 dark:text-slate-400">Description</p>
</div>
```

### 2. Common Color Patterns

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| **Backgrounds** |
| Primary | `bg-white` | `dark:bg-slate-900` |
| Secondary | `bg-slate-50` | `dark:bg-slate-950` |
| Card | `bg-slate-100` | `dark:bg-slate-900/40` |
| **Text** |
| Primary | `text-slate-900` | `dark:text-white` |
| Secondary | `text-slate-600` | `dark:text-slate-400` |
| Muted | `text-slate-500` | `dark:text-slate-500` |
| **Borders** |
| Default | `border-slate-200` | `dark:border-white/10` |
| Strong | `border-slate-300` | `dark:border-slate-700` |
| Card | `border-slate-300` | `dark:border-white/5` |
| **Interactive** |
| Hover BG | `hover:bg-slate-100` | `dark:hover:bg-white/10` |
| Hover Text | `hover:text-slate-900` | `dark:hover:text-white` |

### 3. Using the Theme Hook

When you need programmatic access to the current theme:

```tsx
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <div>
      {isDark ? <MoonIcon /> : <SunIcon />}
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

## Examples

### Card Component

```tsx
export function Card({ title, description }: CardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:shadow-lg transition-all">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}
```

### Button Component

```tsx
export function Button({ children, variant = 'primary' }: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500",
    secondary: "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </button>
  );
}
```

### Input Component

```tsx
export function Input({ placeholder, ...props }: InputProps) {
  return (
    <input
      className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
      {...props}
    />
  );
}
```

### Modal/Dialog

```tsx
export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 dark:bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 max-w-lg w-full shadow-xl">
        {children}
      </div>
    </div>
  );
}
```

## Testing Theme Support

Always test your components in both themes:

```typescript
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('should render in light theme', () => {
    // Set up light theme in localStorage
    localStorage.setItem('theme', 'light');

    render(
      <ThemeProvider>
        <MyComponent />
      </ThemeProvider>
    );

    // Verify light theme classes are applied
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('should render in dark theme', () => {
    localStorage.setItem('theme', 'dark');

    render(
      <ThemeProvider>
        <MyComponent />
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
```

## Checklist for New Components

- [ ] Add `dark:` variants for all background colors
- [ ] Add `dark:` variants for all text colors
- [ ] Add `dark:` variants for all border colors
- [ ] Add `dark:` variants for hover states
- [ ] Test component visually in both themes
- [ ] Add unit tests for theme support
- [ ] Ensure proper contrast ratios (WCAG AA minimum)

## Tips

1. **Always use semantic color names**: Use `slate-900` for dark text, not `black`
2. **Use opacity for overlays**: `bg-slate-900/50` instead of solid colors
3. **Test with high contrast**: Ensure text is readable in both themes
4. **Use transitions**: Add `transition-colors` for smooth theme switches
5. **Group theme classes**: Keep light and dark variants together for readability

```tsx
// ✅ Good: Grouped together
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">

// ❌ Avoid: Separated
<div className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
```

## Resources

- [Tailwind CSS Dark Mode Docs](https://tailwindcss.com/docs/dark-mode)
- [Theme Implementation Details](../THEME_IMPLEMENTATION.md)
- [Test Examples](./src/contexts/__tests__/ThemeContext.test.tsx)
- [Existing Components](./src/components/) - Check for examples
