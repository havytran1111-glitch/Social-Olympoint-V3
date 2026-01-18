"use client";

import {
  Loader2,
  Search,
  Grid3X3,
  List,
  Calendar,
  Image as ImageIcon,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getUserWalrusStorage } from "~/actions/walrus-storage";

import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export interface WalrusStorage {
  id: string;
  name: string;
  imageUrl: string;
  blobId: string;
  createdAt: string;
}

type ViewMode = "grid" | "list";

export default function WalrusStoragePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<WalrusStorage[]>([]);
  const [filtered, setFiltered] = useState<WalrusStorage[]>([]);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/auth/login");
      return;
    }

    (async () => {
      const res = await getUserWalrusStorage();
      if (res.success) {
        setItems(res.walrusStorage || []);
        setFiltered(res.walrusStorage || []);
      }
      setIsLoading(false);
    })();
  }, [user, loading, router]);

  useEffect(() => {
    setFiltered(
      items.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, items]);

  if (isLoading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Walrus Storage</h1>
          <p className="text-muted-foreground">
            {filtered.length} stored images
          </p>
        </div>
        <Button onClick={() => router.push("/dashboard/create")}>
          <Plus className="mr-2 h-4 w-4" />
          New Walrus Image
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search Walrus images..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Content */}
      {filtered.length === 0 ? (
        <Card className="py-20 text-center">
          <CardContent>
            <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4">No Walrus images yet</p>
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-48 w-full object-cover"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold truncate">{item.name}</h3>
                <p className="text-xs text-muted-foreground">
                  <Calendar className="mr-1 inline h-3 w-3" />
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <img
                  src={item.imageUrl}
                  className="h-16 w-20 rounded object-cover"
                />
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.blobId}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
