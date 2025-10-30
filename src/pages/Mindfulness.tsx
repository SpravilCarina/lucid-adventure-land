import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Play, Pause } from "lucide-react";

const Mindfulness = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isBreathing) return;

    const phases = ["inhale", "hold", "exhale"] as const;
    const durations = { inhale: 4000, hold: 2000, exhale: 4000 };
    
    const timer = setInterval(() => {
      setCount((prev) => {
        const currentPhase = phases[prev % 3];
        const nextIndex = (prev + 1) % 3;
        setBreathPhase(phases[nextIndex]);
        return prev + 1;
      });
    }, durations[breathPhase]);

    return () => clearInterval(timer);
  }, [isBreathing, breathPhase]);

  const emotions = [
    { emoji: "😊", label: "Happy", color: "bg-success" },
    { emoji: "😢", label: "Sad", color: "bg-primary" },
    { emoji: "😠", label: "Angry", color: "bg-destructive" },
    { emoji: "😰", label: "Worried", color: "bg-accent" },
    { emoji: "😴", label: "Sleepy", color: "bg-muted" },
    { emoji: "😎", label: "Calm", color: "bg-secondary" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-magic bg-clip-text text-transparent flex items-center justify-center gap-3">
              <Heart className="w-12 h-12 text-primary animate-pulse" />
              Calm Time
            </h1>
            <p className="text-xl text-muted-foreground">
              Take a moment to breathe and feel
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Breathing Exercise */}
            <Card className="shadow-playful border-4 border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center text-foreground">
                  Breathing Buddy
                </h2>
                
                <div className="flex flex-col items-center gap-6">
                  <div
                    className={`w-48 h-48 rounded-full bg-gradient-magic flex items-center justify-center text-6xl transition-all duration-1000 ${
                      isBreathing
                        ? breathPhase === "inhale"
                          ? "scale-125"
                          : breathPhase === "exhale"
                          ? "scale-75"
                          : "scale-100"
                        : "scale-100"
                    }`}
                  >
                    🫧
                  </div>

                  <div className="text-center">
                    <p className="text-3xl font-bold text-foreground mb-2">
                      {isBreathing
                        ? breathPhase === "inhale"
                          ? "Breathe In..."
                          : breathPhase === "hold"
                          ? "Hold..."
                          : "Breathe Out..."
                        : "Ready?"}
                    </p>
                    <p className="text-lg text-muted-foreground">
                      {isBreathing ? "Follow the bubble" : "Click start to begin"}
                    </p>
                  </div>

                  <Button
                    onClick={() => setIsBreathing(!isBreathing)}
                    variant={isBreathing ? "secondary" : "magic"}
                    size="lg"
                    className="gap-2"
                  >
                    {isBreathing ? (
                      <>
                        <Pause className="w-6 h-6" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-6 h-6" />
                        Start Breathing
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Emotion Wheel */}
            <Card className="shadow-playful border-4 border-secondary/20">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center text-foreground">
                  How Do You Feel?
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  {emotions.map((emotion) => (
                    <button
                      key={emotion.label}
                      className={`${emotion.color} p-6 rounded-2xl flex flex-col items-center gap-3 hover:scale-105 transition-all shadow-card hover:shadow-playful`}
                    >
                      <span className="text-6xl">{emotion.emoji}</span>
                      <span className="text-xl font-bold text-white">
                        {emotion.label}
                      </span>
                    </button>
                  ))}
                </div>
                
                <p className="mt-6 text-center text-lg text-muted-foreground">
                  It's okay to feel any way! Tap to share your feelings.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 shadow-playful border-4 border-accent/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Remember: You're Amazing! 🌟
              </h3>
              <p className="text-xl text-muted-foreground">
                Taking time to breathe and know your feelings makes you strong and smart!
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Mindfulness;
