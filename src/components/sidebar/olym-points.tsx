"use client";

import { Award, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function OlymPoints() {
  const [points, setPoints] = useState(1250); // Mock data

  return (
    <div className="group flex cursor-pointer items-center gap-2 rounded-full border border-transparent bg-muted/50 px-3 py-1.5 transition-colors hover:border-blue-400/50 hover:bg-blue-500/10">
      <div className="flex items-center gap-1.5">
        <div className="relative">
          <Award className="h-4 w-4 text-blue-500 transition-colors duration-200 group-hover:text-blue-400" />
          <Sparkles className="absolute -top-1 -right-1 h-2 w-2 text-blue-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-foreground transition-colors duration-200 group-hover:text-blue-600">
            {points.toLocaleString()}
          </span>
          <span className="text-xs leading-tight text-muted-foreground">
            OlymPoints
          </span>
        </div>
      </div>
    </div>
  );
}
