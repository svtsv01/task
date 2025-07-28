# Todo App - Technical Documentation

A comprehensive technical guide for the React-based todo application with detailed implementation specifications, architecture patterns, and development guidelines.

### Installation

1. **Clone the repository**
   ```bash
   cd task/my-react-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the app in action!

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run test suite

## Testing

I've set up a comprehensive testing suite using React Testing Library and Jest. The tests cover:
- Component rendering and interactions
- API service functions
- Utility functions and hooks
- Form validation

Run the tests with:
```bash
npm test
```

## Table of Contents
- [Architecture Overview](#architecture-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Implementation Details](#implementation-details)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Component Architecture](#component-architecture)
- [Styling System](#styling-system)
- [Testing Strategy](#testing-strategy)
- [Deployment Architecture](#deployment-architecture)

## Architecture Overview

The application follows a **component-based architecture** with clear separation of concernsю

### Design Patterns Used
- **Container/Presentational Pattern** - Separation of logic and presentation
- **Custom Hooks Pattern** - Reusable business logic
- **Context Pattern** - Global state management
- **Service Layer Pattern** - API abstraction
- **Component Composition** - Flexible component reuse

## Technology Stack

### Core Framework
- **React 18.2.0** - Latest React with concurrent features
- **Vite 5.0.0** - Fast build tool and dev server
- **React Router 6.8** - Client-side routing

### Development Tools
- **ESLint** - Code linting and quality
- **Jest + React Testing Library** - Testing framework
- **Lucide React** - Icon library

### Build & Deployment
- **Vite Build** - Production optimization
- **GitHub Actions** - CI/CD pipeline
- **AWS S3** - Static hosting

## Project Structure

```
my-react-app/
├── src/
│   ├── components/                    # Reusable UI components
│   │   ├── Auth/                     # Authentication components
│   │   │   ├── AuthForm.jsx          # Form wrapper component
│   │   │   ├── AuthInput.jsx         # Input field component
│   │   │   ├── SocialLogin.jsx       # Social login buttons
│   │   │   └── validate.js           # Form validation logic
│   │   ├── ToDo/                     # Todo-related components
│   │   │   ├── ToDoItem/             # Individual todo components
│   │   │   │   ├── TodoItem.jsx      # Main todo item component
│   │   │   │   └── todoConfig.jsx    # Todo status configuration
│   │   │   ├── ToDoList/             # Todo list components
│   │   │   │   ├── TodoList.jsx      # Main list component
│   │   │   │   └── useTodos.js       # Custom hook for todo logic
│   │   │   ├── AddTodoForm.jsx       # Add new todo form
│   │   │   ├── SortControls.jsx      # Sorting and filtering
│   │   │   ├── StatisticsWidget.jsx  # Progress statistics
│   │   │   ├── Pagination.jsx        # Page navigation
│   │   │   └── MobileMenu.jsx        # Mobile menu overlay
│   │   ├── Header.jsx                # Application header
│   │   ├── Footer.jsx                # Application footer
│   │   └── utils/                    # Utility components
│   │       └── greetings.js          # Greeting hook
│   ├── pages/                        # Main application screens
│   │   ├── MainScreen.jsx            # Main todo interface
│   │   ├── SignInScreen.jsx          # Login screen
│   │   └── SignupScreen.jsx          # Registration screen
│   ├── api/                          # API service layer
│   │   ├── authService.js            # Authentication API
│   │   └── toDoService.js            # Todo CRUD operations
│   ├── context/                      # React context providers
│   │   └── TodoContext.jsx           # Global todo state
│   ├── styles/                       # CSS styling
│   │   ├── index.css                 # Global styles and variables
│   │   ├── App.css                   # App-level styles
│   │   ├── Auth.css                  # Authentication styles
│   │   └── Main.css                  # Main application styles
│   ├── constants.js                  # Application constants
│   ├── App.jsx                       # Main app component
│   ├── main.jsx                      # Application entry point
│   └── setupTests.js                 # Test configuration
├── public/                           # Static assets
├── __tests__/                        # Test files
├── package.json                      # Dependencies and scripts
├── vite.config.js                    # Vite configuration
└── eslint.config.js                  # ESLint configuration
```

## Implementation Details

### Entry Point Configuration
```javascript
// main.jsx - Application bootstrap
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### Routing Architecture
```javascript
// App.jsx - Route configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <TodoProvider>
          <MainScreen />
        </TodoProvider>
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <SignInScreen />,
  },
  {
    path: '/signup',
    element: <SignUpScreen />,
  },
]);
```

### Protected Route Implementation
```javascript
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Navigate to='/login' replace />;
  }
  return children;
};
```

## State Management

### Context API Implementation
```javascript
// TodoContext.jsx - Global state management
export const TodoProvider = ({ children }) => {
  const [sortBy, setSortBy] = useState(SORT_MODES.DEFAULT);
  const [activeStatus, setActiveStatus] = useState('all');

  const value = {
    sortBy,
    setSortBy,
    activeStatus,
    setActiveStatus,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
```

### Custom Hook Pattern
```javascript
// useTodos.js - Business logic abstraction
export const useTodos = (sortBy, activeStatus) => {
  const [allTodos, setAllTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Memoized computations
  const sortedTodos = useMemo(() => {
    return [...allTodos].sort((a, b) => {
      if (sortBy === SORT_MODES.ALPHA) {
        return a.todo.localeCompare(b.todo);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [allTodos, sortBy]);

  // Return state and handlers
  return {
    loading,
    error,
    allTodos,
    paginatedTodos,
    totalPages,
    currentPage,
    handleAddTodo,
    handleChangeStatus,
    handleDelete,
    handleEdit,
    setCurrentPage,
  };
};
```

## API Integration

### Service Layer Pattern
```javascript
// toDoService.js - API abstraction
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchTodosByUserId = async (userId, limit = 10, skip = 0) => {
  if (!userId) {
    throw new Error("User ID is required to fetch todos.");
  }
  
  const response = await fetch(`${API_BASE_URL}/users/${userId}/todos`);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch todos.');
  }
  
  const paginatedTodos = data.todos.slice(skip, skip + limit);
  return {
    todos: paginatedTodos,
    total: data.total,
  };
};
```

### Error Handling Strategy
- **Try-catch blocks** for async operations
- **User-friendly error messages** with fallbacks
- **Loading states** for better UX
- **Graceful degradation** for offline scenarios

## Component Architecture

### Component Hierarchy
```
App
├── RouterProvider
    ├── ProtectedRoute
    │   └── TodoProvider
    │       └── MainScreen
    │           ├── Header
    │           ├── TodoList
    │           │   ├── AddTodoForm
    │           │   ├── SortControls
    │           │   ├── TodoGrid
    │           │   │   └── TodoItem (multiple)
    │           │   ├── Pagination
    │           │   └── StatisticsWidget
    │           └── Footer
    ├── SignInScreen
    │   └── AuthForm
    └── SignUpScreen
        └── AuthForm
```

### Component Communication
- **Props** - Parent to child communication
- **Context** - Global state sharing
- **Custom Events** - Child to parent communication
- **Custom Hooks** - Logic sharing between components

## Styling System

### CSS Architecture
```css
/* CSS Variables for theming */
:root {
  --primary-blue: #3b82f6;    /* Primary brand color */
  --dark-bg: #1f2937;         /* Dark background */
  --dark-card: #374151;       /* Card background */
  --gray-text: #9ca3af;       /* Muted text */
  --light-text: #f9fafb;      /* Light text */
}
```

### Responsive Design Strategy
- **Mobile-first approach** with progressive enhancement
- **CSS Grid** for flexible layouts
- **Flexbox** for component alignment
- **Media queries** for breakpoint management

### Component-Specific Styles
- **Scoped CSS classes** for component isolation
- **BEM methodology** for class naming
- **CSS custom properties** for dynamic theming
- **Transition animations** for smooth interactions

## Testing Strategy

### Test Coverage Areas:

- **Component rendering** - Visual output verification
- **User interactions** - Click, input, form submission
- **API integration** - Service function testing
- **State management** - Context and hook testing
- **Utility functions** - Pure function testing

### Testing Tools:

```javascript
// Example test structure
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from '../TodoItem';

describe('TodoItem', () => {
  test('renders todo text correctly', () => {
    const mockTodo = { id: 1, todo: 'Test todo', state: 'STATE_PENDING' };
    render(<TodoItem task={mockTodo} />);
    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });
});
```

## Deployment Architecture:

### CI/CD Pipeline
```yaml
# GitHub Actions workflow structure
name: Deploy to AWS S3
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Run linting
        run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Build application
        run: npm run build
      - name: Deploy to S3
        uses: aws-actions/configure-aws-credentials@v1
```

### AWS Infrastructure
- **S3 Bucket** - Static website hosting
- **IAM Roles** - Secure access management


---

**Technical Stack**: React 18 + Vite + AWS S3  
**Architecture**: Component-based with Context API  
**Testing**: Jest + React Testing Library  
**Deployment**: GitHub Actions + AWS S3
