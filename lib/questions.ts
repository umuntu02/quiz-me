export type Question = {
  id: string
  text: {
    en: string
    fr: string
  }
  options: {
    en: string[]
    fr: string[]
  }
  correctAnswer: number
  category: string
  difficulty: "easy" | "medium" | "hard"
}

export const questions: Question[] = [
  {
    id: "q1",
    text: {
      en: "What is the capital of France?",
      fr: "Quelle est la capitale de la France ?",
    },
    options: {
      en: ["London", "Berlin", "Paris", "Madrid"],
      fr: ["Londres", "Berlin", "Paris", "Madrid"],
    },
    correctAnswer: 2, // Paris
    category: "countries",
    difficulty: "easy",
  },
  {
    id: "q2",
    text: {
      en: "Who painted the Mona Lisa?",
      fr: "Qui a peint la Joconde ?",
    },
    options: {
      en: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
      fr: ["Vincent van Gogh", "Léonard de Vinci", "Pablo Picasso", "Claude Monet"],
    },
    correctAnswer: 1, // Leonardo da Vinci
    category: "general-knowledge",
    difficulty: "easy",
  },
  {
    id: "q3",
    text: {
      en: "Which planet is known as the Red Planet?",
      fr: "Quelle planète est connue comme la Planète Rouge ?",
    },
    options: {
      en: ["Venus", "Mars", "Jupiter", "Saturn"],
      fr: ["Vénus", "Mars", "Jupiter", "Saturne"],
    },
    correctAnswer: 1, // Mars
    category: "science",
    difficulty: "easy",
  },
  {
    id: "q4",
    text: {
      en: "Who wrote 'Romeo and Juliet'?",
      fr: "Qui a écrit 'Roméo et Juliette' ?",
    },
    options: {
      en: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
      fr: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    },
    correctAnswer: 1, // William Shakespeare
    category: "general-knowledge",
    difficulty: "easy",
  },
  {
    id: "q5",
    text: {
      en: "What is the largest ocean on Earth?",
      fr: "Quel est le plus grand océan sur Terre ?",
    },
    options: {
      en: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      fr: ["Océan Atlantique", "Océan Indien", "Océan Arctique", "Océan Pacifique"],
    },
    correctAnswer: 3, // Pacific Ocean
    category: "general-knowledge",
    difficulty: "easy",
  },
  {
    id: "q6",
    text: {
      en: "Which band performed the song 'Bohemian Rhapsody'?",
      fr: "Quel groupe a interprété la chanson 'Bohemian Rhapsody' ?",
    },
    options: {
      en: ["The Beatles", "Queen", "Led Zeppelin", "Pink Floyd"],
      fr: ["The Beatles", "Queen", "Led Zeppelin", "Pink Floyd"],
    },
    correctAnswer: 1, // Queen
    category: "music",
    difficulty: "easy",
  },
  {
    id: "q7",
    text: {
      en: "In which year did World War II end?",
      fr: "En quelle année la Seconde Guerre mondiale s'est-elle terminée ?",
    },
    options: {
      en: ["1943", "1945", "1947", "1950"],
      fr: ["1943", "1945", "1947", "1950"],
    },
    correctAnswer: 1, // 1945
    category: "general-knowledge",
    difficulty: "medium",
  },
  {
    id: "q8",
    text: {
      en: "What is the chemical symbol for gold?",
      fr: "Quel est le symbole chimique de l'or ?",
    },
    options: {
      en: ["Au", "Ag", "Fe", "Gd"],
      fr: ["Au", "Ag", "Fe", "Gd"],
    },
    correctAnswer: 0, // Au
    category: "science",
    difficulty: "medium",
  },
  {
    id: "q9",
    text: {
      en: "Which of these is NOT a book in the Bible?",
      fr: "Lequel de ces livres n'est PAS dans la Bible ?",
    },
    options: {
      en: ["Exodus", "Chronicles", "Hezekiah", "Psalms"],
      fr: ["Exode", "Chroniques", "Ézéchias", "Psaumes"],
    },
    correctAnswer: 2, // Hezekiah
    category: "bible",
    difficulty: "medium",
  },
  {
    id: "q10",
    text: {
      en: "What is the capital of Japan?",
      fr: "Quelle est la capitale du Japon ?",
    },
    options: {
      en: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
      fr: ["Pékin", "Séoul", "Tokyo", "Bangkok"],
    },
    correctAnswer: 2, // Tokyo
    category: "countries",
    difficulty: "easy",
  },
]

export function getQuestionsByCategory(category: string): Question[] {
  return questions.filter((q) => q.category.toLowerCase() === category.toLowerCase())
}

export function getRandomQuestions(count = 10): Question[] {
  const shuffled = [...questions].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export function getQuestionsByDifficulty(difficulty: "easy" | "medium" | "hard"): Question[] {
  return questions.filter((q) => q.difficulty === difficulty)
}

