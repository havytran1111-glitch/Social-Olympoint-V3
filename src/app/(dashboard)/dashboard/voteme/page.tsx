"use client";

import {
  Loader2,
  Heart,
  TrendingUp,
  Users,
  Calendar,
  Share2,
  Eye,
  MessageCircle,
  Award,
  Star,
  BarChart3,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";
import Link from "next/link";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
// import { verifyVoteAndAddCredit } from "~/actions/users";
import { toast } from "sonner";
import { bcs } from "@mysten/sui/bcs";

interface VoteMeItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  votes: number;
  views: number;
  comments: number;
  createdAt: Date;
  status: "active" | "featured" | "trending";
  category: string;
  tags: string[];
  socialLinks: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
}

export default function VoteMePage() {
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [myItems, setMyItems] = useState<VoteMeItem[]>([]);
  const [stats, setStats] = useState({
    totalVotes: 0,
    totalViews: 0,
    totalComments: 0,
    ranking: 0,
  });
  const { mutate: signAndExecute, isPending } = useSignAndExecuteTransaction();

  const handleVote = (itemId: string) => {
    const txb = new Transaction();
    // This is a placeholder for the actual smart contract call
    // In a real scenario, you would replace this with:
    // txb.moveCall({
    //   target: `0xYOUR_PACKAGE_ID::YOUR_MODULE::vote_image`,
    //   arguments: [txb.object(itemId), txb.pure("SUI_ADDRESS_OF_VOTER")],
    // });
    txb.moveCall({
        target: `0x2::devnet_nft::mint`,
        arguments: [txb.pure(bcs.string().serialize("My Voted NFT")), txb.pure(bcs.string().serialize("This NFT represents a vote")), txb.pure(bcs.string().serialize("ipfs://QmVote.."))],
    });

    signAndExecute(
      {
        transaction: txb,
      },
      {
        onSuccess: async (result) => {
          toast.info(`Executing transaction... Digest: ${result.digest.slice(0,10)}...`);
          try {
            // In a real app, you might want to wait for the transaction to be finalized
            // using client.waitForTransaction({ digest: result.digest, })
            
            // const { newCredits } = await verifyVoteAndAddCredit(result.digest);
            
            // toast.success("Vote successful! +1 Credit.", {
            //   description: `Your new credit balance is ${newCredits}.`,
            // });

            // Optimistically update the UI
            setMyItems(prevItems =>
              prevItems.map(item =>
                item.id === itemId ? { ...item, votes: item.votes + 1 } : item
              )
            );
            setStats(prevStats => ({ ...prevStats, totalVotes: prevStats.totalVotes + 1 }));

          } catch (error) {
            console.error("Error verifying vote:", error);
            toast.error("Failed to verify vote on the server.");
          }
        },
        onError: (error) => {
          console.error("Transaction failed", error);
          toast.error("Your vote transaction failed.", {
            description: error.message,
          });
        },
      }
    );
  };

  // Mock data for demonstration
  useEffect(() => {
    const mockItems: VoteMeItem[] = [
      {
        id: "1",
        title: "AI Generated Landscape",
        description: "A stunning landscape created with advanced AI technology. Vote for this masterpiece!",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        votes: 1250,
        views: 5420,
        comments: 89,
        createdAt: new Date("2024-01-15"),
        status: "trending",
        category: "Landscape",
        tags: ["AI", "Nature", "Landscape"],
        socialLinks: {
          twitter: "https://twitter.com/share?url=https://olympoint.com/vote/1",
          instagram: "https://instagram.com/share?url=https://olympoint.com/vote/1",
          facebook: "https://facebook.com/sharer/sharer.php?u=https://olympoint.com/vote/1",
        },
      },
      {
        id: "2",
        title: "Futuristic Cityscape",
        description: "Cyberpunk city of the future. Help this artwork reach the top!",
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
        votes: 980,
        views: 3890,
        comments: 67,
        createdAt: new Date("2024-01-20"),
        status: "active",
        category: "Urban",
        tags: ["AI", "Cyberpunk", "City"],
        socialLinks: {
          twitter: "https://twitter.com/share?url=https://olympoint.com/vote/2",
          instagram: "https://instagram.com/share?url=https://olympoint.com/vote/2",
          facebook: "https://facebook.com/sharer/sharer.php?u=https://olympoint.com/vote/2",
        },
      },
    ];

    const mockStats = {
      totalVotes: 2230,
      totalViews: 9310,
      totalComments: 156,
      ranking: 12,
    };

    setTimeout(() => {
      setMyItems(mockItems);
      setStats(mockStats);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "trending":
        return "bg-red-100 text-red-800";
      case "featured":
        return "bg-purple-100 text-purple-800";
      case "active":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "trending":
        return <TrendingUp className="h-3 w-3" />;
      case "featured":
        return <Star className="h-3 w-3" />;
      case "active":
        return <Heart className="h-3 w-3" />;
      default:
        return null;
    }
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
        <p>Please log in to view your VoteMe items</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">VoteMe</h1>
          <p className="text-muted-foreground">
            Share your AI creations and get community votes
          </p>
        </div>
        <Button className="gap-2">
          <Heart className="h-4 w-4" />
          Add New Item
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVotes.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all your items
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              People who saw your work
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComments}</div>
            <p className="text-xs text-muted-foreground">
              Community engagement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ranking</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{stats.ranking}</div>
            <p className="text-xs text-muted-foreground">
              Overall leaderboard position
            </p>
          </CardContent>
        </Card>
      </div>

      {/* My VoteMe Items */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">My Items</h2>
        {myItems.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Heart className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No items yet</h3>
              <p className="text-muted-foreground">
                Share your AI creations to get votes from the community
              </p>
              <Button className="mt-4 gap-2">
                <Heart className="h-4 w-4" />
                Add Your First Item
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {myItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <Badge className={`${getStatusColor(item.status)} flex items-center gap-1`}>
                      {getStatusIcon(item.status)}
                      {item.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center gap-1 text-lg font-semibold">
                        <Heart className="h-4 w-4 text-red-500" />
                        {item.votes}
                      </div>
                      <div className="text-xs text-muted-foreground">Votes</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 text-lg font-semibold">
                        <Eye className="h-4 w-4 text-blue-500" />
                        {item.views}
                      </div>
                      <div className="text-xs text-muted-foreground">Views</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 text-lg font-semibold">
                        <MessageCircle className="h-4 w-4 text-green-500" />
                        {item.comments}
                      </div>
                      <div className="text-xs text-muted-foreground">Comments</div>
                    </div>
                  </div>

                  {/* Progress Bar for trending items */}
                  {item.status === "trending" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Trending Progress</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 gap-2"
                      onClick={() => handleVote(item.id)}
                      disabled={isPending}
                    >
                      <Heart className="h-4 w-4" />
                      {isPending ? "Voting..." : "Sign to Vote"}
                    </Button>
                    <Button variant="outline" size="icon" disabled={isPending}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-2">
                    {item.socialLinks.twitter && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={item.socialLinks.twitter} target="_blank">
                          Share on Twitter
                        </Link>
                      </Button>
                    )}
                    {item.socialLinks.instagram && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={item.socialLinks.instagram} target="_blank">
                          Share on Instagram
                        </Link>
                      </Button>
                    )}
                    {item.socialLinks.facebook && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={item.socialLinks.facebook} target="_blank">
                          Share on Facebook
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Leaderboard Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Your Position in Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                #{stats.ranking}
              </div>
              <div>
                <p className="font-semibold">{user.displayName || "You"}</p>
                <p className="text-sm text-muted-foreground">
                  {stats.totalVotes.toLocaleString()} votes • {stats.totalViews.toLocaleString()} views
                </p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link href="/leaderboard">
                View Full Leaderboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}