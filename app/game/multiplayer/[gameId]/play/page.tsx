"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { getRandomQuestions, type Question } from "@/lib/questions";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

// Removed unused useGameId function

export default function MultiplayerGamePage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameStatus, setGameStatus] = useState<
    "loading" | "playing" | "finished"
  >("loading");
  interface Player {
    id: string;
    name: string;
    avatar: string | null;
    score: number;
    answers: {
      questionIndex: number;
      answer: number | null;
      correct: boolean;
    }[];
  }

  const [players, setPlayers] = useState<Player[]>([]);
  const { isAuthenticated, user } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();

  // Initialize game
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const quizQuestions = getRandomQuestions(10);
    setQuestions(quizQuestions);

    // Mock players for demo
    const mockPlayers = [
      {
        id: user?.id || "unknown",
        name: user?.name || "Unknown Player",
        avatar: user?.avatar || null,
        score: 0,
        answers: [],
      },
      {
        id: "player2",
        name: "Player 2",
        avatar: null,
        score: 0,
        answers: [],
      },
      {
        id: "player3",
        name: "Player 3",
        avatar: null,
        score: 0,
        answers: [],
      },
    ];

    setPlayers(mockPlayers);
    setGameStatus("playing");
  }, [isAuthenticated, router, user]);
  const finishGame = useCallback(
    (finalPlayers: Player[]) => {
      setGameStatus("finished");

      const sorted = [...finalPlayers].sort((a, b) => b.score - a.score);
      setPlayers(sorted);

      console.log("Game results:", {
        players: sorted,
        questions,
        date: new Date().toISOString(),
      });
    },
    [questions]
  );

  const handleTimeUp = useCallback(() => {
    if (selectedAnswer === null) {
      setPlayers((prev) => {
        const updated = prev.map((p) =>
          p.id === user?.id
            ? {
                ...p,
                answers: [
                  ...p.answers,
                  {
                    questionIndex: currentQuestionIndex,
                    answer: null,
                    correct: false,
                  },
                ],
              }
            : p
        );

        // Fin du jeu si dernière question
        if (currentQuestionIndex >= questions.length - 1) {
          setTimeout(() => finishGame(updated), 1000);
        }

        return updated;
      });
    } else {
      if (currentQuestionIndex >= questions.length - 1) {
        setTimeout(() => finishGame(players), 1000);
      } else {
        setTimeout(() => {
          setCurrentQuestionIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setTimeLeft(10);
        }, 1000);
      }
    }
  }, [
    currentQuestionIndex,
    questions.length,
    selectedAnswer,
    setPlayers,
    players,
    user?.id,
    finishGame,
  ]);

  // Timer effect
  useEffect(() => {
    if (gameStatus !== "playing") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStatus, handleTimeUp]);

  // Simulate other players answering
  useEffect(() => {
    if (gameStatus !== "playing") return;

    // Simulate other players answering after random delays
    const playerTimers = players
      .filter((p) => p.id !== user?.id)
      .map((player) => {
        const delay = Math.floor(Math.random() * 8000) + 1000; // Random delay between 1-9 seconds

        return setTimeout(() => {
          const randomAnswer = Math.floor(Math.random() * 4);
          const isCorrect =
            randomAnswer === questions[currentQuestionIndex]?.correctAnswer;

          setPlayers((prev) =>
            prev.map((p) =>
              p.id === player.id
                ? {
                    ...p,
                    score: isCorrect ? p.score + 10 : p.score,
                    answers: [
                      ...p.answers,
                      {
                        questionIndex: currentQuestionIndex,
                        answer: randomAnswer,
                        correct: isCorrect,
                      },
                    ],
                  }
                : p
            )
          );
        }, delay);
      });

    return () => {
      playerTimers.forEach((timer) => clearTimeout(timer));
    };
  }, [currentQuestionIndex, gameStatus, players, questions, user?.id]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections

    setSelectedAnswer(answerIndex);

    const isCorrect =
      answerIndex === questions[currentQuestionIndex]?.correctAnswer;

    // Update player score
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === user?.id
          ? {
              ...p,
              score: isCorrect ? p.score + 10 : p.score,
              answers: [
                ...p.answers,
                {
                  questionIndex: currentQuestionIndex,
                  answer: answerIndex,
                  correct: isCorrect,
                },
              ],
            }
          : p
      )
    );
  };

  if (gameStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading multiplayer game...</p>
      </div>
    );
  }

  if (gameStatus === "finished") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted">
        <Card className="w-full max-w-md p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Game Results</h1>

          <div className="flex justify-center mb-8">
            <div className="flex items-end gap-4">
              {/* Second place */}
              {players[1] && (
                <div className="flex flex-col items-center">
                  <Avatar className="h-16 w-16 mb-2">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {players[1].name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("") || "2"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="h-20 w-16 bg-secondary rounded-t-lg flex items-center justify-center">
                    <span className="font-bold">2</span>
                  </div>
                  <p className="mt-2 text-sm font-medium">{players[1].name}</p>
                  <p className="text-sm text-muted-foreground">
                    {players[1].score} pts
                  </p>
                </div>
              )}

              {/* First place */}
              <div className="flex flex-col items-center">
                <Avatar className="h-20 w-20 mb-2">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {players[0].name
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("") || "1"}
                  </AvatarFallback>
                </Avatar>
                <div className="h-28 w-20 bg-primary rounded-t-lg flex items-center justify-center">
                  <span className="font-bold text-primary-foreground">1</span>
                </div>
                <p className="mt-2 text-sm font-medium">{players[0].name}</p>
                <p className="text-sm text-muted-foreground">
                  {players[0].score} pts
                </p>
              </div>

              {/* Third place */}
              {players[2] && (
                <div className="flex flex-col items-center">
                  <Avatar className="h-14 w-14 mb-2">
                    <AvatarFallback className="bg-muted text-muted-foreground">
                      {players[2].name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("") || "3"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="h-16 w-14 bg-muted rounded-t-lg flex items-center justify-center">
                    <span className="font-bold">3</span>
                  </div>
                  <p className="mt-2 text-sm font-medium">{players[2].name}</p>
                  <p className="text-sm text-muted-foreground">
                    {players[2].score} pts
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <Button onClick={() => router.push("/")}>Back to Home</Button>
            <Button
              variant="outline"
              onClick={() => router.push("/game/multiplayer")}
            >
              Play Again
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push("/leaderboard")}
            >
              View Leaderboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentUserPlayer = players.find((p) => p.id === user?.id);

  return (
    <div className="min-h-screen flex flex-col p-4 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto max-w-3xl flex-1 flex flex-col">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className="font-bold">
              Your Score: {currentUserPlayer?.score || 0}
            </div>
          </div>
          <Progress
            value={(currentQuestionIndex / questions.length) * 100}
            className="h-2"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {players.map((player) => (
            <div
              key={player.id}
              className={`flex items-center p-2 rounded-lg ${
                player.id === user?.id ? "bg-primary/10" : "bg-muted"
              }`}
            >
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback>
                  {player.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("") || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <div className="truncate text-sm">{player.name}</div>
                <div className="text-xs">{player.score} pts</div>
              </div>
            </div>
          ))}
        </div>

        <Card className="flex-1 p-6 flex flex-col">
          <div className="text-center mb-8">
            <div className="text-sm text-muted-foreground mb-2">Time left</div>
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold">
                {timeLeft}
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-8 text-center">
            {
              currentQuestion?.text[
                language as keyof typeof currentQuestion.text
              ]
            }
          </h2>

          <div className="grid gap-4 flex-1">
            {currentQuestion?.options[
              language as keyof typeof currentQuestion.options
            ].map((option, index) => (
              <button
                key={index}
                className={`p-4 rounded-lg border text-left transition-all ${
                  selectedAnswer === index
                    ? index === currentQuestion.correctAnswer
                      ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500"
                      : "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500"
                    : "hover:bg-muted"
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
