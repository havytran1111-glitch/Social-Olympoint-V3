"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
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

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Generating on Walrus..." : "Generate Image"}
    </Button>
  );
}

/* ================= INITIAL STATE ================= */

const initialState = {
  error: undefined as string | undefined,
  imageUrl: undefined as string | undefined,
  blobId: undefined as string | undefined,
};

/* ================= PAGE ================= */

export default function GeneratePage() {
  const [state, formAction] = useActionState(
    generateImage,
    initialState
  );

  return (
    <div className="container mx-auto max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Generate Image with AI</CardTitle>
          <CardDescription>
            Enter a prompt to generate an image and store it permanently on{" "}
            <span className="font-medium">Walrus Protocol</span>.
          </CardDescription>
        </CardHeader>

        <form action={formAction}>
          <CardContent className="space-y-5">
            {/* PROMPT INPUT */}
            <div className="space-y-2">
              <label htmlFor="prompt" className="text-sm font-medium">
                Prompt
              </label>
              <Input
                id="prompt"
                name="prompt"
                placeholder="A futuristic city on Mars"
                required
              />

              {state?.error && (
                <p className="text-sm text-red-500">{state.error}</p>
              )}
            </div>

            {/* RESULT */}
            {state?.imageUrl && (
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold">
                  Generated Image (Walrus)
                </h3>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={state.imageUrl}
                  alt="Generated AI Image"
                  className="w-full rounded-lg border"
                />

                <div className="rounded-md bg-slate-50 p-3 text-xs">
                  <p className="break-all">
                    <span className="font-semibold">Walrus Blob ID:</span>{" "}
                    {state.blobId}
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    Stored permanently on Walrus decentralized storage
                  </p>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex items-center gap-4">
            <SubmitButton />
            <span className="text-sm text-muted-foreground">
              3 credits required
            </span>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
