"use client";

import { Award, Trophy, Crown, User, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/ui/tabs";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

const topCreators = [
  { rank: 1, name: "Alex Chen", totalVotes: 18500, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face", change: 5 },
  { rank: 2, name: "Maria Rodriguez", totalVotes: 17200, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face", change: -1 },
  { rank: 3, name: "David Kim", totalVotes: 16800, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face", change: 2 },
  { rank: 4, name: "Sarah Johnson", totalVotes: 15400, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face", change: 0 },
  { rank: 5, name: "Chris Lee", totalVotes: 14900, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face", change: 3 },
];

const topVoters = [
    { rank: 1, name: "Jessica Wang", totalVotes: 11240, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face" },
    { rank: 2, name: "Mike Wilson", totalVotes: 10870, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face" },
    { rank: 3, name: "Emma Davis", totalVotes: 10230, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face" },
    { rank: 4, name: "Robert Martinez", totalVotes: 9870, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
    { rank: 5, name: "Lisa Garcia", totalVotes: 9450, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face" },
];

const topImageOwners = [
    { rank: 1, name: "Olivia Brown", totalImages: 230, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face" },
    { rank: 2, name: "James Taylor", totalImages: 215, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
    { rank: 3, name: "Sophia Miller", totalImages: 198, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face" },
    { rank: 4, name: "William Anderson", totalImages: 182, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face" },
    { rank: 5, name: "Isabella Wilson", totalImages: 176, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" },
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("creators");

  const getRankIndicator = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Trophy className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-yellow-700" />;
    return <span className="text-muted-foreground">{rank}</span>;
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
          <p className="text-muted-foreground">
            See who is leading the OlymPoint community
          </p>
        </div>
      </div>

      <Tabs defaultValue="creators" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="creators">
            <Users className="mr-2 h-4 w-4" /> Top Creators
          </TabsTrigger>
          <TabsTrigger value="voters">
            <TrendingUp className="mr-2 h-4 w-4" /> Top Voters
          </TabsTrigger>
          <TabsTrigger value="owners">
            <User className="mr-2 h-4 w-4" /> Top Image Owners
          </TabsTrigger>
        </TabsList>

        <TabsContent value="creators">
          <Card>
            <CardHeader>
              <CardTitle>Top Creators</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Rank</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead className="text-right">Total Votes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCreators.map((user) => (
                    <TableRow key={user.rank}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                            {getRankIndicator(user.rank)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{user.totalVotes.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="voters">
          <Card>
            <CardHeader>
              <CardTitle>Top Voters</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Rank</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead className="text-right">Total Votes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topVoters.map((user) => (
                    <TableRow key={user.rank}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                            {getRankIndicator(user.rank)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{user.totalVotes.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="owners">
          <Card>
            <CardHeader>
              <CardTitle>Top Image Owners</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Rank</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead className="text-right">Total Images</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topImageOwners.map((user) => (
                    <TableRow key={user.rank}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                            {getRankIndicator(user.rank)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{user.totalImages.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
