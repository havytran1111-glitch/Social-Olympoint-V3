"use client";

import { useActionState } from "react";
import { generateImage } from "~/actions/generate";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";

/* ================= SUBMIT BUTTON ================= */

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Generating..." : "Generate Image"}
    </Button>
  );
}

/* ================= PAGE ================= */

export default function GeneratePage() {
  const [state, formAction, pending] = useActionState(generateImage, {
    error: undefined,
    imageUrl: undefined,
    blobId: undefined,
  });

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Generate Image with AI</CardTitle>
          <CardDescription>
            Enter a prompt to generate an image.
          </CardDescription>
        </CardHeader>

        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="prompt">Prompt</label>
              <Input
                id="prompt"
                name="prompt"
                placeholder="e.g. A futuristic city on Mars"
                required
              />
              {state?.error && (
                <p className="text-sm text-red-500">{state.error}</p>
              )}
            </div>

            {state?.imageUrl && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Generated Image:</h3>
                <div className="overflow-hidden rounded-lg border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={state.imageUrl}
                    alt="Generated"
                    className="aspect-square w-full object-contain bg-slate-100"
                  />
                </div>

                {state.blobId && (
                  <p className="text-xs break-all text-muted-foreground">
                    <strong>Blob ID:</strong> {state.blobId}
                  </p>
                )}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex items-center gap-4">
            <SubmitButton pending={pending} />
            <p className="text-sm text-muted-foreground">
              3 credits are required to perform this action.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
