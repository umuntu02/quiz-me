"use client";

import Header from "@/components/Header";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import {
  BookOpen,
  Calculator,
  Dumbbell,
  Film,
  Flag,
  FlaskConical,
  Globe,
  Heart,
  Landmark,
  Music,
  Utensils,
  Wallet,
} from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "General", icon: Globe },
  { name: "Country", icon: Flag },
  { name: "Music", icon: Music },
  { name: "Movies", icon: Film },
  { name: "Science", icon: FlaskConical },
  { name: "Love", icon: Heart },
  { name: "Bible", icon: BookOpen },
  { name: "History", icon: Landmark },
  { name: "Finance", icon: Wallet },
  { name: "Math", icon: Calculator },
  { name: "Sports", icon: Dumbbell },
  { name: "Food", icon: Utensils },
];

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted-foreground">
      <div className="container mx-auto px-3 py-3">
        <Header />

        <section className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">
            Welcome{" "}
            <span className="font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              {!isAuthenticated ? "to QuizMe" : user?.name}
            </span>
          </h2>
          <p className="text-sm sm:text-xl text-muted-foreground mb-8">
            Test your knowledge solo or challenge your friends in multiplayer
            mode
          </p>

          <h2 className="text-2xl font-bold mb-5 text-center">
            choose a category
          </h2>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-3 lg:grid-cols-4 sm:gap-4">
            {categories.map((category) => (
              <Link
                href={`/game/${category.name.toLowerCase()}`}
                key={category.name}
              >
                <Card className="hover:bg-gradient-to-r from-primary to-purple-500 hover:text-white transition-colorstransition-shadow justify-center">
                  <CardHeader className="text-center flex flex-col items-center gap-2">
                    <category.icon className="text-purple-500 w-6 h-6 sm:w-8 sm:h-8" />
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto text-center hidden sm:block">
          <h2 className="text-2xl font-bold mb-4">Leaderboards</h2>
          <Button asChild>
            <Link href="/leaderboard">View Global Leaderboards</Link>
          </Button>
        </section>
      </div>
      <MobileBottomNav />
    </main>
  );
}
