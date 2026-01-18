import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Sparkles,
  Zap,
  Star,
  ArrowRight,
  ImageIcon,
  Scissors,
  Expand,
  Target,
  Download,
  CheckCircle2,
  Play,
  Award,
  Twitter,
  Instagram,
  Facebook,
  HardDrive,
} from "lucide-react";
import Link from "next/link";


export default function HomePage() {
  const features = [
    {
      icon: <Scissors className="h-8 w-8" />,
      title: "Generate AI Image Easily",
      description:
        "Remove backgrounds instantly with advanced AI technology. Perfect for product photos and portraits.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      icon: <Expand className="h-8 w-8" />,
      title: "Smart Upscaling",
      description:
        "Enhance image quality and resolution without losing clarity using cutting-edge AI algorithms.",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Object-Focused Cropping",
      description:
        "Intelligently crop images around specific objects with AI-powered detection and framing.",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description:
        "Process images in seconds, not minutes. Our optimized AI infrastructure delivers results instantly.",
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      icon: <HardDrive className="h-8 w-8" />,
      title: "Permanent IPFS Storage",
      description:
        "Store your AI-generated images permanently on the decentralized IPFS network.",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const topVotedImages = [
    {
      id: 1,
      title: "AI Generated Landscape",
      votes: 1250,
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      creator: {
        name: "Alex Chen",
        bio: "Digital artist specializing in AI landscapes",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        social: {
          twitter: "https://twitter.com/alexchen",
          instagram: "https://instagram.com/alexchen_art",
          facebook: "https://facebook.com/alexchen"
        }
      },
    },
    {
      id: 2,
      title: "Futuristic Cityscape",
      votes: 1180,
      imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      creator: {
        name: "Maria Rodriguez",
        bio: "Urban concept artist and AI enthusiast",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        social: {
          twitter: "https://twitter.com/maria_rodriguez",
          instagram: "https://instagram.com/maria_art",
          facebook: "https://facebook.com/maria.rodriguez"
        }
      },
    },
    {
      id: 3,
      title: "Abstract Art Creation",
      votes: 1050,
      imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
      creator: {
        name: "David Kim",
        bio: "Abstract artist exploring AI creativity",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        social: {
          twitter: "https://twitter.com/davidkim_art",
          instagram: "https://instagram.com/david.kim",
          facebook: "https://facebook.com/david.kim.art"
        }
      },
    },
  ];

  const topCreators = [
    { rank: 1, name: "Alex Chen", images: 245, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
    { rank: 2, name: "Maria Rodriguez", images: 223, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" },
    { rank: 3, name: "David Kim", images: 198, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
    { rank: 4, name: "Sarah Johnson", images: 187, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" },
    { rank: 5, name: "Mike Wilson", images: 176, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face" },
    { rank: 6, name: "Emma Davis", images: 165, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face" },
    { rank: 7, name: "James Brown", images: 154, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face" },
    { rank: 8, name: "Lisa Garcia", images: 143, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face" },
    { rank: 9, name: "Tom Anderson", images: 132, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face" },
    { rank: 10, name: "Anna Lee", images: 121, avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face" },
  ];

  const topVoters = [
    { rank: 1, name: "Chris Taylor", votes: 1250, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face" },
    { rank: 2, name: "Jessica Wang", votes: 1180, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face" },
    { rank: 3, name: "Robert Martinez", votes: 1050, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
    { rank: 4, name: "Amanda White", votes: 980, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" },
    { rank: 5, name: "Kevin Liu", votes: 920, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
    { rank: 6, name: "Rachel Green", votes: 860, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" },
    { rank: 7, name: "Daniel Park", votes: 800, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face" },
    { rank: 8, name: "Sophie Chen", votes: 740, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face" },
    { rank: 9, name: "Mark Johnson", votes: 680, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face" },
    { rank: 10, name: "Nina Patel", votes: 620, avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face" },
  ];

  const topImageOwners = [
    { rank: 1, name: "Alex Chen", totalVotes: 15420, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
    { rank: 2, name: "Maria Rodriguez", totalVotes: 14230, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" },
    { rank: 3, name: "David Kim", totalVotes: 13890, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
    { rank: 4, name: "Sarah Johnson", totalVotes: 12650, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" },
    { rank: 5, name: "Chris Taylor", totalVotes: 11890, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face" },
    { rank: 6, name: "Jessica Wang", totalVotes: 11240, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face" },
    { rank: 7, name: "Mike Wilson", totalVotes: 10870, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face" },
    { rank: 8, name: "Emma Davis", totalVotes: 10230, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face" },
    { rank: 9, name: "Robert Martinez", totalVotes: 9870, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
    { rank: 10, name: "Lisa Garcia", totalVotes: 9450, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face" },
  ];

  const pricingFeatures = [
    "Generate AI Image Easily",
    "Smart Image Upscaling",
    "Object-Focused Cropping",
    "High-Quality Downloads",
    "Fast Processing",
  ];

  const pricingPlans = [
    {
      name: "Free Plan",
      price: "$0",
      period: "to start",
      description: "Try all features with free credits",
      badge: "Free to Start",
      badgeColor: "from-blue-500 to-purple-600",
      features: [
        "Generate AI Image Easily",
        "Smart Image Upscaling", 
        "Object-Focused Cropping",
        "High-Quality Downloads",
        "Fast Processing",
        "IPFS: 3 images/month",
        "NFT Auction Support: 3 NFTs/month",
        "Olym Points: Normal"
      ],
      buttonText: "Try It Free Now",
      buttonIcon: <Sparkles className="h-4 w-4" />,
      buttonVariant: "default" as const,
      buttonClass: "bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
      footerText: "Includes 10 free credits • No credit card required",
      popular: false,
    },
    {
      name: "VIP Plan",
      price: "$29",
      period: "/month",
      description: "Perfect for professionals and power users",
      badge: "Most Popular",
      badgeColor: "from-emerald-500 to-teal-600",
      features: [
        ...pricingFeatures,
        "Unlimited AI Generations",
        "Priority Processing",
        "Advanced AI Models",
        "Commercial License",
        "IPFS: 30 images/month",
        "NFT Auction Support: 30 NFTs/month",
        "Olym Points: 3x Multiplier"
      ],
      buttonText: "Start VIP Plan",
      buttonIcon: <Star className="h-4 w-4" />,
      buttonVariant: "default" as const,
      buttonClass: "bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700",
      footerText: "Cancel anytime • 30-day money back",
      popular: true,
    },
    {
      name: "Agency Plan",
      price: "$99",
      period: "/month",
      description: "For teams and agencies with high volume needs",
      badge: "Best Value",
      badgeColor: "from-purple-500 to-pink-600",
      features: [
        ...pricingFeatures,
        "Unlimited AI Generations",
        "Priority Processing",
        "Advanced AI Models",
        "Commercial License",
        "Team Collaboration",
        "API Access",
        "White-label Solutions",
        "IPFS: 300 images/month",
        "NFT Auction Support: Unlimited",
        "Olym Points: 30x Multiplier"
      ],
      buttonText: "Start Agency Plan",
      buttonIcon: <Zap className="h-4 w-4" />,
      buttonVariant: "default" as const,
      buttonClass: "bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700",
      footerText: "Cancel anytime • 30-day money back",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/20 to-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-slate-50/95 backdrop-blur supports-backdrop-filter:bg-slate-50/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-r from-blue-500 to-purple-600 shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                OlymPoint Social App
              </span>
            </div>

            <div className="hidden items-center space-x-8 md:flex">
              <Link
                href="#features"
                className="text-slate-600 transition-colors hover:text-blue-600"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-slate-600 transition-colors hover:text-blue-600"
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="text-slate-600 transition-colors hover:text-blue-600"
              >
                VoteMe
              </Link>
              <Link
                href="#leaderboard"
                className="text-slate-600 transition-colors hover:text-blue-600"
              >
                Leaderboard
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/auth/sign-in">
                <Button variant="ghost" size="sm" className="cursor-pointer">
                  Sign In
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="sm" className="cursor-pointer gap-2">
                  Try Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-100/30 px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-700">
                Powered by Gemini AI
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-800 sm:text-6xl">
              Generate Images with{" "}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
               Gemini AI
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 sm:text-xl">
              Professional image editing powered by artificial intelligence.
              Remove backgrounds, upscale images, and crop with precision - all
              in seconds.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="cursor-pointer gap-2 px-8 py-6 text-base"
                >
                  <Play className="h-5 w-5" />
                  Try It Free Now
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="cursor-pointer gap-2 px-8 py-6 text-base"
                >
                  <ImageIcon className="h-5 w-5" />
                  View Demo
                </Button>
              </Link>
            </div>

            <div className="mt-16 text-center">
              <p className="mb-8 text-sm text-slate-500">
                Trusted by thousands of creators worldwide
              </p>
              <div className="grid grid-cols-2 items-center justify-center gap-6 opacity-80 sm:grid-cols-5">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-700">10K+</div>
                  <div className="text-xs text-slate-500">Images Processed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-700">2.5K+</div>
                  <div className="text-xs text-slate-500">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-700">99.9%</div>
                  <div className="text-xs text-slate-500">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">4.8★</div>
                  <div className="text-xs text-slate-500">User Rating</div>
                </div>
                <div className="col-span-2 text-center sm:col-span-1">
                  <div className="text-2xl font-bold text-slate-700">24/7</div>
                  <div className="text-xs text-slate-500">AI Processing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Powerful AI Tools at Your{" "}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Fingertips
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Everything you need to create stunning images with the power of
              artificial intelligence
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-slate-200 bg-white/70 backdrop-blur-sm transition-all hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div
                    className={`${feature.bgColor} mb-4 inline-flex items-center justify-center rounded-lg p-3 ${feature.color}`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-800">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {feature.description}
                  </p>
                </CardContent>
                <div className="absolute inset-0 bg-linear-to-r from-blue-500/0 to-blue-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="leaderboard" className="bg-slate-50 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Community{" "}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Leaderboard
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Our platform is powered by a vibrant community of creators and voters.
              See who is leading the charge.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/leaderboard">
              <Button
                variant="outline"
                className="group mx-auto flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition"
              >
                View Full Leaderboard
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="relative mt-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Top Creators */}
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-r from-blue-500 to-purple-600">
                    <ImageIcon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">Top Image Creators</h3>
                </div>
                <Card className="border-slate-200 bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {topCreators.map((creator) => (
                        <div
                          key={creator.rank}
                          className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-slate-50"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-r from-blue-500 to-purple-600 text-sm font-bold text-white">
                            {creator.rank}
                          </div>
                          <img
                            src={creator.avatar}
                            alt={creator.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-slate-800">{creator.name}</div>
                            <div className="text-sm text-slate-500">{creator.images} images created</div>
                          </div>
                          {creator.rank <= 3 && (
                            <div className="text-amber-500">
                              {creator.rank === 1 && <Star className="h-5 w-5 fill-current" />}
                              {creator.rank === 2 && <Star className="h-4 w-4 fill-current" />}
                              {creator.rank === 3 && <Star className="h-3 w-3 fill-current" />}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Voters */}
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-r from-emerald-500 to-teal-600">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">Top Voters</h3>
                </div>
                <Card className="border-slate-200 bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {topVoters.map((voter) => (
                        <div
                          key={voter.rank}
                          className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-slate-50"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-r from-emerald-500 to-teal-600 text-sm font-bold text-white">
                            {voter.rank}
                          </div>
                          <img
                            src={voter.avatar}
                            alt={voter.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-slate-800">{voter.name}</div>
                            <div className="text-sm text-slate-500">{voter.votes} votes cast</div>
                          </div>
                          {voter.rank <= 3 && (
                            <div className="text-amber-500">
                              {voter.rank === 1 && <Star className="h-5 w-5 fill-current" />}
                              {voter.rank === 2 && <Star className="h-4 w-4 fill-current" />}
                              {voter.rank === 3 && <Star className="h-3 w-3 fill-current" />}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Image Voted */}
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-r from-amber-500 to-orange-600">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">Top Image Voted</h3>
                </div>
                <Card className="border-slate-200 bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {topImageOwners.map((owner) => (
                        <div
                          key={owner.rank}
                          className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-slate-50"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-r from-amber-500 to-orange-600 text-sm font-bold text-white">
                            {owner.rank}
                          </div>
                          <img
                            src={owner.avatar}
                            alt={owner.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-slate-800">{owner.name}</div>
                            <div className="text-sm text-slate-500">{owner.totalVotes.toLocaleString()} total votes</div>
                          </div>
                          {owner.rank <= 3 && (
                            <div className="text-amber-500">
                              {owner.rank === 1 && <Award className="h-5 w-5 fill-current" />}
                              {owner.rank === 2 && <Award className="h-4 w-4 fill-current" />}
                              {owner.rank === 3 && <Award className="h-3 w-3 fill-current" />}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-white py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Top 3 Most Voted{" "}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Images
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Discover the most popular AI-generated images of the year, voted by our community
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {topVotedImages.map((image, index) => (
              <Card
                key={image.id}
                className="group relative overflow-hidden border-slate-200 bg-white/70 backdrop-blur-sm transition-all hover:shadow-lg"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-4/3 overflow-hidden">
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs font-medium text-white">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {image.votes.toLocaleString()}
                    </div>
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
                      <h3 className="font-semibold">{image.title}</h3>
                      <p className="text-sm opacity-90">by {image.creator.name}</p>
                    </div>
                  </div>

                  {/* Creator Info */}
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={image.creator.avatar}
                        alt={image.creator.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800">{image.creator.name}</h4>
                        <p className="text-sm text-slate-600">{image.creator.bio}</p>
                      </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex items-center gap-2">
                      <Link
                        href={image.creator.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-blue-500 hover:text-white"
                      >
                        <Twitter className="h-4 w-4" />
                      </Link>
                      <Link
                        href={image.creator.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-pink-500 hover:text-white"
                      >
                        <Instagram className="h-4 w-4" />
                      </Link>
                      <Link
                        href={image.creator.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-blue-600 hover:text-white"
                      >
                        <Facebook className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="bg-linear-to-br from-slate-50 to-blue-50/50 py-20 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Choose Your{" "}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Plan
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Start free and upgrade as you grow. All plans include our core AI features.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden border-2 ${
                  plan.popular
                    ? "border-emerald-300 bg-white/70 backdrop-blur-sm shadow-lg scale-105"
                    : "border-slate-200 bg-white/70 backdrop-blur-sm"
                }`}
              >
                {plan.badge && (
                  <div className={`absolute top-0 right-0 bg-linear-to-r ${plan.badgeColor} px-4 py-1 text-sm font-medium text-white`}>
                    {plan.badge}
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="mb-8 text-center">
                    <h3 className="text-2xl font-bold text-slate-800">
                      {plan.name}
                    </h3>
                    <div className="mt-4 flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-slate-800">
                        {plan.price}
                      </span>
                      <span className="ml-2 text-slate-600">{plan.period}</span>
                    </div>
                    <p className="mt-2 text-slate-600">
                      {plan.description}
                    </p>
                  </div>

                  <ul className="mb-8 space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                        <span className="text-sm text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/dashboard">
                    <Button
                      className={`w-full cursor-pointer gap-2 ${plan.buttonClass}`}
                      size="lg"
                      variant={plan.buttonVariant}
                    >
                      {plan.buttonIcon}
                      {plan.buttonText}
                    </Button>
                  </Link>

                  <p className="mt-4 text-center text-xs text-slate-500">
                    {plan.footerText}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-blue-100/70 to-purple-100/70 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Ready to Generate Your Images?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Join thousands of creators using AI to enhance their visual
              content
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="cursor-pointer gap-2 bg-linear-to-r from-blue-500 to-purple-600 px-8 py-6 text-base hover:from-blue-600 hover:to-purple-700"
                >
                  <Sparkles className="h-5 w-5" />
                  Try It Free Now
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="cursor-pointer gap-2 border-slate-300 px-8 py-6 text-base text-slate-700 hover:bg-slate-100"
                >
                  <Download className="h-5 w-5" />
                  View Examples
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            <div className="grid gap-8 md:grid-cols-4">
              <div className="md:col-span-2">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-r from-blue-500 to-purple-600 shadow-lg">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                    OlymPoint Social App
                  </span>
                </div>
                <p className="max-w-md text-slate-600">
                  Professional image editing powered by artificial intelligence.
                  Generate your images with cutting-edge AI technology.
                </p>
              </div>

              <div>
                <h3 className="mb-4 font-semibold text-slate-800">Product</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li>
                    <Link
                      href="#features"
                      className="transition-colors hover:text-blue-600"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#pricing"
                      className="transition-colors hover:text-blue-600"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard"
                      className="transition-colors hover:text-blue-600"
                    >
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-semibold text-slate-800">Support</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li>
                    <Link
                      href="#"
                      className="transition-colors hover:text-blue-600"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="transition-colors hover:text-blue-600"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="transition-colors hover:text-blue-600"
                    >
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-16 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
              <p>&copy; 2025 OlymPoint Social App. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}