# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2025-12-17
### Added
- **Optimization Page**: Added `verifyWidget` functionality with real-time feedback and persistence.
- **Dashboard**: Added "Pages Crawled" card with live updates and polling.
- **Billing**: Added fully functional Billing page with pricing tiers (Starter, Growth, Agency).
- **User Menu**: Added dynamic User Menu in sidebar with Logout functionality.
- **Worker**: Recursive crawling (limit 10 for free tier) is now fully active.

### Fixed
- **Build Errors**: Resolved TypeScript errors in `worker` (top-level await) and `web` (duplicate variables).
- **Persistence**: Fixed issue where widget verification would reset on reload.
- **Landing Page**: Fixed `client-only` error by marking page as Client Component.

## [1.0.0] - 2025-12-16
### Added
- **Monorepo Structure**: Setup Turborepo with `apps/web`, `apps/api`, `apps/worker`.
- **Authentication**: Firebase Auth integration (Sign Up, Sign In, Route Guards).
- **Sites Management**: Create, List, and Verify sites (Meta tag verification).
- **Scanner**: BullMQ queue setup with Worker for page fetching.
- **Integrations**: Google Search Console integration flow (OAuth).
- **Keywords**: Keyword import and clustering (basic table UI).
- **Reports**: Basic reporting dashboard.
- **Lead Widget**: Script generation for lead capture.

### Changed
- **Database**: Migrated architecture from MySQL/Prisma to Firebase Firestore (NoSQL).
- **UI**: Implemented "Glassmorphism" design system with Tailwind CSS.
