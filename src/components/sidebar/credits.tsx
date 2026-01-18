"use client";

import { Coins, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function Credits() {
  const [credits, setCredits] = useState<number>(10); 
  useEffect(() => {
  
  }, []);

  return (
    <div className="group flex items-center gap-2">
      <div className="flex items-center gap-1.5">
        <div className="relative">
          <Coins className="h-4 w-4 text-yellow-500 transition-colors duration-200 group-hover:text-yellow-400" />
          <Sparkles className="absolute -top-1 -right-1 h-2 w-2 text-yellow-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-bold text-foreground transition-colors duration-200 group-hover:text-yellow-600">
            {credits}
          </span>
          <span className="text-xs leading-tight text-muted-foreground">
            Credits
          </span>
        </div>
      </div>
    </div>
  );
}
