import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface MemoryGameProps {
  onBack: () => void;
}

type MemoryCard = {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
};

const MemoryGame = ({ onBack }: MemoryGameProps) => {
  const emojis = ["🐶", "🐱", "🦊", "🐸", "🦋", "🌺"];
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);

  const initializeGame = () => {
    const gameEmojis = [...emojis, ...emojis];
    const shuffled = gameEmojis
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setScore(0);
    setMoves(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards[first];
      const secondCard = cards[second];

      if (firstCard.emoji === secondCard.emoji) {
        setCards(prev =>
          prev.map(card =>
            card.id === first || card.id === second
              ? { ...card, matched: true }
              : card
          )
        );
        setScore(prev => prev + 20);
        toast.success("Great match! 🎉");
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map(card =>
              card.id === first || card.id === second
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  const handleCardClick = (id: number) => {
    const card = cards[id];
    if (card.flipped || card.matched || flippedCards.length === 2) return;

    setCards(prev =>
      prev.map(c => (c.id === id ? { ...c, flipped: true } : c))
    );
    setFlippedCards(prev => [...prev, id]);
  };

  const allMatched = cards.every(c => c.matched);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Games
        </Button>
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold text-foreground">Moves: {moves}</div>
          <div className="text-2xl font-bold text-primary">Score: {score}</div>
          <Button onClick={initializeGame} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      <Card className="shadow-playful border-4 border-secondary/20">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-foreground">
            Memory Match Game
          </h2>
          <p className="text-xl text-center mb-8 text-muted-foreground">
            Find all the matching pairs!
          </p>

          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`
                  aspect-square rounded-2xl flex items-center justify-center text-6xl
                  transition-all hover:scale-105 active:scale-95 shadow-card
                  ${card.matched ? "bg-success/30" : "bg-primary"}
                  ${card.flipped || card.matched ? "" : "cursor-pointer"}
                `}
                disabled={card.matched}
              >
                {card.flipped || card.matched ? card.emoji : "?"}
              </button>
            ))}
          </div>

          {allMatched && (
            <div className="text-center p-6 bg-success/10 rounded-2xl border-2 border-success animate-bounce-gentle mt-8">
              <p className="text-3xl font-bold text-success mb-2">
                🎉 You Won! 🎉
              </p>
              <p className="text-xl text-foreground">
                Completed in {moves} moves!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MemoryGame;
