"use client";

import BAckArrow from "@/components/back-arrows";
import { GameModeCard } from "@/components/game-mode-card";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const categoryParam = params?.category as string;
  const displayName =
    categoryParam.charAt(0).toUpperCase() +
    categoryParam.slice(1).toLowerCase();

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted-foreground">
      <div className="container mx-auto p-2 sm:p-4">
        <Header />
        <span className="flex mb-2">
          <BAckArrow lien="/" />
          <h2 className="text-2xl text-center sm:text-3xl font-bold w-full pr-7">
            {displayName}
          </h2>
        </span>

        <section className="max-w-4xl mx-auto text-center mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <GameModeCard
              title="Solo Mode"
              description="Challenge yourself with 10 questions on various topics"
              icon="User"
              href="/game/solo"
            />
            <GameModeCard
              title="Multiplayer Mode"
              description="Compete with up to 4 players in real-time"
              icon="Users"
              href="/game/multiplayer"
            />
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Random Quiz</CardTitle>
              <CardDescription>
                Get questions from all categories mixed together
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>10 questions, 10 seconds per question</p>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                className="w-full bg-gradient-to-b from-primary to-purple-500"
              >
                <Link href="/game/random">Play Random Quiz</Link>
              </Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </main>
  );
}
