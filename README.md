# NeuroBridge
## Unified Dementia Care Management Platform

[![React](https://img.shields.io/badge/React-19.2.6-blue?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.0.12-purple?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3.0-38B2AC?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

NeuroBridge is a comprehensive, role-based healthcare platform designed to streamline early-stage dementia care. It connects patients, caregivers, and healthcare providers in a unified ecosystem, enabling real-time monitoring, seamless communication, and coordinated care management.

**Built for the real world**: Fully functional frontend application with no backend dependencies—runs entirely on localStorage for quick prototyping and offline capability.

---

## Table of Contents

- [Key Features](#key-features)
- [The Three Portals](#the-three-portals)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Building for Production](#building-for-production)
- [Demo Accounts](#demo-accounts)
- [Architecture & State Management](#architecture--state-management)
- [Design System](#design-system)
- [API & Data Flow](#api--data-flow)
- [Development](#development)
- [How to Contribute](#how-to-contribute)
- [License](#license)

---

## Key Features

### Multi-Role Authentication
- Secure role-based access control (Patient, Caregiver, Doctor)
- Demo account system for quick testing
- Persistent session management via Context API

### Real-Time Location Tracking
- Live GPS tracking of patients with map visualization
- Geofencing alerts for caregivers
- Location history and route tracking

### Medicine Management
- Comprehensive medicine schedules and reminders
- Compliance tracking and alerts
- Prescription management by doctors

### Memory & Cognitive Tools
- Memory journal for patients to log daily thoughts
- Brain games for cognitive stimulation
- Progress tracking and cognitive assessments

### Secure Communication
- Doctor-Caregiver messaging system
- Real-time notifications
- Telemedicine console for video consultations

### Analytics & Insights
- Cognitive progress charts and trends
- Wellbeing metrics dashboard
- Patient analytics for doctors

### Emergency SOS System
- One-tap emergency alert for patients
- Instant caregiver notification
- Visual SOS banner with auto-dismiss

### Appointment Management
- Schedule doctor-patient appointments
- Doctor availability management
- Appointment reminders and history

---

## The Three Portals

### **Patient Portal**
*Designed for simplicity and accessibility*

- **Dashboard**: Quick overview of medicines, upcoming appointments, and messages
- **Medicines**: View today's schedule with visual indicators
- **Journal**: Personal memory log with timestamps
- **People**: Emergency contacts and care network
- **Games**: Cognitive brain games for mental stimulation
- **SOS**: One-button emergency alert system

**Design Philosophy**: Intentionally minimal interface. The patient portal does not carry operational weight—passive monitoring runs automatically via caregiver oversight.

### **Caregiver Portal**
*Real-time monitoring and care coordination*

- **Dashboard**: At-a-glance patient status, medicines due, and alerts
- **Location**: Live GPS map tracking with geofencing
- **Medicines**: Track patient compliance and manage prescriptions
- **Messages**: Communicate with doctors and keep notes
- **Appointments**: Schedule and manage patient appointments
- **Care Plan**: Document and track care strategies
- **Wellbeing**: Monitor mood, sleep, nutrition, and activity levels

**Key Capability**: Caregivers are the operational backbone—they monitor, alert, and coordinate care without requiring patient device engagement.

### **Doctor Portal**
*Comprehensive patient management and clinical insights*

- **Dashboard**: Patient census with critical alerts
- **Patients**: Full patient registry with search and filters
- **Patient Profile**: Detailed clinical history, medications, notes
- **Appointments**: Manage schedule and consultation history
- **Messages**: Direct communication with caregivers
- **Telemedicine**: Video consultation interface
- **Analytics**: Cognitive trends, compliance rates, and outcomes

**Key Capability**: Doctors have complete visibility into patient populations with powerful analytics for clinical decision-making.

---

## Tech Stack

| Layer       | Technology              | Purpose                                    |
|-------------|-------------------------|--------------------------------------------|
| **Framework** | React 19.2.6          | UI library and component management        |
| **Routing** | React Router v7.15.1    | Client-side routing and navigation          |
| **Styling** | Tailwind CSS 4.3.0      | Utility-first CSS framework                 |
| **UI Components** | Lucide React 1.16.0 | Icon library (200+ icons)                   |
| **Charts** | Recharts 3.8.1          | Responsive charts for analytics             |
| **Animations** | Framer Motion 12.39.0 | Smooth animations and transitions           |
| **Build Tool** | Vite 8.0.12            | Lightning-fast bundler and dev server       |
| **State Management** | React Context API | Global state without Redux                  |
| **Persistence** | localStorage          | Client-side data persistence                |
| **Linting** | ESLint 10.3.0           | Code quality and standards                  |

### Design Principles

- **Offline-First**: All data stored locally (no backend required)
- **Accessibility**: WCAG-compliant, keyboard navigation support
- **Performance**: Optimized with Vite, tree-shaking, code splitting
- **Responsive**: Mobile-first design that works on all screen sizes
- **Type Safety**: PropTypes validation for all components

---

## Project Structure

```
NeuroBridge/
├── public/                           # Static assets
├── src/
│   ├── components/
│   │   └── SharedLayout.jsx          # Wrapper component: sidebar, topbar, SOS banner
│   │
│   ├── context/
│   │   └── AppContext.jsx            # Global state management
│   │                                  # Includes: user auth, patient data, messages,
│   │                                  # appointments, location tracking, SOS logic
│   │
│   ├── data/
│   │   ├── initialData.js            # Seed data for demo accounts
│   │   └── patientsData.js           # Patient profiles and mock data
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx           # Welcome page with role selection
│   │   ├── LoginPage.jsx             # Authentication gate
│   │   │
│   │   ├── patient/                  # Patient Portal
│   │   │   ├── Dashboard.jsx         # Quick overview & pending items
│   │   │   ├── Medicines.jsx         # Today's schedule & compliance
│   │   │   ├── Journal.jsx           # Memory journal with timestamps
│   │   │   ├── People.jsx            # Emergency contacts
│   │   │   ├── Games.jsx             # Cognitive brain games
│   │   │   └── SOS.jsx               # Emergency alert page
│   │   │
│   │   ├── caregiver/                # Caregiver Portal
│   │   │   ├── Dashboard.jsx         # Patient status overview
│   │   │   ├── Location.jsx          # GPS tracking map
│   │   │   ├── Medicines.jsx         # Prescription management
│   │   │   ├── Messages.jsx          # Doctor communication
│   │   │   ├── Appointments.jsx      # Schedule management
│   │   │   ├── Careplan.jsx          # Care strategy documentation
│   │   │   └── Wellbeing.jsx         # Health metrics tracking
│   │   │
│   │   └── doctor/                   # Doctor Portal
│   │       ├── Dashboard.jsx         # Patient census & alerts
│   │       ├── Patients.jsx          # Patient registry
│   │       ├── PatientProfile.jsx    # Detailed patient clinical data
│   │       ├── Appointments.jsx      # Consultation scheduling
│   │       ├── Messages.jsx          # Caregiver messaging
│   │       ├── Telemedicine.jsx      # Video consultation interface
│   │       └── Analytics.jsx         # Clinical trends & insights
│   │
│   ├── utils/
│   │   └── predictionLogic.js        # Cognitive assessment calculations
│   │
│   ├── App.jsx                       # Main router and app layout
│   ├── index.css                     # Design system variables, animations
│   └── main.jsx                      # React entry point
│
├── index.html                        # HTML template
├── vite.config.js                    # Vite configuration
├── tailwind.config.js                # Tailwind design tokens
├── eslint.config.js                  # ESLint configuration
├── package.json                      # Dependencies and scripts
└── README.md                         # This file
```

### Component Hierarchy

```
App (Router)
├── LandingPage
├── LoginPage
└── SharedLayout (for all authenticated routes)
    ├── Sidebar Navigation
    ├── Topbar (User, Time, Settings)
    ├── SOS Alert Banner
    ├── Route Content (Patient/Caregiver/Doctor Pages)
    └── Toast Notifications
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 16.x (includes npm)
- **npm** ≥ 8.x
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/neurobridge.git
   cd NeuroBridge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   npm run lint
   ```

### Running the Application

**Development Server** (with hot reload)
```bash
npm run dev
```
Then open [http://localhost:5173](http://localhost:5173) in your browser.

**Preview Production Build**
```bash
npm run build
npm run preview
```

### Building for Production

```bash
npm run build
```
This generates an optimized build in the `dist/` folder ready for deployment.

---

## Demo Accounts

NeuroBridge comes with pre-populated demo accounts for testing. Click "Demo Login" on the login page or use these credentials:

### Patient Account
- **Role**: Patient
- **Name**: Sarah Mitchell
- **Status**: Early-stage Alzheimer's diagnosis
- **Use Case**: Test the simplified patient interface

### Caregiver Account
- **Role**: Caregiver
- **Name**: Michael Chen
- **Relationship**: Son
- **Use Case**: Test monitoring, location tracking, messaging, and care management

### Doctor Account
- **Role**: Doctor
- **Name**: Dr. Emily Rodriguez
- **Specialty**: Neurology
- **Use Case**: Test clinical dashboard, patient registry, analytics

**Note**: All demo data is stored in localStorage. Refreshing or clearing browser data will reset to initial state.

---

## Architecture & State Management

### AppContext (Global State)

The entire application state is managed via React Context API in [src/context/AppContext.jsx](src/context/AppContext.jsx):

**State Structure**:
```javascript
{
  user: { id, name, role, profilePicture },
  patients: [{ id, name, age, condition, medicines... }],
  caregivers: [{ ... }],
  doctors: [{ ... }],
  messages: [{ from, to, text, timestamp... }],
  appointments: [{ patientId, doctorId, date, notes... }],
  location: { patientId, latitude, longitude, timestamp },
  sos: { active, initiatedBy, timestamp },
  notifications: [{ id, message, type, read }],
  medicines: [{ id, name, dosage, schedule... }],
  wellbeingMetrics: { sleep, mood, nutrition, activity },
  journalEntries: [{ date, content, mood... }]
}
```

**Key Dispatchers**:
- `setUser()` — Handle authentication
- `updatePatient()` — Modify patient data
- `sendMessage()` — Add message to state
- `triggerSOS()` — Emergency alert logic
- `updateLocation()` — Track patient location
- `addJournalEntry()` — Memory journal entries

### Data Persistence

All state is automatically persisted to localStorage with the key `neurobridge_state`. On app load, the context rehydrates from localStorage. For demo/reset purposes, manually clear browser storage.

### Key Features Implementation

**SOS System**: 
- Triggered via patient portal or SharedLayout banner
- Sets global SOS state with timestamp
- Caregiver receives instant notification
- Auto-dismisses after 5 minutes or manual clear

**Location Tracking**:
- Simulated GPS coordinates in initial data
- Real-time updates every 30 seconds (configurable)
- Geofencing logic: if distance > threshold → alert

**Medicine Compliance**:
- Daily schedule from patient's prescription list
- Marked as taken/missed
- Compliance rate calculated in analytics

---

## Design System

### Color Palette

- **Primary**: Emerald/Green (#10b981) — Trust and health
- **Secondary**: Blue (#3b82f6) — Informational
- **Danger**: Red (#ef4444) — Alerts and SOS
- **Warning**: Amber (#f59e0b) — Caution
- **Neutral**: Slate (#64748b) — Text and backgrounds

### Typography

- **Font Family**: Inter via Google Fonts
- **Headings**: Bold, 18px–36px
- **Body**: Regular, 14px–16px
- **Code**: Monospace, 12px–14px

### Component Patterns

- **Buttons**: Primary (filled), Secondary (outline), Danger
- **Forms**: Labeled inputs, select dropdowns, textareas
- **Cards**: Elevated with shadow on hover
- **Modals**: Centered, with backdrop blur
- **Alerts**: Inline validation with icon indicators

---

## API & Data Flow

### Authentication Flow

```
1. User visits / (LandingPage)
2. Choose role → Navigate to /login
3. Enter credentials or Demo Login
4. AppContext validates & sets user state
5. Redirect to role-specific dashboard
6. All subsequent routes wrapped with SharedLayout
```

### Messaging Flow

```
Sender (Message Input)
  ↓
AppContext dispatches sendMessage()
  ↓
Message added to state + localStorage
  ↓
Receiver component (Messages page) re-renders with new message
  ↓
Toast notification for receiver (if online)
```

### SOS Alert Flow

```
Patient triggers SOS (button or banner)
  ↓
triggerSOS() sets sos.active = true
  ↓
SharedLayout renders red SOS banner
  ↓
Caregiver receives notification
  ↓
Caregiver can dismiss or respond with messaging
  ↓
SOS auto-clears after 5 min or manual clear
```

---

## Development

### Running ESLint

```bash
npm run lint
```

### Code Style

- **Format**: Airbnb JavaScript style guide
- **Indent**: 2 spaces
- **Semicolons**: Enabled
- **Quotes**: Double quotes for JSX, single for JS strings

### Best Practices

1. **Component Structure**:
   - Functional components with hooks
   - Props validation with PropTypes
   - One component per file (unless helper components)

2. **State Management**:
   - Use Context API for global state
   - Use `useState` for local component state
   - Avoid prop drilling

3. **Performance**:
   - Memoize expensive components with `React.memo`
   - Use `useCallback` for event handlers
   - Code-split route components automatically with Vite

4. **Accessibility**:
   - Use semantic HTML (`<button>`, `<nav>`, `<main>`)
   - Add alt text to images
   - Ensure color contrast ratios meet WCAG AA
   - Support keyboard navigation

### Testing (Future)

```bash
npm run test          # Run test suite
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
```

---

## How to Contribute

We welcome contributions! Here's how to get started:

1. **Fork the repository** on GitHub
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** with clear, descriptive commits
4. **Run linting** to ensure code quality
   ```bash
   npm run lint
   ```
5. **Test thoroughly** in all three portals (Patient, Caregiver, Doctor)
6. **Push to your fork** and create a **Pull Request**
7. **Describe your changes** in the PR description

### Guidelines

- **Commit Messages**: Use present tense ("Add feature" not "Added feature")
- **Code Style**: Follow ESLint configuration (npm run lint)
- **Testing**: Test your changes in dev mode before submitting
- **Documentation**: Update README for new features or architectural changes
- **Issue Resolution**: Reference related issues in commit messages

### Future Roadmap

- [ ] Backend API integration (Node.js + Express)
- [ ] PostgreSQL database implementation
- [ ] Real-time communication with Socket.io
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (i18n)
- [ ] Offline-first PWA capabilities
- [ ] Unit and E2E test coverage
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Cloud deployment (Vercel, AWS)

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## Support & Contact

- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Ask questions in GitHub Discussions
- **Email**: [your-email@example.com]
- **Documentation**: See [docs/](docs/) for detailed guides

---

## Acknowledgments

- Built with [React](https://react.dev) and [Tailwind CSS](https://tailwindcss.com)
- Icons from [Lucide React](https://lucide.dev)
- Charts powered by [Recharts](https://recharts.org)
- Animations via [Framer Motion](https://www.framer.com/motion)

---

**Last Updated**: May 31, 2026 | **Version**: 0.0.1 | **Status**: Active Development

---

*NeuroBridge — because care does not stop when memory fades.*
