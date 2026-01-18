"use client";

import { Archive, Gavel, Heart } from "lucide-react";

export default function PlanLimits() {
  const limits = [
    {
      icon: <Archive className="h-4 w-4 text-blue-500" />,
      text: "IPFS: 3 images/month",
    },
    {
      icon: <Gavel className="h-4 w-4 text-purple-500" />,
      text: "NFT Auction Support: 3 NFTs/month",
    },
    {
      icon: <Heart className="h-4 w-4 text-red-500" />,
      text: "Olym Points: Normal",
    },
  ];

  return (
    <div className="rounded-lg bg-muted/50 p-3">
      <p className="mb-2 text-xs font-semibold text-muted-foreground">
        Current Plan Limits
      </p>
      <ul className="space-y-2">
        {limits.map((limit, index) => (
          <li key={index} className="flex items-center gap-2 text-xs">
            {limit.icon}
            <span className="text-foreground">{limit.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
