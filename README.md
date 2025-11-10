# Conversion IQ Dashboard

> A centralized internal agent dashboard for Conversion IQ - Lean, scalable performative marketing operations in Ghana 🇬🇭

## 🧠 Overview

The Conversion IQ Dashboard is a comprehensive web application designed to streamline and automate core business functions for a performative marketing company operating in Ghana. It features six specialized agents that manage different aspects of the business:

- **📈 Marketing Agent** - Campaign management and performance tracking
- **🧭 Strategy Agent** - Business intelligence and strategic insights
- **⚙️ Operations Agent** - Task management and workflow coordination
- **🤝 Account Management Agent** - Client relationship and reporting
- **💰 Financial Operations Agent** - Billing, invoicing, and payments
- **📊 Analytics Agent** - Data visualization and performance metrics

## ✨ Key Features

### Mobile-First Design
- Fully responsive layout optimized for iOS and Android devices
- Touch-friendly interface with intuitive navigation
- Progressive Web App (PWA) support for app-like experience
- Offline capability with service worker caching

### Ghana-Specific Integrations
- **Payment Systems**: MTN MoMo, Vodafone Cash, AirtelTigo Money
- **Compliance Tracking**: GRA, SSNIT, Registrar General
- **Local Currency**: Primary support for GHS (Ghana Cedis)
- **Payment Gateway**: Flutterwave/Hubtel integration ready

### Real-Time Analytics
- Campaign performance monitoring (ROAS, CPA, CTR, CVR)
- Client KPI tracking (installs, retention, CLV)
- Financial metrics and revenue tracking
- Anomaly detection and alerts

### Automation & Integration
- API-ready architecture for external integrations
- Support for Meta Ads, Google Ads, TikTok Ads APIs
- Firebase and AppsFlyer analytics integration
- WhatsApp Business API for client communication

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (planned)
- **Charts**: Recharts (planned)
- **Icons**: Lucide React (planned)
- **Date Handling**: date-fns

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd conversion-iq-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="your_database_connection_string"

   # Authentication (OAuth2)
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"

   # Payment Gateway (Flutterwave)
   FLUTTERWAVE_PUBLIC_KEY="your_flutterwave_public_key"
   FLUTTERWAVE_SECRET_KEY="your_flutterwave_secret_key"

   # External APIs
   META_ADS_ACCESS_TOKEN="your_meta_ads_token"
   GOOGLE_ADS_DEVELOPER_TOKEN="your_google_ads_token"
   TIKTOK_ADS_ACCESS_TOKEN="your_tiktok_ads_token"
   FIREBASE_API_KEY="your_firebase_key"
   APPSFLYER_API_TOKEN="your_appsflyer_token"

   # Communication
   WHATSAPP_BUSINESS_TOKEN="your_whatsapp_token"

   # Analytics
   BIGQUERY_PROJECT_ID="your_bigquery_project"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
conversion-iq-dashboard/
├── app/
│   ├── api/                    # API routes
│   │   ├── campaigns/          # Campaign management endpoints
│   │   ├── clients/            # Client management endpoints
│   │   ├── invoices/           # Invoice management endpoints
│   │   ├── payments/           # Payment processing endpoints
│   │   ├── tasks/              # Task management endpoints
│   │   └── analytics/          # Analytics endpoints
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/
│   ├── agents/                 # Agent modules
│   │   ├── MarketingAgent.tsx
│   │   ├── StrategyAgent.tsx
│   │   ├── OperationsAgent.tsx
│   │   ├── AccountAgent.tsx
│   │   ├── FinancialAgent.tsx
│   │   └── AnalyticsAgent.tsx
│   ├── DashboardLayout.tsx     # Main dashboard layout
│   ├── Header.tsx              # Header component
│   ├── AgentCard.tsx           # Agent card component
│   ├── AgentPanel.tsx          # Agent panel container
│   └── MobileNav.tsx           # Mobile navigation
├── types/
│   └── index.ts                # TypeScript type definitions
├── public/
│   ├── manifest.json           # PWA manifest
│   ├── sw.js                   # Service worker
│   └── robots.txt              # SEO robots file
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## 🚀 Deployment

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

3. **Custom Domain**
   - Add your domain in Vercel settings
   - Update DNS records as instructed

### Option 2: Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and run**
   ```bash
   docker build -t conversion-iq-dashboard .
   docker run -p 3000:3000 conversion-iq-dashboard
   ```

### Option 3: Traditional Hosting

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

3. **Use PM2 for process management**
   ```bash
   npm install -g pm2
   pm2 start npm --name "conversion-iq" -- start
   pm2 save
   ```

## 🔌 Integration Guide

### Payment Integration (Flutterwave)

```typescript
// Example: Process MTN MoMo payment
const response = await fetch('/api/payments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    invoiceId: 'INV-001',
    amount: 12000,
    method: 'MTN MoMo',
    phoneNumber: '0244123456',
  }),
});
```

### Meta Ads Integration

```typescript
// Example: Fetch campaign data
const campaigns = await fetch('/api/campaigns');
const data = await campaigns.json();
```

### WhatsApp Business API

```typescript
// Example: Send client report via WhatsApp
const message = {
  to: clientPhoneNumber,
  type: 'document',
  document: {
    link: reportUrl,
    filename: 'Monthly_Report.pdf',
  },
};
```

## 📱 Mobile App Setup

### iOS

1. Open in Safari on iOS device
2. Tap the Share button
3. Select "Add to Home Screen"
4. Icon will appear on home screen

### Android

1. Open in Chrome on Android device
2. Tap the menu (⋮)
3. Select "Add to Home Screen"
4. App will be installed

## 🔐 Authentication Setup

To add OAuth2 authentication:

1. **Install NextAuth.js**
   ```bash
   npm install next-auth
   ```

2. **Configure providers** in `app/api/auth/[...nextauth]/route.ts`

3. **Wrap app with SessionProvider**

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📊 Database Setup

### Recommended: PostgreSQL with Prisma

1. **Install Prisma**
   ```bash
   npm install @prisma/client
   npm install -D prisma
   ```

2. **Initialize Prisma**
   ```bash
   npx prisma init
   ```

3. **Define schema** in `prisma/schema.prisma`

4. **Run migrations**
   ```bash
   npx prisma migrate dev
   ```

## 🇬🇭 Ghana-Specific Configuration

### Payment Methods

- **MTN MoMo**: Most popular (60% market share)
- **Vodafone Cash**: Second largest
- **AirtelTigo Money**: Growing market share
- **Bank Transfer**: For larger transactions

### Compliance Requirements

- **GRA**: Monthly/Quarterly tax filings
- **SSNIT**: Monthly employee contributions
- **Registrar General**: Annual company renewal

### Business Hours

- Standard: 8:00 AM - 5:00 PM GMT
- Time Zone: Africa/Accra (GMT+0)

## 🤝 Contributing

This is an internal project for Conversion IQ. For feature requests or bug reports, contact the development team.

## 📄 License

Proprietary - Internal Use Only

## 👥 Team

**Conversion IQ** - Lean, Scalable Performative Marketing in Ghana

---

Built with ❤️ for 🇬🇭 Ghana
