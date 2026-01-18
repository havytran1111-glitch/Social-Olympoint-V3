# 🚀 OlymPoint Social App

### AI Image Generation & NFT Platform

**OlymPoint** is a comprehensive AI-powered social platform for **image generation**, **NFT trading**, and **community-driven content creation**.
The platform combines **cutting-edge AI**, **blockchain technology**, and **social networking features** into one unified ecosystem.

---

## ✅ Key Features

### 🤖 AI-Powered Image Generation

* **Advanced AI Models**: Generate stunning images from text prompts using **Google Gemini AI**
* **Smart Image Processing**: Background removal, image upscaling, and object-focused cropping
* **Lightning Fast**: Optimized AI infrastructure processes images in seconds
* **High-Quality Output**: Professional-grade images with multiple format support

---

### 🌐 Decentralized Storage & NFT Marketplace

* **IPFS Integration**: Permanent decentralized storage via the **Walrus protocol**
* **NFT Auctions**: Create and participate in NFT auctions with tier-based limits
* **Blockchain Ready**: NFT transactions powered by **Mysten Sui**
* **Cross-Platform**: Seamless integration with major blockchain networks

---

### 👥 Social & Community Features

* **Community Leaderboards**: Rankings for top creators, voters, and image owners
* **Voting System**: Community-driven content curation and discovery
* **Social Integration**: Connect with Twitter, Instagram, and Facebook
* **Creator Profiles**: Showcase portfolios and engage with followers

---

### 💰 Flexible Pricing Tiers

| Plan       | Price       | Benefits                                                       |
| ---------- | ----------- | -------------------------------------------------------------- |
| **Free**   | $0          | 10 free credits, 3 NFT auctions / month                        |
| **VIP**    | $29 / month | Unlimited image generation, 30 NFT auctions, **3× OlymPoints** |
| **Agency** | $99 / month | Team collaboration, unlimited NFT auctions, **30× OlymPoints** |

---

### 🔐 Enterprise-Grade Security

* **Firebase Authentication** (Email/Password + Google OAuth)
* **Advanced Session Management** with IP tracking
* **GDPR-Compliant** user data handling
* **Secure Payments** via Polar.sh

---

## 🧠 Tech Stack

### Frontend

* **Framework**: Next.js 16.1.1 (App Router + Server Actions)
* **UI**: React 19 with TypeScript
* **Styling**: Tailwind CSS + shadcn/ui
* **Icons**: Lucide React
* **State Management**: React hooks & Context API

### Backend & Database

* **Database**: PostgreSQL with Prisma ORM v7.2.0
* **Authentication**: Firebase Authentication & Admin SDK
* **API**: RESTful APIs using Next.js API Routes
* **Sessions**: Custom session management

### AI & Storage

* **AI Engine**: Google Generative AI (Gemini)
* **Image Delivery**: ImageKit CDN
* **Decentralized Storage**: Walrus SDK (IPFS)
* **Blockchain**: Mysten Sui SDK

### Payments & Deployment

* **Payments**: Polar.sh subscription management
* **Deployment**: Vercel
* **Environment Validation**: T3 Environment
* **Code Quality**: ESLint, Prettier, TypeScript strict mode

---

## 🚀 Getting Started

### Prerequisites

* Node.js **v18+**
* npm or yarn
* PostgreSQL database
* Firebase project
* Google Cloud project (Gemini API enabled)
* ImageKit account *(optional)*
* Polar.sh account *(for payments)*

---

## 📦 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/olympoint.git
cd olympoint
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables (`.env.local`)

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/olympoint"

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk@project.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."

# Google AI
GOOGLE_GENERATIVE_AI_API_KEY="your-gemini-api-key"

# ImageKit (optional)
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your-id"
IMAGEKIT_PUBLIC_KEY="your-public-key"
IMAGEKIT_PRIVATE_KEY="your-private-key"

# Polar.sh
POLAR_ACCESS_TOKEN="your-polar-access-token"

# Walrus (IPFS)
WALRUS_AGGREGATOR_URL="https://walrus-testnet-aggregator.nodes.guru"
WALRUS_PUBLISHER_URL="https://walrus-testnet-publisher.nodes.guru"
```

---

### 4️⃣ Database setup

```bash
npx prisma generate
npx prisma db push
npx prisma studio
```

---

### 5️⃣ Run the development server

```bash
npm run dev
```

➡ Open **[http://localhost:3050](http://localhost:3050)** in your browser

---

## 📜 Available Scripts

* `npm run dev` – Start development server
* `npm run build` – Production build
* `npm run build:vercel` – Vercel-optimized build
* `npm run start` – Start production server
* `npm run preview` – Preview production build locally
* `npm run lint` / `lint:fix`
* `npm run format:check` / `format:write`
* `npm run typecheck`
* `npm run db:push`
* `npm run db:migrate`
* `npm run db:studio`

---

## 📁 Project Structure

```txt
src/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   │   └── dashboard/
│   │       ├── create/
│   │       ├── generate/
│   │       ├── ipfs-storage/
│   │       ├── customer-portal/
│   │       └── settings/
│   ├── api/
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── contexts/
├── hooks/
├── lib/
├── styles/
prisma/
└── schema.prisma
docs/
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch

   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes

   ```bash
   git commit -m "Add amazing feature"
   ```
4. Push to GitHub

   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

### Development Guidelines

* Use **TypeScript** for all new code
* Follow existing architecture and code style
* Write tests for new features
* Ensure all linting and type checks pass

---

## 📝 License

This project is licensed under the **MIT License**.
See the `LICENSE` file for details.

---

## 🙏 Acknowledgments

* Next.js
* Google Gemini AI
* Firebase
* Prisma
* Walrus
* Polar.sh
* shadcn/ui

