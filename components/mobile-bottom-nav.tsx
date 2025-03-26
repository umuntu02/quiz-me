"use client";

import { BookOpen, Home, Search } from "lucide-react";
import Link from "next/link";

export function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-14 bg-muted-foreground border-t md:hidden">
      <div className="grid h-full grid-cols-3 mx-auto text-white">
        <Link href="/" className="flex flex-col items-center justify-center">
          <Home className="w-5 h-5 mb-1" />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          href="/leaderboard"
          className="flex flex-col items-center justify-center"
        >
          <BookOpen className="w-5 h-5 mb-1" />
          <span className="text-xs">Leaderboard</span>
        </Link>
        <Link href="#" className="flex flex-col items-center justify-center">
          <Search className="w-5 h-5 mb-1" />
          <span className="text-xs">Search</span>
        </Link>
      </div>
    </div>
  );
}
