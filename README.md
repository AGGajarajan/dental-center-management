🦷 DENTAL CENTER DASHBOARD - React + Vite + Tailwind CSS

========================================================
📝 PROJECT OVERVIEW
--------------------------------------------------------
This project is a responsive and user-friendly Dental Center Management Dashboard built using:

✅ React (with Vite for faster build & dev)
✅ Tailwind CSS for modern UI styling
✅ LocalStorage for temporary data persistence

The app includes the following features:

- Patient Management (Add, Edit, View, Delete)
- Appointment (Incident) Scheduling and Viewing
- Monthly Calendar View of Appointments
- Role-based Login (Admin & Patient Views)
- Conditional layout with Sidebar/Header/Footer
- Responsive Design for all screens

========================================================
📁 PROJECT SETUP (Step-by-step)
--------------------------------------------------------

1. Clone the Repository:
   git clone https://github.com/YOUR_USERNAME/dental-center-dashboard.git

2. Navigate to the Project Folder:
   cd dental-center-dashboard

3. Install Node Modules:
   npm install

4. Start the Development Server:
   npm run dev

5. Open the App:
   http://localhost:5173

========================================================
🧠 ARCHITECTURE & STRUCTURE
--------------------------------------------------------

- `src/`
  ├── components/        → Reusable UI elements (Header, Sidebar, Footer)
  ├── context/           → Auth context for login system
  ├── pages/             → Page-level views (Login, Dashboard, PatientList, Calendar etc.)
  ├── styles/            → Tailwind CSS customizations
  ├── routes.jsx         → Route configuration using React Router
  ├── App.jsx            → Main app wrapper
  ├── main.jsx           → ReactDOM render entry point

========================================================
🛠 TOOLS USED
--------------------------------------------------------

- **React** (v18) → Component-based architecture
- **Vite** → Lightning-fast dev server and build tool
- **Tailwind CSS** → Utility-first styling for clean and responsive UI
- **React Router v6** → For managing navigation & routing
- **LocalStorage** → Simulated DB for demo purposes

========================================================
💡 TECHNICAL DECISIONS
--------------------------------------------------------

1. **Vite + React**: Chosen for fast hot-reloads and minimal config.
2. **Tailwind CSS**: Used to replace all manual CSS with responsive utility classes.
3. **Layout Handling**: Conditional rendering used in `Layout.jsx` to hide Sidebar on the login page (`/`) and show it everywhere else.
4. **Calendar View**: Custom monthly view using JS Date object and grid logic.
5. **Auth Context**: Login and logout behavior handled globally via context.
6. **Navigation**: Used `useNavigate()` properly to handle page redirects.

========================================================
⚠️ COMMON ISSUES & SOLUTIONS
--------------------------------------------------------

❌ Sidebar appearing on login page:
✅ Fixed by checking `location.pathname !== '/'` in `Layout.jsx`.

❌ Footer showing twice:
✅ Happened because footer was manually added in multiple places; fixed by keeping it only in `Layout.jsx`.

❌ Background image and headline overlapping on small screens:
✅ Applied Tailwind responsive utility classes (like `text-center`, `absolute`, `z-10`) to resolve layout stacking.

❌ Button navigation not working:
✅ Caused by missing `useNavigate()`. Fixed by importing and initializing it properly.

❌ GitHub deployment shows 404:
✅ Resolved by checking proper path setup and pushing committed changes.

========================================================
📌 STRUGGLES FACED & LEARNING POINTS
--------------------------------------------------------

🔸 Understanding how to conditionally show/hide layout components like Sidebar based on route.
🔸 Migrating from CSS files to Tailwind CSS utility-first design took effort and required rethinking layout logic.
🔸 Making the layout responsive for all screen sizes required deep Tailwind understanding.
🔸 Figuring out how to use `useNavigate`, `useParams`, and `useLocation` in React Router v6.
🔸 Fixing Git push issues and understanding what files are staged, untracked, or deleted.

========================================================
🧪 TESTING & DATA MOCKING
--------------------------------------------------------

Currently using browser `localStorage` as the data source.
You can inspect and modify data using browser DevTools > Application > LocalStorage.

Login Credentials:
------------------
Admin: `admin@example.com` / `admin123`
Patient: `patient@example.com` / `patient123`

========================================================
📁 SAMPLE FOLDER STRUCTURE
--------------------------------------------------------

src/
├── assets/
├── components/
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── Footer.jsx
│   └── Layout.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── PatientView.jsx
│   ├── ViewCalendar.jsx
│   └── Patients/
│       ├── AddPatient.jsx
│       ├── EditPatient.jsx
│       └── PatientList.jsx
│   └── Incidents/
│       ├── AddIncident.jsx
│       └── IncidentList.jsx
├── styles/
│   └── tailwind.css
├── App.jsx
├── main.jsx
└── routes.jsx

========================================================
🚀 DEPLOYMENT INSTRUCTIONS (OPTIONAL)
--------------------------------------------------------

1. Build the app:
   npm run build

2. Deploy to GitHub Pages / Netlify / Vercel etc.

If using GitHub Pages:
- Use `gh-pages` package
- Update `vite.config.js` with `base: '/your-repo-name/'`

========================================================
📞 CONTACT
--------------------------------------------------------
For support, ideas, or feedback, feel free to raise an issue or connect via GitHub.

========================================================
