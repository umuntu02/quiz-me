"use client";

import Header from "@/components/Header";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import {
  Award,
  Clock,
  GamepadIcon as GameController,
  History,
  Medal,
  Share2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Mock user stats
  const userStats = {
    totalScore: 780,
    gamesPlayed: 23,
    winRate: 65,
    averageTime: 6.2,
    badges: [
      {
        id: "badge1",
        name: "Quiz Enthusiast",
        description: "Played 20+ games",
        icon: GameController,
      },
      {
        id: "badge2",
        name: "Speed Demon",
        description: "Average answer time under 7 seconds",
        icon: Clock,
      },
      {
        id: "badge3",
        name: "Science Whiz",
        description: "90%+ correct in Science category",
        icon: Award,
      },
    ],
    recentGames: [
      {
        id: "game1",
        date: "2023-06-10",
        mode: "Solo",
        category: "General Knowledge",
        score: 80,
        result: "win",
      },
      {
        id: "game2",
        date: "2023-06-08",
        mode: "Multiplayer",
        category: "Music",
        score: 70,
        result: "win",
      },
      {
        id: "game3",
        date: "2023-06-05",
        mode: "Solo",
        category: "Countries",
        score: 60,
        result: "loss",
      },
      {
        id: "game4",
        date: "2023-06-03",
        mode: "Multiplayer",
        category: "Movies",
        score: 90,
        result: "win",
      },
      {
        id: "game5",
        date: "2023-06-01",
        mode: "Solo",
        category: "Science",
        score: 50,
        result: "loss",
      },
    ],
    achievements: [
      {
        id: "ach1",
        name: "Perfect Score",
        description: "Get 100% on any quiz",
        completed: false,
        progress: 90,
      },
      {
        id: "ach2",
        name: "Quiz Master",
        description: "Win 10 multiplayer games",
        completed: false,
        progress: 40,
      },
      {
        id: "ach3",
        name: "Category Expert",
        description: "Complete all quizzes in a category",
        completed: true,
        progress: 100,
      },
      {
        id: "ach4",
        name: "Social Butterfly",
        description: "Play with 10 different players",
        completed: false,
        progress: 30,
      },
    ],
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-background to-muted-foreground">
      <div className="container mx-auto max-w-4xl">
        <Header />
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-xl">
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{user?.name}</CardTitle>
                    <CardDescription>{user?.username}</CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share Profile
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Score
                  </p>
                  <p className="text-2xl font-bold">{userStats.totalScore}</p>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    Games Played
                  </p>
                  <p className="text-2xl font-bold">{userStats.gamesPlayed}</p>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Win Rate</p>
                  <p className="text-2xl font-bold">{userStats.winRate}%</p>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    Avg. Time
                  </p>
                  <p className="text-2xl font-bold">{userStats.averageTime}s</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {userStats.badges.map((badge) => {
                  const BadgeIcon = badge.icon;
                  return (
                    <Badge
                      key={badge.id}
                      variant="secondary"
                      className="px-3 py-1 gap-1"
                    >
                      <BadgeIcon className="h-3 w-3" />
                      {badge.name}
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="history">
          <TabsList className="mb-4">
            <TabsTrigger value="history">Game History</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent Games
                </CardTitle>
                <CardDescription>
                  Your quiz history and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
                    <div className="col-span-3">Date</div>
                    <div className="col-span-2">Mode</div>
                    <div className="col-span-3">Category</div>
                    <div className="col-span-2 text-right">Score</div>
                    <div className="col-span-2 text-right">Result</div>
                  </div>

                  {userStats.recentGames.map((game, index) => (
                    <div
                      key={game.id}
                      className={`grid grid-cols-12 gap-2 p-4 items-center ${
                        index < userStats.recentGames.length - 1
                          ? "border-b"
                          : ""
                      }`}
                    >
                      <div className="col-span-3">{game.date}</div>
                      <div className="col-span-2">{game.mode}</div>
                      <div className="col-span-3">{game.category}</div>
                      <div className="col-span-2 text-right font-medium">
                        {game.score}
                      </div>
                      <div className="col-span-2 text-right">
                        <Badge
                          variant={
                            game.result === "win" ? "default" : "secondary"
                          }
                        >
                          {game.result === "win" ? "Win" : "Loss"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-center">
                  <Button variant="outline">View All History</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="h-5 w-5" />
                  Achievements
                </CardTitle>
                <CardDescription>
                  Track your progress and unlock rewards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userStats.achievements.map((achievement) => (
                    <div key={achievement.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{achievement.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                        {achievement.completed && <Badge>Completed</Badge>}
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">
                          Progress
                        </span>
                        <span className="text-xs font-medium">
                          {achievement.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Badges
                </CardTitle>
                <CardDescription>
                  Special recognitions for your achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userStats.badges.map((badge) => {
                    const BadgeIcon = badge.icon;
                    return (
                      <div
                        key={badge.id}
                        className="border rounded-lg p-4 flex items-center gap-4"
                      >
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <BadgeIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{badge.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {badge.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  {/* Locked badge example */}
                  <div className="border rounded-lg p-4 flex items-center gap-4 opacity-50">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <Medal className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Quiz Champion</h3>
                      <p className="text-sm text-muted-foreground">
                        Win 25 games in total
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <MobileBottomNav />
    </div>
  );
}
