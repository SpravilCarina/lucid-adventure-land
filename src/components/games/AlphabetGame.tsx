import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface AlphabetGameProps {
  onBack: () => void;
}

const AlphabetGame = ({ onBack }: AlphabetGameProps) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [currentLetter, setCurrentLetter] = useState(alphabet[0]);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState<string[]>([]);

  const generateOptions = (correctLetter: string) => {
    const opts = [correctLetter];
    while (opts.length < 4) {
      const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
      if (!opts.includes(randomLetter)) {
        opts.push(randomLetter);
      }
    }
    return opts.sort(() => Math.random() - 0.5);
  };

  useState(() => {
    setOptions(generateOptions(currentLetter));
  });

  const handleLetterClick = (letter: string) => {
    if (letter === currentLetter) {
      setScore(prev => prev + 10);
      toast.success("Perfect! 📚", {
        description: `That's the letter ${letter}!`,
      });
      const nextLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
      setCurrentLetter(nextLetter);
      setOptions(generateOptions(nextLetter));
    } else {
      toast.error("Try again!", {
        description: `That's ${letter}. Look for ${currentLetter}!`,
      });
    }
  };

  const resetGame = () => {
    const firstLetter = alphabet[0];
    setCurrentLetter(firstLetter);
    setScore(0);
    setOptions(generateOptions(firstLetter));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Games
        </Button>
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-primary">Score: {score}</div>
          <Button onClick={resetGame} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      <Card className="shadow-playful border-4 border-primary/20">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Letter Recognition
          </h2>

          <div className="mb-8 text-center">
            <p className="text-2xl font-semibold mb-6 text-foreground">Find the letter:</p>
            <div className="text-9xl font-bold text-primary mb-8 animate-wiggle">
              {currentLetter}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
            {options.map((letter) => (
              <Button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                className="h-32 text-6xl font-bold"
                variant="outline"
              >
                {letter}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlphabetGame;
