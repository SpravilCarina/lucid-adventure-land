import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight, TreePine, Rocket, Fish, Castle, ArrowLeft } from "lucide-react";
import magicForestBg from "@/assets/magic-forest-bg.png";

type StoryStep = {
  text: string;
  choices: { text: string; next: number }[];
};

type StoryAdventure = {
  id: string;
  title: string;
  description: string;
  icon: any;
  bgColor: string;
  steps: StoryStep[];
};

const magicForestSteps: StoryStep[] = [
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

const spaceSteps: StoryStep[] = [
  {
    text: "Welcome to Space Station Alpha! You're an astronaut on a mission to explore the galaxy. Commander Luna needs your help. What do you want to do?",
    choices: [
      { text: "Explore a nearby planet", next: 1 },
      { text: "Check the control panel", next: 2 },
    ],
  },
  {
    text: "You see three planets through your telescope! One is red (Mars), one has rings (Saturn), and one is blue (Neptune). Which planet should we visit?",
    choices: [
      { text: "Visit the red planet Mars", next: 3 },
      { text: "Explore Saturn's rings", next: 4 },
      { text: "Discover blue Neptune", next: 5 },
    ],
  },
  {
    text: "Commander Luna shows you the mission stats: 5 planets visited, 10 stars discovered, and 3 galaxies mapped! Ready for your mission?",
    choices: [
      { text: "Yes, let's go to space!", next: 1 },
      { text: "Tell me about the spaceship", next: 6 },
    ],
  },
  {
    text: "Amazing! On Mars you found 5 red rocks! You counted them: 1, 2, 3, 4, 5! You earned a Space Explorer badge! 🚀",
    choices: [
      { text: "Continue exploring", next: 7 },
      { text: "Choose new adventure", next: -2 },
    ],
  },
  {
    text: "Wow! You counted all of Saturn's beautiful rings! There are so many colors: yellow, orange, and brown! You earned a Ring Master badge! 🪐",
    choices: [
      { text: "Continue exploring", next: 7 },
      { text: "Choose new adventure", next: -2 },
    ],
  },
  {
    text: "Incredible! Neptune is blue like the ocean! You saw blue clouds and blue storms. You earned an Ocean Planet badge! 🌊",
    choices: [
      { text: "Continue exploring", next: 7 },
      { text: "Choose new adventure", next: -2 },
    ],
  },
  {
    text: "Your spaceship has special powers! It can travel at light speed, has a robot helper named Beep, and a telescope to see far away stars!",
    choices: [
      { text: "Let's explore space!", next: 1 },
      { text: "Choose new adventure", next: -2 },
    ],
  },
  {
    text: "Mission complete! You're a Space Hero! You explored planets, counted stars, and learned about space! Commander Luna is so proud! ⭐🚀",
    choices: [
      { text: "Choose new adventure", next: -2 },
      { text: "See my rewards", next: -1 },
    ],
  },
];

const oceanSteps: StoryStep[] = [
  {
    text: "Dive into the Deep Blue Sea! You're a marine explorer with your submarine. Captain Coral needs help finding sea treasures. Ready to explore?",
    choices: [
      { text: "Search for treasure", next: 1 },
      { text: "Learn about the ocean", next: 2 },
    ],
  },
  {
    text: "You see three paths underwater! One has colorful fish, one has coral reefs, and one has a mysterious cave. Which way?",
    choices: [
      { text: "Follow the colorful fish", next: 3 },
      { text: "Explore the coral reef", next: 4 },
      { text: "Enter the mysterious cave", next: 5 },
    ],
  },
  {
    text: "Captain Coral tells you about the ocean: it has dolphins, whales, colorful fish, and hidden treasures! The coral reef is magical! Will you help?",
    choices: [
      { text: "Yes, let's explore!", next: 1 },
      { text: "Tell me about submarines", next: 6 },
    ],
  },
  {
    text: "Beautiful! You counted 5 rainbow fish: 1 red, 2 orange, 3 yellow, 4 green, 5 blue! You earned a Rainbow Fish badge! 🐠",
    choices: [
      { text: "Continue diving", next: 7 },
      { text: "Choose new adventure", next: -2 },
    ],
  },
  {
    text: "Amazing! You found coral in every color: red, orange, yellow, green, blue, and purple! The reef is a rainbow! You earned a Coral Explorer badge! 🪸",
    choices: [
      { text: "Continue diving", next: 7 },
      { text: "Choose new adventure", next: -2 },
    ],
  },
  {
    text: "Wow! Inside the cave you found 3 treasure chests! Each one had pearls, shells, and starfish! You earned a Treasure Hunter badge! 💎",
    choices: [
      { text: "Continue diving", next: 7 },
      { text: "Choose new adventure", next: -2 },
    ],
  },
  {
    text: "Your submarine is special! It has windows to see fish, lights for dark water, and can dive very deep! Captain Coral keeps you safe!",
    choices: [
      { text: "Let's dive deeper!", next: 1 },
      { text: "Choose new adventure", next: -2 },
    ],
  },
  {
    text: "Mission accomplished! You're an Ocean Hero! You explored underwater, counted sea creatures, and discovered treasures! Captain Coral is amazed! 🌊⭐",
    choices: [
      { text: "Choose new adventure", next: -2 },
      { text: "See my rewards", next: -1 },
    ],
  },
];

const castleSteps: StoryStep[] = [
  {
    text: "Welcome to the Enchanted Castle! You're a brave hero visiting Princess Harmony's magical kingdom. There's a friendly dragon who needs help! What will you do?",
    choices: [
      { text: "Help the dragon", next: 1 },
      { text: "Explore the castle", next: 2 },
    ],
  },
  {
    text: "The dragon, named Sparkles, lost his magical gems! There are three towers: one with stars, one with hearts, and one with rainbows. Which tower should we search?",
    choices: [
      { text: "Search the Star Tower", next: 3 },
      { text: "Check the Heart Tower", next: 4 },
      { text: "Visit the Rainbow Tower", next: 5 },
    ],
  },
  {
    text: "Princess Harmony shows you the castle: 5 tall towers, 10 beautiful rooms, and 3 magical gardens! The castle is amazing! Ready to explore?",
    choices: [
      { text: "Yes, let's help Sparkles!", next: 1 },
      { text: "Tell me about the dragon", next: 6 },
    ],
  },
  {
    text: "Perfect! You counted 5 shining stars in the tower! 1, 2, 3, 4, 5 stars light up! You found the first gem! You earned a Star Finder badge! ⭐",
    choices: [
      { text: "Continue the quest", next: 7 },
      { text: "Choose new adventure", next: -2 },
    ],
  },
  {
    text: "Wonderful! The Heart Tower had hearts in all colors: red, pink, purple, and gold! You found the second gem! You earned a Heart Hero badge! 💖",
    choices: [
      { text: "Continue the quest", next: 7 },
      { text: "Choose new adventure", next: -2 },
    ],
  },
  {
    text: "Amazing! The Rainbow Tower showed you all the colors: red, orange, yellow, green, blue, and purple! You found the last gem! You earned a Rainbow Knight badge! 🌈",
    choices: [
      { text: "Continue the quest", next: 7 },
      { text: "Choose new adventure", next: -2 },
    ],
  },
  {
    text: "Sparkles is a friendly dragon! He's purple with golden wings, loves to play, and breathes colorful sparkles instead of fire! He's Princess Harmony's best friend!",
    choices: [
      { text: "Let's help Sparkles!", next: 1 },
      { text: "Choose new adventure", next: -2 },
    ],
  },
  {
    text: "Quest complete! You're a Castle Hero! Sparkles has all his gems and can sparkle again! Princess Harmony knights you as the Kingdom's bravest helper! 🏰⭐",
    choices: [
      { text: "Choose new adventure", next: -2 },
      { text: "See my rewards", next: -1 },
    ],
  },
];

const storyAdventures: StoryAdventure[] = [
  {
    id: "forest",
    title: "Magic Forest",
    description: "Help Sparkle find the lost rainbow gems!",
    icon: TreePine,
    bgColor: "from-green-500/20 to-emerald-500/20",
    steps: magicForestSteps,
  },
  {
    id: "space",
    title: "Space Explorer",
    description: "Travel through space and discover planets!",
    icon: Rocket,
    bgColor: "from-blue-500/20 to-purple-500/20",
    steps: spaceSteps,
  },
  {
    id: "ocean",
    title: "Ocean Adventure",
    description: "Dive deep and find underwater treasures!",
    icon: Fish,
    bgColor: "from-cyan-500/20 to-blue-500/20",
    steps: oceanSteps,
  },
  {
    id: "castle",
    title: "Enchanted Castle",
    description: "Help the friendly dragon in a magical kingdom!",
    icon: Castle,
    bgColor: "from-pink-500/20 to-purple-500/20",
    steps: castleSteps,
  },
];

const Story = () => {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleChoice = (nextStep: number) => {
    if (nextStep === -1) {
      window.location.href = "/rewards";
    } else if (nextStep === -2) {
      setSelectedStory(null);
      setCurrentStep(0);
    } else {
      setCurrentStep(nextStep);
    }
  };

  const handleStorySelect = (storyId: string) => {
    setSelectedStory(storyId);
    setCurrentStep(0);
  };

  const currentAdventure = storyAdventures.find(s => s.id === selectedStory);
  const story = currentAdventure?.steps[currentStep];

  if (!selectedStory) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-float">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-magic bg-clip-text text-transparent flex items-center justify-center gap-3">
                <Sparkles className="w-12 h-12 text-primary" />
                Interactive Stories
              </h1>
              <p className="text-xl text-muted-foreground">
                Choose your own adventure!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {storyAdventures.map((adventure) => {
                const Icon = adventure.icon;
                return (
                  <Card
                    key={adventure.id}
                    className="shadow-playful border-4 border-primary/20 hover:border-primary/40 transition-all cursor-pointer group"
                    onClick={() => handleStorySelect(adventure.id)}
                  >
                    <CardContent className="p-8">
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${adventure.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-3xl font-bold mb-3 text-foreground">
                        {adventure.title}
                      </h3>
                      <p className="text-lg text-muted-foreground mb-6">
                        {adventure.description}
                      </p>
                      <Button variant="magic" size="lg" className="w-full">
                        Start Adventure
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-float">
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedStory(null);
                setCurrentStep(0);
              }}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Stories
            </Button>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-magic bg-clip-text text-transparent flex items-center justify-center gap-3">
              <Sparkles className="w-12 h-12 text-primary" />
              {currentAdventure?.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {currentAdventure?.description}
            </p>
          </div>

          <Card className="shadow-playful border-4 border-primary/20 overflow-hidden">
            <div 
              className={`h-64 bg-gradient-to-br ${currentAdventure?.bgColor} relative flex items-center justify-center`}
            >
              {currentAdventure && (
                <currentAdventure.icon className="w-32 h-32 text-primary/40" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            </div>
            
            <CardContent className="p-8">
              <div className="mb-8 p-6 bg-accent/10 rounded-2xl border-2 border-accent/20">
                <p className="text-2xl leading-relaxed text-foreground">
                  {story?.text}
                </p>
              </div>

              <div className="space-y-4">
                {story?.choices.map((choice, index) => (
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
