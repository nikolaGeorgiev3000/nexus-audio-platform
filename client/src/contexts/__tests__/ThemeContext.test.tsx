import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '../ThemeContext';

describe('ThemeContext', () => {
  beforeEach(() => {
    // Clear localStorage mock before each test
    localStorage.clear();
    // Reset document classes
    document.documentElement.className = '';
  });

  describe('ThemeProvider', () => {
    it('should default to dark theme when no localStorage value exists', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      expect(result.current.theme).toBe('dark');
      expect(result.current.isDark).toBe(true);
    });

    it('should use theme from localStorage if available', () => {
      localStorage.setItem('theme', 'light');

      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      expect(result.current.theme).toBe('light');
      expect(result.current.isDark).toBe(false);
    });

    it('should apply dark class to document root', () => {
      renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should apply light class to document root when theme is light', () => {
      localStorage.setItem('theme', 'light');

      renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      expect(document.documentElement.classList.contains('light')).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  describe('toggleTheme', () => {
    it('should toggle from dark to light', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('light');
      expect(result.current.isDark).toBe(false);
    });

    it('should toggle from light to dark', () => {
      localStorage.setItem('theme', 'light');

      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('dark');
      expect(result.current.isDark).toBe(true);
    });

    it('should update document classes when toggling', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      // Initial state should be dark
      expect(document.documentElement.classList.contains('dark')).toBe(true);

      act(() => {
        result.current.toggleTheme();
      });

      // After toggle should be light
      expect(document.documentElement.classList.contains('light')).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(false);

      act(() => {
        result.current.toggleTheme();
      });

      // After second toggle should be dark again
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(document.documentElement.classList.contains('light')).toBe(false);
    });

    it('should persist theme to localStorage when toggling', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      act(() => {
        result.current.toggleTheme();
      });

      // Check that theme was persisted
      expect(localStorage.getItem('theme')).toBe('light');

      act(() => {
        result.current.toggleTheme();
      });

      // Check that theme was persisted again
      expect(localStorage.getItem('theme')).toBe('dark');
    });
  });

  describe('useTheme hook', () => {
    it('should throw error when used outside ThemeProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useTheme());
      }).toThrow('useTheme must be used within a ThemeProvider');

      consoleSpy.mockRestore();
    });

    it('should provide theme context values', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      expect(result.current).toHaveProperty('theme');
      expect(result.current).toHaveProperty('toggleTheme');
      expect(result.current).toHaveProperty('isDark');
      expect(typeof result.current.toggleTheme).toBe('function');
    });
  });

  describe('Integration with components', () => {
    function TestComponent() {
      const { theme, isDark, toggleTheme } = useTheme();

      return (
        <div>
          <span data-testid="theme-value">{theme}</span>
          <span data-testid="is-dark-value">{isDark.toString()}</span>
          <button onClick={toggleTheme} data-testid="toggle-button">
            Toggle Theme
          </button>
        </div>
      );
    }

    it('should render with correct initial theme', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
      expect(screen.getByTestId('is-dark-value')).toHaveTextContent('true');
    });

    it('should update when toggle button is clicked', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const toggleButton = screen.getByTestId('toggle-button');

      await user.click(toggleButton);

      await waitFor(() => {
        expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
        expect(screen.getByTestId('is-dark-value')).toHaveTextContent('false');
      });
    });

    it('should update document classes when toggle button is clicked', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      // Initial state
      expect(document.documentElement.classList.contains('dark')).toBe(true);

      const toggleButton = screen.getByTestId('toggle-button');
      await user.click(toggleButton);

      await waitFor(() => {
        expect(document.documentElement.classList.contains('light')).toBe(true);
        expect(document.documentElement.classList.contains('dark')).toBe(false);
      });
    });
  });
});
