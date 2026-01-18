# 🚀 OlymPoint Social App - AI Image Generation & NFT Platform

Welcome to OlymPoint, a comprehensive AI-powered social platform for image generation, NFT marketplace, and community-driven content creation. Built with cutting-edge web technologies, this platform combines AI image generation with blockchain technology and social features.

## ✅ Key Features

### 🤖 AI-Powered Image Generation
- **Advanced AI Models**: Generate stunning images from text prompts using Google's Gemini AI
- **Smart Image Processing**: Background removal, upscaling, object-focused cropping
- **Lightning Fast**: Process images in seconds with optimized AI infrastructure
- **High-Quality Output**: Professional-grade images with multiple format support

### 🌐 Decentralized Storage & NFT Marketplace
- **IPFS Integration**: Permanent decentralized storage using Walrus protocol
- **NFT Auctions**: Create and participate in NFT auctions with tiered limits
- **Blockchain Ready**: Mysten Sui integration for NFT transactions
- **Cross-Platform**: Seamless integration with major blockchain networks

### 👥 Social & Community Features
- **Community Leaderboards**: Top creators, voters, and image owners rankings
- **Voting System**: Community-driven content curation and discovery
- **Social Integration**: Twitter, Instagram, and Facebook connectivity
- **Creator Profiles**: Showcase portfolios and connect with followers

### 💰 Flexible Pricing Tiers
- **Free Plan**: Basic features with 10 free credits, 3 NFT auctions/month
- **VIP Plan ($29/month)**: Unlimited generations, 30 NFT auctions/month, 3x OlymPoints multiplier
- **Agency Plan ($99/month)**: Team collaboration, unlimited NFT auctions, 30x OlymPoints multiplier

### 🔐 Enterprise-Grade Security
- **Firebase Authentication**: Secure email/password and Google OAuth
- **Session Management**: Advanced session handling with IP tracking
- **Data Privacy**: GDPR-compliant user data management
- **Payment Security**: Polar.sh integration for secure transactions

## 🧠 Tech Stack

### Frontend
- **Framework**: Next.js 16.1.1 (App Router + Server Actions)
- **UI Library**: React 19 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Icons**: Lucide React
- **State Management**: React hooks with context providers

### Backend & Database
- **Database**: PostgreSQL with Prisma ORM v7.2.0
- **Authentication**: Firebase Authentication + Firebase Admin SDK
- **API**: RESTful APIs with Next.js API routes
- **Session Storage**: Custom session management

### AI & Storage
- **AI Engine**: Google Generative AI (Gemini)
- **Image Storage**: ImageKit for optimized image delivery
- **Decentralized Storage**: Walrus SDK for IPFS integration
- **Blockchain**: Mysten Sui SDK for NFT operations

### Payments & Deployment
- **Payment Processing**: Polar.sh SDK for subscription management
- **Deployment**: Vercel with optimized builds
- **Environment**: T3 Environment validation
- **Code Quality**: ESLint, Prettier, TypeScript strict mode

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- PostgreSQL database
- Firebase project
- Google Cloud project with Gemini API
- ImageKit account (optional)
- Polar.sh account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/olympoint.git
   cd olympoint
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```bash
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/olympoint"

   # Firebase
   NEXT_PUBLIC_FIREBASE_API_KEY="your-firebase-api-key"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
   FIREBASE_CLIENT_EMAIL="firebase-adminsdk@your-project.iam.gserviceaccount.com"
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."

   # Google AI
   GOOGLE_GENERATIVE_AI_API_KEY="your-gemini-api-key"

   # ImageKit (optional)
   NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your-imagekit-id"
   IMAGEKIT_PUBLIC_KEY="your-imagekit-public-key"
   IMAGEKIT_PRIVATE_KEY="your-imagekit-private-key"

   # Polar.sh (for payments)
   POLAR_ACCESS_TOKEN="your-polar-access-token"

   # Walrus (IPFS)
   WALRUS_AGGREGATOR_URL="https://walrus-testnet-aggregator.nodes.guru"
   WALRUS_PUBLISHER_URL="https://walrus-testnet-publisher.nodes.guru"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Push schema to database
   npx prisma db push

   # (Optional) Open Prisma Studio
   npx prisma studio
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3050](http://localhost:3050) to view the application.

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbo
- `npm run build` - Create production build with Prisma generation
- `npm run build:vercel` - Vercel-specific build process
- `npm run start` - Start production server
- `npm run preview` - Build and preview production locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format:check` - Check code formatting
- `npm run format:write` - Format code with Prettier
- `npm run typecheck` - Run TypeScript type checking
- `npm run db:push` - Push Prisma schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard pages
│   │   └── dashboard/
│   │       ├── create/    # Image creation page
│   │       ├── generate/  # AI generation page
│   │       ├── ipfs-storage/ # IPFS storage management
│   │       ├── customer-portal/ # Payment management
│   │       └── settings/  # User settings
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── sidebar/          # Dashboard sidebar components
├── contexts/             # React contexts
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
└── styles/               # Global styles

prisma/
└── schema.prisma         # Database schema

docs/                     # Documentation and analysis files
```

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication with Email/Password and Google providers
3. Generate a service account key for Firebase Admin SDK

### Google AI Setup
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key for Gemini AI
3. Enable the Generative AI API in Google Cloud Console

### Database Setup
1. Set up a PostgreSQL database (local or cloud)
2. Update `DATABASE_URL` in environment variables
3. Run `npx prisma db push` to create tables

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Use TypeScript for all new code
- Follow the existing code style and patterns
- Write tests for new features
- Update documentation as needed
- Ensure all linting and type checks pass

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Google Gemini AI](https://ai.google.dev/) - AI image generation
- [Firebase](https://firebase.google.com/) - Authentication and hosting
- [Prisma](https://prisma.io/) - Database ORM
- [Walrus](https://walrus.xyz/) - Decentralized storage
- [Polar.sh](https://polar.sh/) - Payment processing
- [shadcn/ui](https://ui.shadcn.com/) - UI components

---

**Built with ❤️ for the OlymPoint Community**
#   o l y m p o i n t 
 
 
