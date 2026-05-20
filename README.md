# NeuroBridge
### Dementia Care Management Platform

A role-based web application connecting early-stage dementia patients, their caregivers, and doctors in one unified platform. Built as a Minor Project.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Demo Accounts](#demo-accounts)
- [The Three Portals](#the-three-portals)
- [Known Issues](#known-issues)
- [How to Contribute](#how-to-contribute)
- [Branch Guide](#branch-guide)

---

## About the Project

NeuroBridge is a three-portal healthcare web app designed for early-stage dementia care.

- **Patient portal** — accessible UI for daily routines, medicines, memory journal, brain games, and SOS alerts
- **Caregiver portal** — real-time monitoring, live location map, doctor messaging, and care plan management
- **Doctor portal** — patient registry, cognitive progress charts, prescriptions, telemedicine console, and analytics

The entire app runs on the frontend using React and localStorage. No backend, no database, and no API keys are needed to run it locally.

> Design note: The caregiver and doctor portals carry the primary operational weight. The patient portal is intentionally simple. The system does not depend on the patient actively using their phone to function safely — passive monitoring (geofencing, inactivity detection, medicine compliance) runs automatically.

---

## Tech Stack

| Layer       | Technology              |
|-------------|-------------------------|
| Framework   | React 18                |
| Routing     | React Router v6         |
| Styling     | Tailwind CSS            |
| Charts      | Recharts                |
| Icons       | Lucide React            |
| Animations  | Framer Motion           |
| Build tool  | Vite                    |
| State       | React Context API       |
| Persistence | localStorage            |
| Fonts       | Inter via Google Fonts  |

---

## Project Structure

```
neurobridge/
├── public/
├── src/
│   ├── components/
│   │   └── SharedLayout.jsx          # Sidebar, topbar, SOS banner, notifications
│   ├── context/
│   │   └── AppContext.jsx            # Global state, all dispatchers, SOS logic
│   ├── data/
│   │   └── initialData.js            # Seed data — patients, medicines, people, etc.
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── patient/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Medicines.jsx
│   │   │   ├── Journal.jsx
│   │   │   ├── People.jsx
│   │   │   ├── Games.jsx
│   │   │   └── SOS.jsx
│   │   ├── caregiver/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Location.jsx
│   │   │   ├── Medicines.jsx
│   │   │   ├── Messages.jsx
│   │   │   ├── Appointments.jsx
│   │   │   ├── Careplan.jsx
│   │   │   └── Wellbeing.jsx
│   │   └── doctor/
│   │       ├── Dashboard.jsx
│   │       ├── Patients.jsx
│   │       ├── PatientProfile.jsx
│   │       ├── Appointments.jsx
│   │       ├── Messages.jsx
│   │       ├── Telemedicine.jsx
│   │       └── Analytics.jsx
│   ├── App.jsx
│   └── index.css                     # Design system variables, SOS keyframes
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## Getting Started

Make sure you have Node.js (v18 or above) installed.

**1. Clone the repository**

```bash
git clone https://github.com/your-username/neurobridge.git
cd neurobridge
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the development server**

```bash
npm run dev
```

**4. Open in browser**

```
http://localhost:5173
```

That is all. No environment variables, no backend setup, no database configuration.

**To build for production**

```bash
npm run build
```

**To preview the production build locally**

```bash
npm run preview
```

---

## Demo Accounts

Use these credentials to log in and explore each portal. Switch between roles using the Quick Jump tool inside the notification panel.

| Role      | Email                  | Password |
|-----------|------------------------|----------|
| Patient   | patient@demo.com       | demo123  |
| Caregiver | caregiver@demo.com     | demo123  |
| Doctor    | doctor@demo.com        | demo123  |

Pre-seeded patient: **Ramesh Sharma**, 68, Early-stage Alzheimer's
Caregiver: **Priya Sharma** (daughter)
Doctor: **Dr. Ananya Mehta**, Neurologist, AIIMS Delhi

---

## The Three Portals

### Patient Portal (`/patient/`)

Designed for accessibility — larger text, large touch targets, minimal cognitive load.

| Page        | Path                    | Description                                              |
|-------------|-------------------------|----------------------------------------------------------|
| My Day      | `/patient/dashboard`    | Daily schedule, mood check-in, quick action tiles        |
| Medicines   | `/patient/medicines`    | Mark medicines as taken, 7-day compliance heatmap        |
| Journal     | `/patient/journal`      | Write entries, attach photos, search past entries        |
| My People   | `/patient/people`       | 3D flip cards with name, photo, relationship, call button|
| Brain Games | `/patient/games`        | Memory match game with scoring and star rating           |
| SOS         | `/patient/sos`          | Hold 3 seconds to alert caregiver and doctor in real time|

### Caregiver Portal (`/caregiver/`)

| Page         | Path                       | Description                                           |
|--------------|----------------------------|-------------------------------------------------------|
| Dashboard    | `/caregiver/dashboard`     | Live activity feed, medicine compliance, alerts       |
| Live Map     | `/caregiver/location`      | Geofence radius, location history, safe zone toggle   |
| Medicines    | `/caregiver/medicines`     | Read-only view of patient's medicines and compliance  |
| Doctor Chat  | `/caregiver/messages`      | Secure messaging with the doctor                      |
| Appointments | `/caregiver/appointments`  | Calendar view, book and manage appointments           |
| Care Plan    | `/caregiver/careplan`      | Accordion task list synced from doctor's care plan    |
| Well-being   | `/caregiver/wellbeing`     | Burnout resources, tips, caregiver mood check-in      |

### Doctor Portal (`/doctor/`)

| Page        | Path                       | Description                                                |
|-------------|----------------------------|------------------------------------------------------------|
| Overview    | `/doctor/dashboard`        | Patient registry table, today's schedule, alert panel      |
| Patients    | `/doctor/patients`         | Searchable list with full patient profile pages            |
| Schedule    | `/doctor/appointments`     | Weekly calendar, appointment management                    |
| Chats       | `/doctor/messages`         | Messaging with caregivers                                  |
| Telehealth  | `/doctor/telemedicine`     | Video call UI with timer, notes panel, in-call chat        |
| Analytics   | `/doctor/analytics`        | MMSE trends, compliance rates, severity distribution charts|

---

## Known Issues

These are open problems. Pick one up if you want to contribute.

- [ ] Video call does not use real WebRTC — it is a simulated UI only
- [ ] Location map is a styled placeholder — no real Google Maps integration yet
- [ ] Weather widget on patient dashboard uses hardcoded data
- [ ] No real push notifications — reminders only appear inside the app
- [ ] Signup flow does not fully wire new patients to the caregiver/doctor views
- [ ] Mobile layout of the doctor analytics page needs work on small screens
- [ ] No dark mode yet

---

## How to Contribute

**Step 1 — Fork the repository**

Click Fork on the top right of this page.

**Step 2 — Create a branch for your feature**

```bash
git checkout -b feature/your-feature-name
```

Follow the branch naming convention in the Branch Guide below.

**Step 3 — Make your changes**

Keep changes focused. One feature or fix per branch. If you are touching `AppContext.jsx`, be careful — it is the single source of truth for all app state. Read the comments in that file before editing.

**Step 4 — Test all three portals**

Before pushing, manually test the role switcher and confirm your change does not break any of the three portals.

**Step 5 — Commit with a clear message**

```bash
git add .
git commit -m "fix: SOS cancel not resetting progress ring"
```

Use these prefixes:
- `feat:` for a new feature
- `fix:` for a bug fix
- `style:` for UI-only changes (no logic changes)
- `refactor:` for code restructuring
- `docs:` for README or comment changes
- `data:` for changes to `initialData.js`

**Step 6 — Push and open a pull request**

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request on GitHub and describe what you changed and why.

---

## Branch Guide

| Branch name pattern          | Purpose                                         |
|------------------------------|-------------------------------------------------|
| `main`                       | Stable, working version only. Do not push here directly. |
| `dev`                        | Integration branch. Merge your feature here first. |
| `feature/patient-*`          | New features for the patient portal             |
| `feature/caregiver-*`        | New features for the caregiver portal           |
| `feature/doctor-*`           | New features for the doctor portal              |
| `fix/sos-*`                  | Bug fixes for SOS functionality                 |
| `fix/ui-*`                   | Visual or layout bug fixes                      |
| `data/seed-*`                | Changes to initialData.js seed content          |

**Example branch names:**
```
feature/patient-voice-journal
feature/doctor-export-pdf
fix/ui-mobile-analytics
data/seed-more-patients
```

---

## Where to Start if You Are New

If this is your first time looking at the codebase, read these files in this order:

1. `src/data/initialData.js` — understand the data shape before touching anything else
2. `src/context/AppContext.jsx` — understand how state flows across portals
3. `src/components/SharedLayout.jsx` — understand the shared chrome (sidebar, topbar, SOS banner)
4. Pick a portal and read its `Dashboard.jsx` first

The quickest way to test cross-portal state sync is:
1. Log in as Patient, mark a medicine as taken
2. Switch to Caregiver using the Quick Jump tool in the notification panel
3. Check the caregiver dashboard — the medicine count should update instantly

---

## License

This project is built for academic purposes. Not intended for real clinical use.

---

*NeuroBridge — because care does not stop when memory fades.*
