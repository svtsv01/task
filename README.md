# Todo App - React

A modern, responsive todo application built with React. This app helps you manage your tasks with a beautiful dark theme interface, real-time statistics, and mobile-friendly design.

>**Deployed at: http://my-cool-todo-app.s3-website-ap-southeast-2.amazonaws.com**

## Technology Stack

I chose **Vite + React** for this project because of its lightning-fast development experience and excellent build performance. While I'm aware of Next.js and its benefits, Vite was the perfect choice for this client-side todo app due to its simplicity and speed.

### Core Technologies
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Lucide React** - Beautiful, customizable icons
- **CSS3** - Custom styling with CSS variables for theming

### Key Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Statistics Dashboard** - Visual progress tracking with pie charts
- **Smart Filtering** - Filter by status (All, Pending, Completed)
- **Sorting Options** - Sort by date or alphabetically
- **Pagination** - Handle large numbers of todos efficiently
- **User Authentication** - Secure login and registration system

## Project Structure:

The app is organized in a clean, maintainable structure:

```
my-react-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Auth/           # Authentication components
│   │   ├── ToDo/           # Todo-related components
│   │   └── utils/          # Utility components
│   ├── pages/              # Main application screens
│   ├── api/                # API service functions
│   ├── context/            # React context for state management
│   ├── styles/             # CSS files and styling
│   └── constants.js        # Application constants
├── public/                 # Static assets
└── __tests__/             # Test files
```

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/svtsv01/task
   cd task/my-react-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit the .env file with your configuration
   # The .env file is already in .gitignore for security
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the app in action!

### Environment Variables

The application uses environment variables for configuration. Create a `.env` file in the root directory (it's already included in `.gitignore` for security):

```bash
# API Configuration
VITE_API_BASE_URL=https://dummyjson.com
```

**Important Notes:**
- The `.env` file is **automatically ignored by Git** for security
- Use `.env.example` as a template for required environment variables
- All environment variables must be prefixed with `VITE_` to be accessible in the React app
- Never commit sensitive information like API keys or passwords

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

## Deployment

### CI/CD Pipeline

This project uses **GitHub Actions** for continuous integration and deployment. Here's what happens on every push:

1. **Automated Testing** - Runs the full test suite
2. **Code Quality Checks** - ESLint validation
3. **Build Process** - Creates optimized production build
4. **Deployment** - Automatically deploys to AWS S3 static website hosting

### AWS S3 Static Website Hosting

The app is deployed to AWS S3 with static website hosting enabled. This provides:
- **Fast Loading** - CDN distribution for global performance
- **Cost Effective** - Pay only for storage and data transfer
- **Scalable** - Handles traffic spikes automatically

### Deployment Link

**Live Application**: http://my-cool-todo-app.s3-website-ap-southeast-2.amazonaws.com**

## Features in Detail

### Authentication System
- Secure login and registration
- JWT token-based authentication
- Protected routes
- Session persistence

### Todo Management
- Create, edit, and delete todos
- Mark todos as complete/pending
- Real-time status updates
- Bulk operations support

### User Experience
- Intuitive mobile-first design
- Smooth animations and transitions
- Keyboard shortcuts for power users
- Accessibility features

