"use client";

import {
  Loader2,
  Image as ImageIcon,
  Sparkles,
  Users,
  Calendar,
  TrendingUp,
  Camera,
  Star,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { getUserWalrusStorage } from "~/actions/walrus-storage";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

/* ================= TYPES ================= */

interface IPFSStorage {
  id: string;
  name: string | null;
  imageUrl: string;
  filePath: string;
  userId: string;
  createdAt: string; // server trả JSON
  updatedAt: string;
}

interface UserStats {
  totalIPFSStorage: number;
  thisMonth: number;
  thisWeek: number;
}

/* ================= PAGE ================= */

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userIPFSStorage, setUserIPFSStorage] = useState<IPFSStorage[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    totalIPFSStorage: 0,
    thisMonth: 0,
    thisWeek: 0,
  });

  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/auth/sign-in");
      return;
    }

    const initializeDashboard = async () => {
      try {
        const result = await getUserWalrusStorage();

        if (result.success && result.walrusStorage) {
          const data = result.walrusStorage;
          // setUserWalrusStorage(data);

          const now = new Date();
          const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          const thisWeek = new Date(
            now.getTime() - 7 * 24 * 60 * 60 * 1000
          );

          setUserStats({
            totalIPFSStorage: data.length,
            thisMonth: data.filter(
              (p) => new Date(p.createdAt) >= thisMonth
            ).length,
            thisWeek: data.filter(
              (p) => new Date(p.createdAt) >= thisWeek
            ).length,
          });
        }
      } catch (err) {
        console.error("Dashboard init error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    void initializeDashboard();
  }, [user, loading, router]);

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Welcome back{user?.displayName ? `, ${user.displayName}` : ""}!
        </h1>
        <p className="text-muted-foreground">
          Overview of your IPFS image workspace
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total IPFS" value={userStats.totalIPFSStorage} icon={<Users className="h-4 w-4" />} />
        <StatCard title="This Month" value={userStats.thisMonth} icon={<Calendar className="h-4 w-4" />} />
        <StatCard title="This Week" value={userStats.thisWeek} icon={<TrendingUp className="h-4 w-4" />} />
        <StatCard title="Status" value="Active" icon={<Star className="h-4 w-4" />} />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ActionButton icon={<Camera />} label="Create IPFS Storage" onClick={() => router.push("/dashboard/create")} />
          <ActionButton icon={<ImageIcon />} label="View All Storage" onClick={() => router.push("/dashboard/ipfs-storage")} />
          <ActionButton icon={<Users />} label="Account Settings" onClick={() => router.push("/dashboard/settings")} />
        </CardContent>
      </Card>

      {/* Recent IPFS Storage */}
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Recent IPFS Storage
          </CardTitle>
          {userIPFSStorage.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/ipfs-storage")}>
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </CardHeader>

        <CardContent>
          {userIPFSStorage.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No IPFS Storage yet
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {userIPFSStorage.slice(0, 8).map((ipfs) => (
                <div key={ipfs.id} className="rounded-lg border overflow-hidden">
                  <img
                    src={ipfs.imageUrl}
                    alt={ipfs.name ?? "IPFS Image"}
                    className="aspect-square w-full object-cover"
                  />
                  <div className="p-3">
                    <p className="truncate text-sm font-medium">
                      {ipfs.name ?? "Untitled"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(ipfs.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* ================= HELPERS ================= */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function ActionButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Button onClick={onClick} className="h-auto flex-col gap-2 p-6">
      <div className="h-8 w-8">{icon}</div>
      {label}
    </Button>
  );
}
