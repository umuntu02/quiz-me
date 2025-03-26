"use client";

import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return <Switch onClick={handleToggle} />;
}
