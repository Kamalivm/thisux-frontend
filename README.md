LinkCraft Frontend

Welcome to the frontend of LinkCraft, a modern URL shortening application built with React. This repository contains the client-side code that provides an intuitive user interface for creating, managing, and tracking shortened links.

Overview
- Technology Stack: React, Tailwind CSS, Lucide React (icons)
- Purpose: Provides a responsive UI for user authentication, link creation, editing, deletion, and analytics visualization.
- API Integration: Communicates with the backend via RESTful APIs hosted at http://localhost:5000/api.

Features
- User authentication (login/signup/logout)
- Create and manage shortened links with custom slugs and titles
- Real-time click tracking and analytics
- Responsive design with a mobile-friendly interface
- Local state management for link data

Prerequisites
- Node.js (v16.x or later)
- npm or yarn
- Access to the backend API (running at http://localhost:5000)

Installation
1. Clone the Repository:
   git clone <repository-url>
   cd linkcraft-frontend
2. Install Dependencies:
   npm install
   or
   yarn install
3. Set Environment Variables:
   Create a .env file in the root directory and add:
   REACT_APP_API_URL=http://localhost:5000/api
4. Start the Development Server:
   npm start
   or
   yarn start
   Open http://localhost:3000 in your browser.

Usage
- Login/Signup: Use the auth screen to log in or create a new account.
- Dashboard: View and manage your links, including creating new ones via the "New Link" button.
- Analytics: Switch to the analytics tab to see top-performing links and recent activity.
- Interactions: Click links to simulate opens, copy short URLs, or delete/edit links.

Development
- Running Tests: Add test scripts using a library like Jest or React Testing Library if needed.
- Linting: Use ESLint with the included configuration:
   npm run lint
- Building for Production:
   npm run build

Contributing
1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -m 'Add your feature').
4. Push to the branch (git push origin feature/your-feature).
5. Open a Pull Request with a clear description of your changes.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For questions or support, reach out via the project maintainers or open an issue on the repository.
