"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Copy, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MultiplayerPage() {
  const [gameId, setGameId] = useState("");
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [isJoiningGame, setIsJoiningGame] = useState(false);
  const [gameLink, setGameLink] = useState("");
  interface Player {
    id: string;
    name: string;
    avatar: string | null;
  }

  const [players, setPlayers] = useState<Player[]>([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (isWaiting && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (isWaiting && countdown === 0) {
      // If we have at least 2 players, start the game
      if (players.length >= 2) {
        router.push(`/game/multiplayer/${gameId}/play`);
      } else {
        setIsWaiting(false);
        toast({
          title: "Not enough players",
          description:
            "At least 2 players are required to start a multiplayer game.",
        });
      }
    }
  }, [isWaiting, countdown, players.length, gameId, router, toast]);

  const createGame = () => {
    setIsCreatingGame(true);

    // In a real app, this would call an API to create a game
    setTimeout(() => {
      const newGameId = Math.random().toString(36).substring(2, 9);
      setGameId(newGameId);
      setGameLink(
        `${window.location.origin}/game/multiplayer/join/${newGameId}`
      );

      // Add current user as first player
      setPlayers([
        {
          id: user?.id || "",
          name: user?.name || "Unknown",
          avatar: user?.avatar || null,
        },
      ]);

      setIsWaiting(true);
      setIsCreatingGame(false);
    }, 1000);
  };

  const joinGame = () => {
    if (!gameId) {
      toast({
        title: "Game ID required",
        description: "Please enter a valid game ID to join.",
      });
      return;
    }

    setIsJoiningGame(true);

    // In a real app, this would call an API to join a game
    setTimeout(() => {
      // Simulate joining a game
      const mockPlayers: Player[] = [
        {
          id: "player1",
          name: "Player 1",
          avatar: null,
        },
        {
          id: user?.id || "",
          name: user?.name || "Unknown",
          avatar: user?.avatar || null,
        },
      ];

      setPlayers(mockPlayers);
      setIsWaiting(true);
      setIsJoiningGame(false);
    }, 1000);
  };

  const copyGameLink = () => {
    navigator.clipboard.writeText(gameLink);
    toast({
      title: "Link copied!",
      description: "Share this link with your friends to invite them to play.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Multiplayer Game</CardTitle>
          <CardDescription>
            Play with up to 4 friends in real-time
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!isWaiting ? (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Create a new game</h3>
                <Button
                  onClick={createGame}
                  className="w-full"
                  disabled={isCreatingGame}
                >
                  {isCreatingGame ? "Creating game..." : "Create Game"}
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Join an existing game</h3>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter game ID"
                    value={gameId}
                    onChange={(e) => setGameId(e.target.value)}
                  />
                  <Button
                    onClick={joinGame}
                    disabled={isJoiningGame || !gameId}
                  >
                    {isJoiningGame ? "Joining..." : "Join"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Game Link</h3>
                  <Button size="sm" variant="ghost" onClick={copyGameLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm break-all">{gameLink}</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Players ({players.length}/4)</h3>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm">{players.length}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {players.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center p-2 bg-muted/50 rounded-lg"
                    >
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback>
                          {player.name
                            ?.split(" ")
                            .map((n: string) => n[0])
                            .join("") || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span>{player.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Waiting for players to join...
                </p>
                <p className="text-sm">
                  Game starts in <span className="font-bold">{countdown}</span>{" "}
                  seconds
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  (or when 4 players have joined)
                </p>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
