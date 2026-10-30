# CareSphere - Social Development Events Platform

> **Live Website:** [https://care-sphere-platform.vercel.app](https://care-sphere-platform.vercel.app)  
> **API Server:** [https://care-sphere-api.onrender.com](https://care-sphere-api.onrender.com)

**CareSphere** is a modern, community-driven event management platform built for grassroots social service initiatives. It enables residents, youth volunteers, and local organizers to create, discover, join, and manage social development events across Dhaka and other regions of Bangladesh—such as **Winter Clothes Distribution in Mirpur 10**, **Blanket Distribution for the Needy in Mohammadpur**, and **Lakeside Tree Plantation at Dhanmondi Lake**.

---

## Key Website Features

* **Hyperlocal Event Discovery & Filtering:** Browse upcoming social service drives with category filters (Winter Relief, Donation, Plantation, Cleanup, Healthcare, Education, Food Drive) and instant keyword/location search (e.g. Mirpur, Mohammadpur, Dhanmondi, Uttara).
* **Strict Future-Date Event Creation & Validation:** Community organizers can launch verified social development drives with strict client and server-side validation ensuring no past dates can be submitted.
* **One-Click Volunteer Registration & Tracking:** Logged-in volunteers can join any upcoming drive with real-time participant counters and manage their personal schedule sorted chronologically on their Joined Events page.
* **Organizer Control & Event Management:** Organizers have full ownership to update event details or delete expired initiatives with safe confirmation dialogs, backed by JWT authorization.
* **Seamless Dark & Light Theme Customization:** Built-in high-contrast theme toggle allowing users to switch between light and dark modes with persistent local preference across the entire application.
* **Reliable Session Persistence & Loading Skeletons:** Zero page-reload redirect errors on private routes. Custom animated loading skeletons ensure an uninterrupted user experience even on slow connections.
* **Personal Profile Management:** Volunteers can customize their public profile, update their display name and avatar photo URL, and track their community standing.

---

## Tech Stack

### Frontend (Client)
- **Framework:** Next.js 15 (App Router, Server & Client Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Custom Color Palette, Dark Mode via class strategy)
- **Theming:** `next-themes`
- **Icons:** `lucide-react`
- **Feedback & Alerts:** `sweetalert2` and `react-hot-toast` (zero browser default alerts used)
- **Date Handling:** `date-fns`

### Backend (Server)
- **Runtime:** Node.js with Express.js & TypeScript
- **Database:** MongoDB Atlas with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs password hashing
- **Security:** Strict CORS policies, input sanitization, password complexity enforcement

---

## Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/care-sphere.git
cd care-sphere
```

### 2. Configure Client
```bash
cd client
npm install
```

Create a `.env.local` file in the `client` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=CareSphere
```

Start the client development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Running Backend Server
```bash
cd ../server
npm install
npm run dev
```

---

## Demo Credentials
- **Organizer:** `organizer@caresphere.org` / `CareSphere@2026`
- **Volunteer:** `volunteer@caresphere.org` / `CareSphere@2026`

