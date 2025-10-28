# Ticket Flow - Ticket Management Application

A modern, responsive ticket management system built with React, TypeScript, and Vite. This application allows users to create, manage, and track support tickets with an intuitive interface and dark/light theme support.

## 📋 Table of Contents

- [Frameworks and Libraries](#frameworks-and-libraries)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Framework Versions](#framework-versions)
- [UI Components and State Structure](#ui-components-and-state-structure)
- [Accessibility](#accessibility)
- [Known Issues](#known-issues)
- [Test User Credentials](#test-user-credentials)

## 🚀 Frameworks and Libraries

### Core Technologies
- **React** (v19.1.1) - UI library for building interactive user interfaces
- **TypeScript** (v5.9.3) - Type-safe JavaScript superset
- **Vite** (v7.1.7) - Fast build tool and development server

### UI Framework & Styling
- **Tailwind CSS** (v4.1.16) - Utility-first CSS framework


### Component Libraries
- **Radix UI** - Accessible, unstyled UI primitives
  - `@radix-ui/react-alert-dialog` (v1.1.15)
  - `@radix-ui/react-dialog` (v1.1.15)
  - `@radix-ui/react-dropdown-menu` (v2.1.16)
  - `@radix-ui/react-label` (v2.1.7)
  - `@radix-ui/react-select` (v2.2.6)
  - `@radix-ui/react-slot` (v1.2.3)

### Routing & Navigation
- **react-router** (v7.9.4) - Declarative routing for React
- **react-router-dom** (v7.9.4) - DOM bindings for React Router

### Icons & Theming
- **lucide-react** (v0.546.0) - Beautiful & consistent icon library
- **next-themes** (v0.4.6) - Theme management with dark mode support

### Utilities
- **sonner** (v2.0.7) - Toast notifications
- **clsx** (v2.1.1) - Conditional CSS class utility

### Development Tools
- **ESLint** (v9.36.0) - Code linting

## 🛠️ Setup and Installation

### Prerequisites
- **Node.js** (v18.x or higher recommended)
- **npm** or **yarn** package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/juskins/Ticket-management-app
   cd "Ticket Flow"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or with yarn:
   ```bash
   yarn install
   ```

3. **Verify installation**
   Ensure all dependencies are installed without errors.

## ▶️ Running the Application

### Development Mode
Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build
Build the application for production:

```bash
npm run build
```

This command:
- Compiles TypeScript files
- Bundles the application with Vite
- Outputs optimized files to the `dist` directory

### Preview Production Build
Preview the production build locally:

```bash
npm run preview
```

### Linting
Run ESLint to check for code issues:

```bash
npm run lint
```

## 🔄 Framework Versions

### Current Version: React

This application is currently built with **React 19.1.1** and TypeScript.

### Switching to Vue (Not Implemented)

To create a Vue version of this application:

1. Create a new Vite project with Vue:
   ```bash
   npm create vite@latest ticket-flow-vue -- --template vue-ts
   ```

2. Install similar UI dependencies:
   - Use **Headless UI** or **Radix Vue** for accessible components
   - Use **Vue Router** for routing
   - Adapt state management to use Vue's Composition API or Pinia

3. Port components from `src/components` and `src/pages` to Vue SFC format

### Switching to Twig (Not Implemented)

To create a Twig (PHP template engine) version:

1. Set up a PHP environment with Symfony or standalone Twig:
   ```bash
   composer require twig/twig
   ```

2. Convert React components to Twig templates:
   - JSX components → `.twig` template files
   - React state → PHP backend state management
   - Client-side routing → Server-side routing

3. Rebuild the UI using:
   - Tailwind CSS (can be used with Twig)
   - Alpine.js for interactivity (as a React alternative)

**Note**: Vue and Twig versions require significant architectural changes and are separate implementations rather than simple switches.

## 🧩 UI Components and State Structure

### Component Architecture

The application follows a modular component structure:

#### Layout Components
- **`dashboardLayout.tsx`** - Main layout wrapper with navigation and header
- **`header.tsx`** - Top navigation bar with user actions
- **`theme-provider.tsx`** - Theme context provider for dark/light mode

#### UI Components (Shadcn-based)
Located in `src/components/ui/`:
- **`alert-dialog.tsx`** - Confirmation dialogs
- **`badge.tsx`** - Status badges (Open, In Progress, Closed)
- **`button.tsx`** - Reusable button component with variants
- **`card.tsx`** - Container component for content sections
- **`dialog.tsx`** - Modal dialogs for forms
- **`dropdown-menu.tsx`** - Dropdown menus for actions
- **`input.tsx`** - Form input fields
- **`label.tsx`** - Form labels
- **`select.tsx`** - Dropdown select component
- **`textarea.tsx`** - Multi-line text input
- **`sonner.tsx`** - Toast notification wrapper

#### Pages
Located in `src/pages/`:
- **`landingpage.tsx`** - Marketing/landing page
- **`loginpage.tsx`** - User authentication page
- **`signuppage.tsx`** - User registration page with validation
- **`dashboard.tsx`** - Main dashboard overview
- **`tickets.tsx`** - Ticket management interface

### User Authentication

The application includes a complete authentication flow:

#### Signup Page (`/signup`)
- **Full Name Validation**: Minimum 2 characters required
- **Email Validation**: Standard email format validation using regex
- **Password Requirements**:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
- **Password Confirmation**: Must match the password field
- **Password Visibility Toggle**: Eye icon to show/hide password
- **Real-time Validation**: Errors appear as users type
- **Duplicate Email Check**: Prevents registration with existing email
- **Auto-login**: Users are automatically logged in after successful signup
- **Toast Notifications**: Success/error feedback using Sonner

#### Login Page (`/login`)
- Supports both registered users and demo credentials
- Session management via localStorage
- Integrates with user database created during signup

### State Management

The application uses **React's built-in state management**:

- **Local Component State** (`useState`)
  - Form inputs
  - Modal open/close states
  - Filtered ticket lists
  - Search queries

- **Effect Hooks** (`useEffect`)
  - Data fetching on component mount
  - Local storage synchronization
  - Side effects for ticket operations

- **Navigation State** (`react-router`)
  - Route parameters
  - Navigation history
  - Protected routes

### Data Structure

**Ticket Object:**
```typescript
interface TicketType {
  id: string;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Closed";
  createdAt: string;
}
```

**Activity Object:**
```typescript
interface ActivityType {
  id: string;
  action: string;
  user: string;
  timestamp: string;
}
```

## ♿ Accessibility

### Accessibility Features

1. **Keyboard Navigation**
   - All interactive elements are keyboard accessible
   - Tab order follows logical page flow
   - Focus indicators on all focusable elements

2. **ARIA Attributes**
   - Radix UI components include proper ARIA attributes
   - Dialog components have `aria-labelledby` and `aria-describedby`
   - Buttons have descriptive labels

3. **Color Contrast**
   - Tailwind CSS classes ensure WCAG AA compliance
   - Dark and light themes maintain sufficient contrast ratios

4. **Screen Reader Support**
   - Semantic HTML elements used throughout
   - Form labels properly associated with inputs
   - Status badges have descriptive text

5. **Focus Management**
   - Dialogs trap focus when open
   - Focus returns to trigger element on close
   - Skip links available for main content

### Testing Recommendations

- Test with screen readers (NVDA, JAWS, VoiceOver)
- Verify keyboard-only navigation
- Check color contrast ratios
- Validate HTML semantics

## ⚠️ Known Issues

1. **Data Persistence**
   - Currently uses `localStorage` for data storage
   - No backend API integration yet
   - Data is browser-specific and not synced across devices

2. **Authentication**
   - Login is simulated with mock validation
   - No actual authentication backend
   - Session management is basic

3. **Real-time Updates**
   - No WebSocket or real-time sync
   - Changes require manual page refresh in multi-user scenarios

4. **File Attachments**
   - Ticket attachments not implemented
   - No file upload functionality

5. **Pagination**
   - Large ticket lists may have performance issues
   - Pagination/virtual scrolling not implemented

6. **Mobile Responsiveness**
   - Some dialogs may need UX improvements on small screens
   - Touch interactions not fully optimized

7. **Browser Compatibility**
   - Tested primarily on Chrome/Edge
   - Some features may require modern browser support

## 🔐 Test User Credentials

Use these credentials to test the application:

### Option 1: Create Your Own Account
1. Navigate to `/signup` or click "Create New Account" on the login page
2. Fill in the registration form with:
   - Full Name (minimum 2 characters)
   - Valid email address
   - Strong password (8+ chars, uppercase, lowercase, number)
   - Matching password confirmation
3. Click "Sign Up" to create your account
4. You'll be automatically logged in and redirected to the dashboard

### Option 2: Use Demo Credentials
- **Email**: `demo@ticketflow.com`
- **Password**: `password123`
- **Role**: Demo User

### User Data Storage
- User accounts are stored in browser's `localStorage` under the `users` key
- Session information is stored under `ticketapp_session` key
- To reset all users, clear localStorage or use browser DevTools

**Note**: This is a frontend-only authentication system for demonstration purposes. In production, user credentials should be:
- Hashed and salted (never stored as plain text)
- Validated on a secure backend
- Protected with proper session management
- Secured with HTTPS

---

## 📝 Additional Notes

### Theme Support
The application supports both dark and light modes. Users can toggle themes using the theme switcher in the header.

### Path Aliases
The project uses `@` as an alias for the `src` directory:
```typescript
import { Button } from "@/components/ui/button";
```

### Code Quality
- TypeScript strict mode enabled
- ESLint configured for React best practices
- Code formatting recommended with Prettier (not included)

---

**Built with ❤️ using React, TypeScript, and Vite**
