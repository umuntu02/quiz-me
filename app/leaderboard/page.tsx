"use client";

import BAckArrow from "@/components/back-arrows";
import Header from "@/components/Header";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function LeaderboardPage() {
  const [category, setCategory] = useState("all");

  // Mock leaderboard data
  const leaderboardData = [
    {
      id: "user1",
      name: "John Doe",
      score: 980,
      gamesPlayed: 12,
      winRate: 75,
      badges: ["Perfect Score", "Quiz Master"],
    },
    {
      id: "user2",
      name: "Jane Smith",
      score: 920,
      gamesPlayed: 10,
      winRate: 80,
      badges: ["Fast Learner"],
    },
    {
      id: "user3",
      name: "Alex Johnson",
      score: 850,
      gamesPlayed: 15,
      winRate: 60,
      badges: ["Persistent Player"],
    },
    {
      id: "user4",
      name: "Sam Wilson",
      score: 820,
      gamesPlayed: 8,
      winRate: 50,
      badges: [],
    },
    {
      id: "user5",
      name: "Taylor Brown",
      score: 780,
      gamesPlayed: 9,
      winRate: 55,
      badges: ["Science Expert"],
    },
    {
      id: "user6",
      name: "Jordan Lee",
      score: 750,
      gamesPlayed: 7,
      winRate: 42,
      badges: ["Music Maestro"],
    },
    {
      id: "user7",
      name: "Casey Miller",
      score: 720,
      gamesPlayed: 6,
      winRate: 33,
      badges: [],
    },
    {
      id: "user8",
      name: "Riley Garcia",
      score: 690,
      gamesPlayed: 5,
      winRate: 40,
      badges: ["Bible Scholar"],
    },
    {
      id: "user9",
      name: "Morgan Davis",
      score: 650,
      gamesPlayed: 4,
      winRate: 25,
      badges: [],
    },
    {
      id: "user10",
      name: "Jamie Rodriguez",
      score: 600,
      gamesPlayed: 3,
      winRate: 33,
      badges: [],
    },
  ];

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-background to-muted-foreground">
      <div className="container mx-auto max-w-4xl">
        <Header />
        <h1 className="text-3xl font-bold mb-6 text-center">Leaderboard</h1>

        <div className="mb-6">
          <BAckArrow lien="/" />
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Global Rankings</CardTitle>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="general-knowledge">
                      General Knowledge
                    </SelectItem>
                    <SelectItem value="countries">Countries</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="movies">Movies</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="bible">Bible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>
                See who&apos;s leading the pack in quiz mastery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="score">
                <TabsList className="mb-4">
                  <TabsTrigger value="score">Total Score</TabsTrigger>
                  <TabsTrigger value="games">Games Played</TabsTrigger>
                  <TabsTrigger value="winrate">Win Rate</TabsTrigger>
                </TabsList>

                <TabsContent value="score" className="space-y-0">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
                      <div className="col-span-1 text-center">#</div>
                      <div className="col-span-7">Player</div>
                      <div className="col-span-2 text-right">Score</div>
                      <div className="col-span-2 text-right">Badges</div>
                    </div>

                    {leaderboardData.map((player, index) => (
                      <div
                        key={player.id}
                        className={`grid grid-cols-12 gap-2 p-4 items-center ${
                          index < leaderboardData.length - 1 ? "border-b" : ""
                        } ${index === 0 ? "bg-primary/5" : ""}`}
                      >
                        <div className="col-span-1 text-center font-bold">
                          {index === 0 ? (
                            <span className="inline-block w-6 h-6 rounded-full bg-primary text-primary-foreground text-center">
                              1
                            </span>
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div className="col-span-7 flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>
                              {player.name
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("") || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <span>{player.name}</span>
                        </div>
                        <div className="col-span-2 text-right font-bold">
                          {player.score}
                        </div>
                        <div className="col-span-2 text-right">
                          {player.badges.length > 0 ? (
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs">
                              {player.badges.length}
                            </span>
                          ) : (
                            "-"
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="games">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
                      <div className="col-span-1 text-center">#</div>
                      <div className="col-span-7">Player</div>
                      <div className="col-span-4 text-right">Games Played</div>
                    </div>

                    {[...leaderboardData]
                      .sort((a, b) => b.gamesPlayed - a.gamesPlayed)
                      .map((player, index) => (
                        <div
                          key={player.id}
                          className={`grid grid-cols-12 gap-2 p-4 items-center ${
                            index < leaderboardData.length - 1 ? "border-b" : ""
                          } ${index === 0 ? "bg-primary/5" : ""}`}
                        >
                          <div className="col-span-1 text-center font-bold">
                            {index === 0 ? (
                              <span className="inline-block w-6 h-6 rounded-full bg-primary text-primary-foreground text-center">
                                1
                              </span>
                            ) : (
                              index + 1
                            )}
                          </div>
                          <div className="col-span-7 flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback>
                                {player.name
                                  ?.split(" ")
                                  .map((n) => n[0])
                                  .join("") || "U"}
                              </AvatarFallback>
                            </Avatar>
                            <span>{player.name}</span>
                          </div>
                          <div className="col-span-4 text-right font-bold">
                            {player.gamesPlayed}
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="winrate">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
                      <div className="col-span-1 text-center">#</div>
                      <div className="col-span-7">Player</div>
                      <div className="col-span-4 text-right">Win Rate</div>
                    </div>

                    {[...leaderboardData]
                      .sort((a, b) => b.winRate - a.winRate)
                      .map((player, index) => (
                        <div
                          key={player.id}
                          className={`grid grid-cols-12 gap-2 p-4 items-center ${
                            index < leaderboardData.length - 1 ? "border-b" : ""
                          } ${index === 0 ? "bg-primary/5" : ""}`}
                        >
                          <div className="col-span-1 text-center font-bold">
                            {index === 0 ? (
                              <span className="inline-block w-6 h-6 rounded-full bg-primary text-primary-foreground text-center">
                                1
                              </span>
                            ) : (
                              index + 1
                            )}
                          </div>
                          <div className="col-span-7 flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback>
                                {player.name
                                  ?.split(" ")
                                  .map((n) => n[0])
                                  .join("") || "U"}
                              </AvatarFallback>
                            </Avatar>
                            <span>{player.name}</span>
                          </div>
                          <div className="col-span-4 text-right font-bold">
                            {player.winRate}%
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
}
