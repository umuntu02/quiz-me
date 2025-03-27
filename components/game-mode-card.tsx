"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Users, Zap } from "lucide-react";
import Link from "next/link";

interface GameModeCardProps {
  title: string;
  description: string;
  icon: "User" | "Users" | "Zap";
  href: string;
}

export function GameModeCard({
  title,
  description,
  icon,
  href,
}: GameModeCardProps) {
  const Icon = icon === "User" ? User : icon === "Users" ? Users : Zap;

  return (
    <Card className="gap-2 py-3 sm:gap-6 sm:py-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Icon className="h-6 w-6 text-purple-500" />
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">10 questions - 10 sec per question</p>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          className="w-full bg-gradient-to-br from-primary to-purple-500"
        >
          <Link href={href}>Play Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
