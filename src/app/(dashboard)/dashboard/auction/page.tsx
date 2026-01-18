"use client";

import {
  Loader2,
  Plus,
  Gavel,
  Clock,
  Users,
  TrendingUp,
  Eye,
  Heart,
  MoreVertical,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";

interface Auction {
  id: string;
  nftId: string;
  nftName: string;
  nftImage: string;
  startingPrice: number;
  currentBid: number;
  minBidIncrement: number;
  endTime: Date;
  totalBids: number;
  status: "active" | "ended" | "cancelled";
  creator: string;
  highestBidder?: string;
}

export default function AuctionPage() {
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [activeAuctions, setActiveAuctions] = useState<Auction[]>([]);
  const [myAuctions, setMyAuctions] = useState<Auction[]>([]);

  // Mock data for demonstration
  useEffect(() => {
    const mockActiveAuctions: Auction[] = [
      {
        id: "1",
        nftId: "nft-1",
        nftName: "AI Generated Landscape",
        nftImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        startingPrice: 0.5,
        currentBid: 1.2,
        minBidIncrement: 0.1,
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        totalBids: 8,
        status: "active",
        creator: "Alice Chen",
        highestBidder: "Bob Wilson",
      },
      {
        id: "2",
        nftId: "nft-2",
        nftName: "Futuristic Cityscape",
        nftImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
        startingPrice: 1.0,
        currentBid: 2.5,
        minBidIncrement: 0.2,
        endTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
        totalBids: 12,
        status: "active",
        creator: "Maria Rodriguez",
        highestBidder: "Charlie Brown",
      },
    ];

    const mockMyAuctions: Auction[] = [
      {
        id: "3",
        nftId: "my-nft-1",
        nftName: "My AI Portrait",
        nftImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop&crop=face",
        startingPrice: 0.8,
        currentBid: 1.8,
        minBidIncrement: 0.1,
        endTime: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
        totalBids: 6,
        status: "active",
        creator: user?.displayName || "You",
        highestBidder: "Diana Prince",
      },
    ];

    setTimeout(() => {
      setActiveAuctions(mockActiveAuctions);
      setMyAuctions(mockMyAuctions);
      setIsLoading(false);
    }, 1000);
  }, [user]);

  const formatTimeLeft = (endTime: Date) => {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();

    if (diff <= 0) return "Ended";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  const getTimeProgress = (endTime: Date) => {
    const now = new Date();
    const start = new Date(endTime.getTime() - 24 * 60 * 60 * 1000); // Assume 24h auctions
    const progress = ((now.getTime() - start.getTime()) / (endTime.getTime() - start.getTime())) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  if (loading || isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Please log in to view auctions</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">NFT Auctions</h1>
          <p className="text-muted-foreground">
            Participate in NFT auctions and manage your listings
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Auction
        </Button>
      </div>

      {/* My Auctions Section */}
      {myAuctions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">My Auctions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {myAuctions.map((auction) => (
              <Card key={auction.id} className="overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={auction.nftImage}
                    alt={auction.nftName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{auction.nftName}</CardTitle>
                    <Badge variant="secondary">Your Auction</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Bid</p>
                      <p className="text-lg font-semibold">{auction.currentBid} SUI</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Time Left</p>
                      <p className="text-lg font-semibold">{formatTimeLeft(auction.endTime)}</p>
                    </div>
                  </div>

                  <Progress value={getTimeProgress(auction.endTime)} className="h-2" />

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{auction.totalBids} bids</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>Highest: {auction.highestBidder}</span>
                    </div>
                  </div>

                  <Button className="w-full gap-2" variant="outline">
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Active Auctions Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Active Auctions</h2>
        {activeAuctions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Gavel className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No Active Auctions</h3>
              <p className="text-muted-foreground">
                Check back later for new NFT auctions
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeAuctions.map((auction) => (
              <Card key={auction.id} className="overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={auction.nftImage}
                    alt={auction.nftName}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{auction.nftName}</CardTitle>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">by {auction.creator}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Bid</p>
                      <p className="text-lg font-semibold">{auction.currentBid} SUI</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Time Left</p>
                      <p className="text-lg font-semibold">{formatTimeLeft(auction.endTime)}</p>
                    </div>
                  </div>

                  <Progress value={getTimeProgress(auction.endTime)} className="h-2" />

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{auction.totalBids} bids</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>Min increment: {auction.minBidIncrement} SUI</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 gap-2">
                      <Gavel className="h-4 w-4" />
                      Place Bid
                    </Button>
                    <Button variant="outline" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Auction Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Auction Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{activeAuctions.length}</div>
              <div className="text-sm text-muted-foreground">Active Auctions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{myAuctions.length}</div>
              <div className="text-sm text-muted-foreground">My Auctions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {activeAuctions.reduce((sum, auction) => sum + auction.totalBids, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Bids</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {activeAuctions.reduce((sum, auction) => sum + auction.currentBid, 0).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Total Value (SUI)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}