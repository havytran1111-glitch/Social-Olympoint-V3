"use client";

import { useState } from "react";
import { createWalrusStorage } from "~/actions/walrus-storage";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function CreatePage() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [blobId, setBlobId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);

    await createWalrusStorage({
      name,
      imageUrl,
      blobId,
    });

    setLoading(false);
    alert("Walrus image saved!");
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Create Walrus Storage</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Image name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Walrus image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <Input
            placeholder="Blob ID"
            value={blobId}
            onChange={(e) => setBlobId(e.target.value)}
          />

          <Button onClick={handleCreate} disabled={loading}>
            {loading ? "Saving..." : "Save to Walrus"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
