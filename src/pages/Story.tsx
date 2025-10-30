import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";
import magicForestBg from "@/assets/magic-forest-bg.png";

type StoryStep = {
  text: string;
  choices: { text: string; next: number }[];
};

const storySteps: StoryStep[] = [
  {
    text: "Welcome to the Magic Forest! You meet a friendly creature named Sparkle. Sparkle needs help finding the lost rainbow gems. What do you want to do?",
    choices: [
      { text: "Help Sparkle find the gems", next: 1 },
      { text: "Ask Sparkle about the forest", next: 2 },
    ],
  },
  {
    text: "Great choice! Sparkle shows you three paths. One path has numbers, one has colors, and one has shapes. Which path do you choose?",
    choices: [
      { text: "The number path (Count from 1 to 5!)", next: 3 },
      { text: "The color path (Name the rainbow colors!)", next: 4 },
      { text: "The shape path (Find all the circles!)", next: 5 },
    ],
  },
  {
    text: "Sparkle tells you about the magical forest. Long ago, rainbow gems brought light to the forest. But they scattered and need to be found! Will you help?",
    choices: [
      { text: "Yes, let's find them!", next: 1 },
      { text: "Learn more about the gems", next: 6 },
    ],
  },
  {
    text: "Amazing counting! You counted 1, 2, 3, 4, 5 gems along the path! You found the first rainbow gem! 🎉",
    choices: [
      { text: "Continue the adventure", next: 7 },
      { text: "Start a new story", next: 0 },
    ],
  },
  {
    text: "Beautiful! You named all the colors: Red, Orange, Yellow, Green, Blue, Purple! You found the color gem! 🌈",
    choices: [
      { text: "Continue the adventure", next: 7 },
      { text: "Start a new story", next: 0 },
    ],
  },
  {
    text: "Perfect! You found all the circles hidden in the forest! You found the shape gem! ⭕",
    choices: [
      { text: "Continue the adventure", next: 7 },
      { text: "Start a new story", next: 0 },
    ],
  },
  {
    text: "Each rainbow gem has special powers: counting power, color power, and shape power. Together they make the forest magical!",
    choices: [
      { text: "Let's find them!", next: 1 },
      { text: "Start a new story", next: 0 },
    ],
  },
  {
    text: "Congratulations! With your help, Sparkle has found all the rainbow gems! The forest is bright and magical again! You earned a Star Badge! ⭐",
    choices: [
      { text: "Start a new adventure", next: 0 },
      { text: "See my rewards", next: -1 },
    ],
  },
];

const Story = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleChoice = (nextStep: number) => {
    if (nextStep === -1) {
      window.location.href = "/rewards";
    } else {
      setCurrentStep(nextStep);
    }
  };

  const story = storySteps[currentStep];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-float">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-magic bg-clip-text text-transparent flex items-center justify-center gap-3">
              <Sparkles className="w-12 h-12 text-primary" />
              Interactive Story
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose your own adventure!
            </p>
          </div>

          <Card className="shadow-playful border-4 border-primary/20 overflow-hidden">
            <div 
              className="h-64 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${magicForestBg})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            </div>
            
            <CardContent className="p-8">
              <div className="mb-8 p-6 bg-accent/10 rounded-2xl border-2 border-accent/20">
                <p className="text-2xl leading-relaxed text-foreground">
                  {story.text}
                </p>
              </div>

              <div className="space-y-4">
                {story.choices.map((choice, index) => (
                  <Button
                    key={index}
                    onClick={() => handleChoice(choice.next)}
                    variant="magic"
                    size="lg"
                    className="w-full justify-between text-left"
                  >
                    <span>{choice.text}</span>
                    <ArrowRight className="w-6 h-6" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Story;
