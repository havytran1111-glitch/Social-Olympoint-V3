"use client";

import {
  Loader2,
  Search,
  Grid3X3,
  List,
  Calendar,
  Image as ImageIcon,
  MoreVertical,
  Plus,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { getUserWalrusStorage, type WalrusStorage } from "~/actions/walrus-storage";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useRouter } from "next/navigation";

type ViewMode = "grid" | "list";
type SortBy = "newest" | "oldest" | "name";

/* ================= PAGE ================= */

export default function WalrusStoragePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [walrusStorage, setWalrusStorage] = useState<WalrusStorage[]>([]);
  const [filteredStorage, setFilteredStorage] = useState<WalrusStorage[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortBy>("newest");

  /* ================= INIT ================= */

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/auth/login");
      return;
    }

    const init = async () => {
      try {
        const res = await getUserWalrusStorage();
        if (res.success) {
          setWalrusStorage(res.walrusStorage || []);
          setFilteredStorage(res.walrusStorage || []);
        }
      } catch (err) {
        console.error("Walrus storage load failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    void init();
  }, [user, loading, router]);

  /* ================= FILTER + SORT ================= */

  useEffect(() => {
    let data = walrusStorage.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    switch (sortBy) {
      case "newest":
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime(),
        );
        break;
      case "oldest":
        data.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime(),
        );
        break;
      case "name":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredStorage([...data]);
  }, [walrusStorage, searchQuery, sortBy]);

  const handleClick = () => {
    router.push("/dashboard/create");
  };

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Walrus Storage</h1>
          <p className="text-muted-foreground">
            Your AI-generated images stored on Walrus Protocol (
            {filteredStorage.length})
          </p>
        </div>

        <Button onClick={handleClick} className="gap-2">
          <Plus className="h-4 w-4" />
          New Image
        </Button>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search Walrus images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="rounded-md border px-3 py-2 text-sm"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name">Name A–Z</option>
            </select>

            <div className="flex rounded-md border">
              <Button
                size="sm"
                variant={viewMode === "grid" ? "default" : "ghost"}
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant={viewMode === "list" ? "default" : "ghost"}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {filteredStorage.length === 0 ? (
        <Card className="py-20 text-center">
          <CardContent>
            <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">
              No Walrus images found
            </h3>
            <Button className="mt-6" onClick={handleClick}>
              <Plus className="mr-2 h-4 w-4" />
              Create Image
            </Button>
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredStorage.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer overflow-hidden"
              onClick={handleClick}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-48 w-full object-cover"
              />
              <CardContent className="p-4">
                <h3 className="truncate font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  <Calendar className="mr-1 inline h-3 w-3" />
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredStorage.map((item) => (
            <Card
              key={item.id}
              className="flex items-center gap-4 p-4"
              onClick={handleClick}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-16 w-20 rounded object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
