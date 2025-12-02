# Testing Structure

This directory contains the testing infrastructure for the Nexus Audio Platform client application.

## Testing Stack

- **Vitest**: Fast unit test framework built on Vite
- **React Testing Library**: For testing React components
- **@testing-library/jest-dom**: Custom matchers for DOM assertions
- **@testing-library/user-event**: User interaction simulation

## Directory Structure

```
src/
├── tests/
│   ├── setup.ts                    # Global test setup and configuration
│   └── README.md                   # This file
├── contexts/
│   ├── __tests__/
│   │   └── ThemeContext.test.tsx   # ThemeContext tests
│   └── ThemeContext.tsx
├── components/
│   └── layout/
│       ├── __tests__/
│       │   └── Navbar.test.tsx     # (To be created)
│       └── Navbar.tsx
├── features/
│   └── catalog/
│       ├── __tests__/
│       │   └── GenreCard.test.tsx  # (To be created)
│       └── components/
│           └── GenreCard.tsx
```

## Test Organization

Each feature/component should have its tests in a `__tests__` directory adjacent to the source code:

```
MyComponent/
├── __tests__/
│   └── MyComponent.test.tsx
├── MyComponent.tsx
└── index.ts
```

## Running Tests

```bash
# Run tests in watch mode (recommended during development)
npm test

# Run tests once (useful for CI/CD)
npm run test:run

# Run tests with UI (visual test runner)
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Writing Tests

### Unit Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Integration Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyForm from '../MyForm';

describe('MyForm', () => {
  it('should submit form data', async () => {
    const user = userEvent.setup();
    render(<MyForm />);

    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText('Success!')).toBeInTheDocument();
  });
});
```

## Testing Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Use Data-TestIds Sparingly**: Prefer accessible queries (getByRole, getByLabelText)
3. **Test User Interactions**: Simulate real user behavior with user-event
4. **Keep Tests Isolated**: Each test should be independent
5. **Write Descriptive Test Names**: Use "should..." pattern
6. **Test Edge Cases**: Don't just test the happy path
7. **Mock External Dependencies**: Use Vitest's mocking capabilities
8. **Clean Up After Tests**: Use beforeEach/afterEach hooks

## Test Coverage Goals

- **Unit Tests**: Aim for 80%+ coverage on utility functions and hooks
- **Component Tests**: Test all interactive components
- **Integration Tests**: Test critical user flows
- **E2E Tests**: (Future) Test complete user journeys

## Mocking

### LocalStorage

LocalStorage is automatically mocked in `setup.ts`. You can control its behavior:

```typescript
beforeEach(() => {
  localStorage.getItem.mockReturnValue('dark');
});
```

### API Calls

```typescript
import { vi } from 'vitest';

const mockFetch = vi.fn();
global.fetch = mockFetch;

mockFetch.mockResolvedValue({
  json: async () => ({ data: 'mock data' })
});
```

## Future Improvements

- [ ] Add E2E tests with Playwright
- [ ] Add visual regression testing
- [ ] Add performance testing
- [ ] Set up CI/CD test automation
- [ ] Add test coverage reporting to PR checks
