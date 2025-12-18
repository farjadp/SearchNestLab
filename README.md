# SearchNest Lab

**"The 15-minute SEO win for agencies."**  
SearchNest is a white-label SEO auditing and lead generation platform designed for speed and privacy.

![SearchNest Dashboard](https://searchnest.io/dashboard-preview.png)

## 🚀 Features

- **Distributed Scanner**: Recursive website crawler powered by **BullMQ** & **Redis** (Crawls 10k+ pages).
- **Privacy-First**: PIPEDA/CASL compliant Consent & Lead Capture widget.
- **Site Audit**: Automated meta tag verification and indexing checks.
- **Keyword Intelligence**: GSC (Google Search Console) integration for keyword opportunities.
- **Report Generation**: White-label reports for clients.
- **Modern UI**: Built with Next.js 15, TailwindCSS, and Glassmorphism design.

## 🛠️ Tech Stack

**Monorepo** (Turborepo) managing:

- **Apps**
  - `web`: Next.js 15 (App Router, Client/Server Components)
  - `api`: NestJS (Backend API, Auth Guards)
  - `worker`: Node.js + BullMQ (Background Jobs)
  
- **Packages**
  - `ui`: Shared React components
  - `sdk`: TypeScript SDK for internal API calls
  - `schema`: Shared Zod schemas and TypeScript types

- **Infrastructure**
  - **Database**: Firebase Firestore (NoSQL)
  - **Auth**: Firebase Authentication
  - **Queue**: Redis (BullMQ)

## ⚡ Getting Started

### Prerequisites

- Node.js >= 18
- pnpm (`npm i -g pnpm`)
- Redis (running locally on port 6379)
- Firebase Project (Firestore & Auth enabled)

### Installation

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Environment Setup**
   
   **Web** (`apps/web/.env.local`):
   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

   **API** (`apps/api/.env`):
   ```bash
   REDIS_URL=redis://localhost:6379
   FIREBASE_PROJECT_ID=...
   # Service Account JSON path or credentials
   ```

   **Worker** (`apps/worker/.env`):
   ```bash
   REDIS_URL=redis://localhost:6379
   ```

3. **Run Locally**
   Start all services simultaneously:
   ```bash
   pnpm dev
   ```

   - **Web Dashboard**: [http://localhost:3000](http://localhost:3000)
   - **API Server**: [http://localhost:3001](http://localhost:3001)

## 📦 Deployment

The project is designed to be deployed on **Google Cloud Run** or **Vercel** (Frontend) + **Render/Railway** (Backend/Worker).

1. **Build**: `pnpm build`
2. **Start Web**: `pnpm start --filter web`
3. **Start API**: `pnpm start --filter api`
4. **Start Worker**: `pnpm start --filter worker`

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

Proprietary Software. © 2025 SearchNest Lab.
