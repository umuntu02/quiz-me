import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";
import { UserNav } from "./user-nav";

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
          QuizMe
        </h1>
        <LanguageToggle />
        <ThemeToggle />
      </div>
      <UserNav />
    </header>
  );
};

export default Header;
