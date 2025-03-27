"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { getRandomQuestions, type Question } from "@/lib/questions";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function SoloGamePage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameStatus, setGameStatus] = useState<
    "loading" | "playing" | "finished"
  >("loading");
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
    setGameStatus("playing");
  }, [isAuthenticated, router]);
  const finishGame = useCallback(() => {
    setGameStatus("finished");

    // In a real app, you would save the score to a database
    const gameResult = {
      userId: user?.id,
      score,
      date: new Date().toISOString(),
      mode: "solo",
    };

    console.log("Game result:", gameResult);
    // saveGameResult(gameResult)
  }, [user?.id, score]);

  const handleTimeUp = useCallback(() => {
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setTimeLeft(10);
      } else {
        finishGame();
      }
    }, 1000);
  }, [currentQuestionIndex, questions.length, finishGame]);

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

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections

    setSelectedAnswer(answerIndex);

    const isCorrect =
      answerIndex === questions[currentQuestionIndex].correctAnswer;

    if (isCorrect) {
      setScore(score + 10);
    } else {
    }
  };

  if (gameStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading quiz...</p>
      </div>
    );
  }

  if (gameStatus === "finished") {
    return (
      <div className="flex-col p-4 bg-gradient-to-b from-background to-muted">
        <Header />
        <div className="h-screen flex items-center justify-centern bg-gradient-to-b from-background to-muted">
          <Card className="w-full max-w-md p-6 text-center">
            <h1 className="text-3xl font-bold mb-6">Quiz Completed!</h1>
            <div className="text-5xl font-bold mb-8 text-primary">
              {score} / 100
            </div>

            <p className="mb-6 text-lg">
              You answered {score / 10} out of 10 questions correctly!
            </p>

            <div className="flex flex-col gap-4">
              <Button onClick={() => router.push("/")}>Back to Home</Button>
              <Button variant="outline" onClick={() => router.back()}>
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
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col p-4 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto max-w-3xl flex-1 flex flex-col">
        <div className="mb-6">
          <div className="flex grid-cols-3 justify-between items-center mb-3">
            <div className="font-bold w-14 text-center">
              {currentQuestionIndex + 1}/{questions.length}
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center sm:text-2xl font-bold ${
                    timeLeft <= 3
                      ? "text-red-500 bg-muted"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {timeLeft}
                </div>
              </div>
            </div>
            <div className="font-bold">Score: {score}</div>
          </div>
          <Progress
            value={(currentQuestionIndex / questions.length) * 100}
            className="h-2"
          />
        </div>

        <Card className="flex-1 p-4 flex flex-col gap-2 sm:gap-4">
          <h2 className="text-xl font-bold mb-5 text-center">
            {
              currentQuestion.text[
                language as keyof typeof currentQuestion.text
              ]
            }
          </h2>

          <div className="grid gap-2 sm:gap-4 flex-1">
            {currentQuestion.options[
              language as keyof typeof currentQuestion.options
            ].map((option, index) => (
              <button
                key={index}
                className={`px-4 py-1 rounded-lg border text-left transition-all ${
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
