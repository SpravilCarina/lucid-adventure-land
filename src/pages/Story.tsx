import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight, TreePine, Rocket, Fish, Castle, ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type StoryStep = {
  text: string;
  choices: { text: string; next: number }[];
  imagePrompt: string;
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
    text: "Welcome to the Magic Forest! You meet a friendly creature named Sparkle, a small purple unicorn with sparkling rainbow wings. The forest is filled with glowing mushrooms, singing flowers, and magical trees. Sparkle looks worried - the rainbow gems that keep the forest magical have been scattered! What do you want to do?",
    imagePrompt: "A magical forest with glowing mushrooms, colorful flowers, and a cute purple unicorn with rainbow wings looking friendly",
    choices: [
      { text: "Help Sparkle find the gems", next: 1 },
      { text: "Ask Sparkle about the forest", next: 2 },
      { text: "Explore the glowing mushrooms", next: 8 },
    ],
  },
  {
    text: "Great choice! Sparkle shows you three magical paths through the enchanted forest. The Number Path sparkles with counting stars, the Color Path glows with rainbow lights, and the Shape Path has floating geometric patterns. Each path leads to one of the lost rainbow gems. Which path calls to you?",
    imagePrompt: "Three magical forest paths with numbers, colors, and shapes floating above them",
    choices: [
      { text: "The number path (Count from 1 to 5!)", next: 3 },
      { text: "The color path (Name the rainbow colors!)", next: 4 },
      { text: "The shape path (Find all the circles!)", next: 5 },
    ],
  },
  {
    text: "Sparkle's eyes shine as she tells you the ancient story: 'Long ago, when the forest was young, five rainbow gems were placed here by the Forest Guardians. Each gem holds special magic - counting power, color power, shape power, pattern power, and wisdom power. When all five gems are together, the forest blooms with endless magic and joy. But a strong wind scattered them across the forest paths. Will you help me find them all?'",
    imagePrompt: "A wise purple unicorn telling a story with magical gem illustrations floating around",
    choices: [
      { text: "Yes, let's find them all!", next: 1 },
      { text: "Learn more about the gems", next: 6 },
    ],
  },
  {
    text: "Amazing counting! You walk down the Number Path and see glowing gems: ONE sparkling blue gem, TWO twinkling green gems, THREE shining yellow gems, FOUR radiant orange gems, and FIVE magnificent red gems! You counted them all perfectly: 1, 2, 3, 4, 5! The Counting Gem appears in a burst of light! Sparkle cheers with joy! 🎉✨",
    imagePrompt: "A child counting colorful glowing gems along a magical forest path, with sparkles everywhere",
    choices: [
      { text: "Continue the adventure", next: 7 },
      { text: "Try another path", next: 1 },
    ],
  },
  {
    text: "Beautiful! You walk down the Color Path and flowers bloom in sequence: RED roses, ORANGE lilies, YELLOW sunflowers, GREEN ferns, BLUE forget-me-nots, INDIGO morning glories, and VIOLET lavender! You named all the rainbow colors perfectly! The Color Gem materializes in a rainbow swirl! The forest seems brighter already! 🌈💫",
    imagePrompt: "A magical path covered in rainbow-colored flowers blooming in sequence",
    choices: [
      { text: "Continue the adventure", next: 7 },
      { text: "Try another path", next: 1 },
    ],
  },
  {
    text: "Perfect! You venture down the Shape Path and discover hidden circles everywhere: in tree trunks, in flower centers, in mushroom tops, in dewdrops, and even in the ripples of a magical pond! You found all five hidden circles! The Shape Gem appears with a gentle glow! Sparkle does a happy spin! ⭕✨",
    imagePrompt: "A forest path with magical circles hidden in trees, flowers, and pond ripples",
    choices: [
      { text: "Continue the adventure", next: 7 },
      { text: "Try another path", next: 1 },
    ],
  },
  {
    text: "Sparkle opens an ancient book made of leaves and shows you beautiful illustrations: The Counting Gem helps forest creatures learn numbers, the Color Gem paints the sunrise and sunset, the Shape Gem creates all the forms in nature, the Pattern Gem weaves the designs in butterfly wings, and the Wisdom Gem helps all creatures understand each other. When united, they create the Great Forest Magic!",
    imagePrompt: "An ancient magical book with glowing gem illustrations",
    choices: [
      { text: "Let's find them all!", next: 1 },
      { text: "Start a new adventure", next: -2 },
    ],
  },
  {
    text: "Wonderful work! Sparkle leads you to a secret clearing where butterflies dance and fireflies twinkle. 'We're getting closer to restoring the forest's magic! But there are still more gems to find. The Pattern Gem and the Wisdom Gem are hidden in special places. Are you ready for the next part of our quest?'",
    imagePrompt: "A magical forest clearing with butterflies and fireflies glowing",
    choices: [
      { text: "Find the Pattern Gem", next: 9 },
      { text: "Find the Wisdom Gem", next: 10 },
    ],
  },
  {
    text: "You discover a grove of glowing mushrooms! Each mushroom pulses with light in a beautiful pattern: red, blue, red, blue. Then you see purple, yellow, purple, yellow mushrooms! There are even big, small, big, small mushrooms! The Pattern Gem reveals itself - it was hidden among the mushrooms all along! 🍄✨",
    imagePrompt: "Glowing mushrooms in colorful patterns in a magical grove",
    choices: [
      { text: "Continue exploring", next: 7 },
      { text: "Search for the Wisdom Gem", next: 10 },
    ],
  },
  {
    text: "Sparkle leads you to find the Pattern Gem! You discover magical butterflies whose wings show amazing patterns: stripes and dots, zigzags and swirls, stars and hearts! As you admire each pattern, the Pattern Gem floats down from a rainbow butterfly and lands gently in your hands! 🦋✨",
    imagePrompt: "Magical butterflies with patterned wings flying around a glowing gem",
    choices: [
      { text: "Continue the quest", next: 11 },
      { text: "Go back to the clearing", next: 7 },
    ],
  },
  {
    text: "Deep in the forest, you find an ancient wise tree with a friendly face! The tree speaks: 'To find the Wisdom Gem, you must answer this: What makes the forest truly magical?' The answers appear as floating word bubbles: 'Friendship,' 'Kindness,' 'Helping Others.' Which is the true answer?",
    imagePrompt: "A wise old tree with a kind face and glowing word bubbles floating around",
    choices: [
      { text: "All of them together!", next: 12 },
      { text: "Just friendship", next: 13 },
    ],
  },
  {
    text: "You now have four gems! Sparkle's horn glows brighter with each gem collected. 'You're amazing! Just one more gem to find - the Wisdom Gem. It's hidden with the Ancient Tree, the oldest and wisest being in the forest. Let's go find it!'",
    imagePrompt: "A happy purple unicorn with four glowing gems floating around her",
    choices: [
      { text: "Find the Wisdom Gem", next: 10 },
      { text: "See all the gems we found", next: 14 },
    ],
  },
  {
    text: "'Perfect!' the Ancient Tree smiles. 'You understand true wisdom! The magic of the forest comes from friendship, kindness, helping others, and working together!' The Wisdom Gem appears, glowing with warm golden light! 🌟",
    imagePrompt: "A glowing golden wisdom gem appearing from a wise tree",
    choices: [
      { text: "Collect all the gems!", next: 15 },
    ],
  },
  {
    text: "'That's part of it,' the tree says gently, 'but think bigger! What else makes the forest magical?' Try again!",
    imagePrompt: "A wise tree encouraging you to think more",
    choices: [
      { text: "All of them together!", next: 12 },
    ],
  },
  {
    text: "Sparkle shows you all the gems you've collected so far. They float in a circle, each one glowing with its own special color. The Counting Gem (blue), the Color Gem (rainbow), the Shape Gem (silver), and the Pattern Gem (multicolored) all pulse with magic. Together, they make the forest brighter!",
    imagePrompt: "Four magical gems floating in a circle, each glowing with different colors",
    choices: [
      { text: "Let's get the last gem!", next: 10 },
    ],
  },
  {
    text: "Incredible! You've found ALL FIVE rainbow gems! Sparkle's horn glows brilliantly as all the gems float together and create a spectacular rainbow light show! The entire forest comes alive - flowers bloom, trees shimmer, animals dance, and magical music fills the air! The Forest Guardians appear as golden lights and thank you. You've earned the Star Hero Badge! ⭐🌈✨",
    imagePrompt: "A spectacular scene with all five magical gems creating a rainbow light show in a celebrating forest",
    choices: [
      { text: "Choose new adventure", next: -2 },
      { text: "See my rewards", next: -1 },
    ],
  },
];

const spaceSteps: StoryStep[] = [
  {
    text: "Welcome to Space Station Alpha! You're an astronaut on an important mission to explore the galaxy. Commander Luna, a friendly robot with a glowing blue screen face, greets you in the main control room. 'We have detected mysterious signals from three different planets. We need your help to investigate!' What do you want to do first?",
    imagePrompt: "A futuristic space station with a friendly robot commander with a blue glowing screen face",
    choices: [
      { text: "Explore a nearby planet", next: 1 },
      { text: "Check the control panel", next: 2 },
      { text: "Look through the telescope", next: 8 },
    ],
  },
  {
    text: "Commander Luna activates the giant telescope! You see three amazing planets through the viewing screen: Mars glows red with ancient valleys, Saturn spins majestically with its beautiful rings, and Neptune shines blue with swirling storms. Each planet is sending out a special signal! Which planet should we visit first on our space adventure?",
    imagePrompt: "A view through a space telescope showing Mars, Saturn, and Neptune",
    choices: [
      { text: "Visit the red planet Mars", next: 3 },
      { text: "Explore Saturn's rings", next: 4 },
      { text: "Discover blue Neptune", next: 5 },
    ],
  },
  {
    text: "Commander Luna shows you the mission statistics on the main screen: '5 planets visited this year, 10 new stars discovered by our team, and 3 whole galaxies we've mapped! Our space station has been exploring for 100 Earth days. Today is your first mission, and it's going to be the most exciting one yet!' Ready to blast off?",
    imagePrompt: "A futuristic control panel showing space statistics and star maps",
    choices: [
      { text: "Yes, let's go to space!", next: 1 },
      { text: "Tell me about the spaceship", next: 6 },
    ],
  },
  {
    text: "Your spaceship lands on Mars! The red planet is incredible - you see ancient canyons, towering volcanoes, and dusty red plains. You discover 5 special red rocks that sparkle: counting them together - 1, 2, 3, 4, 5! Commander Luna's sensors detect something amazing - these rocks contain frozen water from millions of years ago! You've made an important scientific discovery! You earned a Space Explorer badge! 🚀🔴",
    imagePrompt: "An astronaut on Mars surface finding glowing red rocks with a spaceship in background",
    choices: [
      { text: "Continue exploring", next: 7 },
      { text: "Visit another planet", next: 1 },
    ],
  },
  {
    text: "Wow! Your spaceship flies close to Saturn's magnificent rings! They're made of billions of ice chunks and rocks, all spinning around the giant planet. You count the main ring bands and discover they have amazing colors: creamy yellow, bright orange, and golden brown! The view is breathtaking! Commander Luna takes special photos. You earned a Ring Master badge! 🪐✨",
    imagePrompt: "A spaceship flying near Saturn's colorful rings up close",
    choices: [
      { text: "Continue exploring", next: 7 },
      { text: "Visit another planet", next: 1 },
    ],
  },
  {
    text: "Incredible! Your spaceship approaches Neptune, the most distant planet! It's a beautiful deep blue color, just like Earth's oceans. Through your ship's sensors, you see massive blue storms swirling across the planet - some are as big as Earth itself! You discover mysterious blue crystals floating in Neptune's atmosphere. You earned an Ocean Planet badge! 🌊💙",
    imagePrompt: "A view of blue Neptune with swirling storms and a spaceship approaching",
    choices: [
      { text: "Continue exploring", next: 7 },
      { text: "Visit another planet", next: 1 },
    ],
  },
  {
    text: "Commander Luna gives you a tour of your incredible spaceship! It has a powerful light-speed engine that can travel super fast, a helpful robot assistant named Beep who makes funny beeping sounds, a special telescope that can see billions of miles away, a cozy sleeping pod, and even a space garden with floating plants! The ship is powered by captured starlight!",
    imagePrompt: "Inside a futuristic spaceship with robots, screens, and floating plants",
    choices: [
      { text: "Let's explore space!", next: 1 },
      { text: "Start a new adventure", next: -2 },
    ],
  },
  {
    text: "Great work! Commander Luna congratulates you. 'You've explored amazing planets! But our sensors detect more mysteries out there. We've received signals from distant asteroids and maybe even from other explorers! Should we investigate further, or check on what we've learned so far?'",
    imagePrompt: "A robot commander showing space maps with signal indicators",
    choices: [
      { text: "Explore asteroid belt", next: 9 },
      { text: "Visit Moon Station", next: 10 },
    ],
  },
  {
    text: "You look through the space station's mega telescope! It's so powerful you can see distant stars being born, colorful nebulas that look like space clouds, and even spot the International Space Station orbiting Earth! You count 5 twinkling stars in the constellation nearby. Space is full of wonders!",
    imagePrompt: "Looking through a large telescope at colorful nebulas and stars",
    choices: [
      { text: "Go on a mission", next: 1 },
      { text: "Learn about the spaceship", next: 6 },
    ],
  },
  {
    text: "You fly into the asteroid belt! It's like a space obstacle course with floating rocks everywhere! Your piloting skills help you dodge asteroids while Beep the robot scans them. You discover asteroids made of iron, ice, and even one with colorful crystals! You collect samples from 5 different asteroids by carefully using your ship's robot arm! 🌠",
    imagePrompt: "A spaceship navigating through floating asteroids of different colors",
    choices: [
      { text: "Continue space adventure", next: 11 },
      { text: "Visit Moon Station", next: 10 },
    ],
  },
  {
    text: "You dock at Moon Station! It's a cozy base on Earth's moon. Through the window, you see Earth looking like a beautiful blue and green marble. The moon astronauts share their moon rocks with you - they're gray and sparkly! You try the moon gravity simulator and bounce around having fun! You can see your home planet from here! 🌙🌍",
    imagePrompt: "A lunar base on the moon with Earth visible in the background",
    choices: [
      { text: "Continue the mission", next: 11 },
      { text: "Explore more planets", next: 1 },
    ],
  },
  {
    text: "Commander Luna's screen shows a big smile! 'You've been an amazing space explorer! We've discovered so much: new planets, asteroids, moon bases, and cosmic wonders. But the most important discovery is that space exploration brings joy and learning. Ready for the final mission - visiting the Comet!'",
    imagePrompt: "A happy robot commander with space discovery images on screens",
    choices: [
      { text: "Chase the comet!", next: 12 },
      { text: "Review our discoveries", next: 13 },
    ],
  },
  {
    text: "You pilot your ship toward a beautiful comet racing through space! It has a glowing blue head and a brilliant white tail stretching for millions of miles! As you fly alongside it, you see it's made of ancient ice and dust from the birth of our solar system. This comet is 4 billion years old! Commander Luna says you're now a Comet Chaser! ☄️✨",
    imagePrompt: "A spaceship flying next to a glowing comet with a long tail through space",
    choices: [
      { text: "Complete the mission!", next: 14 },
    ],
  },
  {
    text: "Commander Luna displays all your amazing discoveries: Mars rocks, Saturn's rings, Neptune's storms, asteroid samples, moon station visits, and the ancient comet! Each discovery taught us something new about our amazing universe. You're becoming a real space scientist!",
    imagePrompt: "A display showing all the space discoveries with labeled images",
    choices: [
      { text: "Finish the mission!", next: 12 },
    ],
  },
  {
    text: "Mission complete! You've become a Space Hero! You've explored planets, counted stars, chased comets, and made incredible discoveries! Commander Luna and Beep celebrate with you as the space station's lights flash in celebration! Earth sends congratulations! You've earned the Galactic Explorer badge and the Star Captain medal! 🚀⭐🏅",
    imagePrompt: "A celebration scene in a space station with Earth in the window and confetti",
    choices: [
      { text: "Choose new adventure", next: -2 },
      { text: "See my rewards", next: -1 },
    ],
  },
];

const oceanSteps: StoryStep[] = [
  {
    text: "Dive into the Deep Blue Sea! You're in a fantastic yellow submarine with big round windows. Captain Coral, a cheerful seahorse wearing a tiny captain's hat, greets you! 'Welcome aboard! The ocean holds many secrets and treasures. We need brave explorers like you to discover them all!' The submarine's sonar beeps with excitement. What would you like to do?",
    imagePrompt: "A bright yellow submarine underwater with a cute seahorse captain wearing a hat",
    choices: [
      { text: "Search for treasure", next: 1 },
      { text: "Learn about the ocean", next: 2 },
      { text: "Visit the dolphins", next: 8 },
    ],
  },
  {
    text: "Captain Coral shows you the submarine's map! Three underwater paths appear: The Rainbow Reef path sparkles with colorful fish darting everywhere, the Coral Garden path glows with living coral creating a magical maze, and the Crystal Cave path leads to a mysterious blue cave that shimmers. Each path hides special treasures! Which way should we dive?",
    imagePrompt: "An underwater map showing three colorful paths with fish and coral",
    choices: [
      { text: "Follow the colorful fish", next: 3 },
      { text: "Explore the coral reef", next: 4 },
      { text: "Enter the mysterious cave", next: 5 },
    ],
  },
  {
    text: "Captain Coral shares ocean wisdom while you watch fish swim by: 'The ocean is home to dolphins that sing songs, whales that travel thousands of miles, octopuses that can change colors, tiny seahorses, giant sharks, and fish in every color of the rainbow! The coral reefs are like underwater cities where thousands of sea creatures live together. Every creature has an important job!'",
    imagePrompt: "Captain Coral seahorse explaining ocean life with sea creatures swimming around",
    choices: [
      { text: "Yes, let's explore!", next: 1 },
      { text: "Tell me about submarines", next: 6 },
    ],
  },
  {
    text: "Beautiful! You follow a school of rainbow fish! They swim in perfect harmony through the coral. You count them: 1 bright red fish, 2 orange clownfish, 3 sunny yellow tangs, 4 emerald green fish, and 5 royal blue fish! They're putting on a colorful show just for you! Captain Coral discovers a golden fish scale - your first treasure! You earned a Rainbow Fish badge! 🐠🌈",
    imagePrompt: "A school of rainbow-colored fish swimming in formation underwater",
    choices: [
      { text: "Continue diving", next: 7 },
      { text: "Try another path", next: 1 },
    ],
  },
  {
    text: "Amazing! You dive into the Coral Garden! It's like an underwater rainbow forest! You discover coral in every color: fiery red coral branches, bright orange fan coral waving hello, golden yellow tube coral, green brain coral, purple staghorn coral, and pink flowery coral! Sea anemones dance in the current! You found a pearl hidden in a giant clam! You earned a Coral Explorer badge! 🪸💎",
    imagePrompt: "A colorful coral reef garden with various types of coral in rainbow colors",
    choices: [
      { text: "Continue diving", next: 7 },
      { text: "Try another path", next: 1 },
    ],
  },
  {
    text: "Wow! Your submarine's lights illuminate the Crystal Cave! Inside you find three treasure chests sitting on the sandy floor! The first chest has beautiful white pearls, the second has colorful seashells from around the world, and the third has shimmering blue crystals and starfish! Captain Coral helps you carefully collect samples. You earned a Treasure Hunter badge! 💎⭐",
    imagePrompt: "A mysterious underwater cave with three treasure chests glowing",
    choices: [
      { text: "Continue diving", next: 7 },
      { text: "Try another path", next: 1 },
    ],
  },
  {
    text: "Captain Coral gives you a submarine tour! Your submarine has special features: big bubble windows for the best views, bright searchlights that can light up the dark ocean depths, a robot arm for collecting samples, oxygen tanks that last all day, a sonar system that makes clicking sounds to map the ocean, and even a friendly aquarium inside with pet fish! It's powered by clean ocean energy!",
    imagePrompt: "Inside a submarine with bubble windows and control panels",
    choices: [
      { text: "Let's dive deeper!", next: 1 },
      { text: "Start a new adventure", next: -2 },
    ],
  },
  {
    text: "Fantastic work! Captain Coral's seahorse tail curls with excitement! 'You've found amazing treasures and seen beautiful parts of the ocean! But there are even more wonders waiting below. Should we dive deeper into the twilight zone, or visit some friendly sea creatures first?'",
    imagePrompt: "A happy seahorse captain with collected treasures floating nearby",
    choices: [
      { text: "Meet the sea turtles", next: 9 },
      { text: "Dive to the deep ocean", next: 10 },
    ],
  },
  {
    text: "You spot a pod of dolphins swimming gracefully! They swim up to your submarine and seem to smile at you through the window! The dolphins do flips and spins, showing off their acrobatic skills. They click and whistle - Captain Coral translates: 'Welcome, explorer friend!' They lead you to a special underwater playground where dolphins play with bubbles! 🐬💙",
    imagePrompt: "Playful dolphins swimming and doing flips near a submarine",
    choices: [
      { text: "Continue ocean adventure", next: 7 },
      { text: "Meet more creatures", next: 9 },
    ],
  },
  {
    text: "You discover a family of sea turtles! There's Grandpa Turtle who is 100 years old, Mama Turtle who is wise and kind, and three baby turtles just learning to swim! They munch on sea grass and glide through the water so peacefully. The baby turtles play hide and seek in the coral! You take photos to remember this magical moment! 🐢💚",
    imagePrompt: "A family of sea turtles of different sizes swimming peacefully",
    choices: [
      { text: "Explore deeper waters", next: 10 },
      { text: "Continue exploring", next: 11 },
    ],
  },
  {
    text: "Your submarine dives deeper into the twilight zone where it's darker and more mysterious! Here you discover glowing creatures! A jellyfish pulses with blue light, an anglerfish has a glowing lure like a fishing pole, and tiny plankton sparkle like underwater stars! Everything glows down here! It's like an underwater light show! The deep ocean is magical! 🌊✨",
    imagePrompt: "Glowing deep-sea creatures in the dark ocean depths",
    choices: [
      { text: "Explore more!", next: 11 },
      { text: "Return to shallower waters", next: 7 },
    ],
  },
  {
    text: "Captain Coral receives an exciting message! 'An ancient shipwreck has been discovered nearby! It's been underwater for 300 years! Should we explore it? It might have historical treasures and is now home to many sea creatures. It's perfectly safe to visit!'",
    imagePrompt: "An old shipwreck covered in coral with fish swimming around it",
    choices: [
      { text: "Explore the shipwreck!", next: 12 },
      { text: "See what we've discovered", next: 13 },
    ],
  },
  {
    text: "You explore the ancient shipwreck! It's now a thriving reef ecosystem! Fish live in the old captain's cabin, octopuses make homes in the ship's pots, and beautiful coral grows on the wooden hull. You find an old treasure map (made safe by time), ancient coins, and a ship's bell! Captain Coral says these artifacts will go to a museum! 🏴‍☠️⚓",
    imagePrompt: "An old shipwreck covered in coral and fish with treasure visible",
    choices: [
      { text: "Complete the dive!", next: 14 },
    ],
  },
  {
    text: "Captain Coral displays all your ocean discoveries on the submarine's screen: rainbow fish, colorful coral, treasure chests, friendly dolphins, wise sea turtles, glowing deep-sea creatures, and the historic shipwreck! Each discovery helps scientists learn more about protecting our oceans!",
    imagePrompt: "A submarine screen showing all the ocean discoveries",
    choices: [
      { text: "Finish the mission!", next: 12 },
    ],
  },
  {
    text: "Mission accomplished! You're an Ocean Hero! You've explored coral reefs, discovered treasures, made friends with dolphins and turtles, seen glowing creatures, and explored a shipwreck! Captain Coral presents you with a special pearl trophy! The whole ocean celebrates with you as fish swim in joyful circles! You earned the Deep Sea Explorer medal and the Ocean Guardian badge! 🌊🏅⭐",
    imagePrompt: "A celebration underwater with sea creatures, a seahorse captain, and a glowing trophy",
    choices: [
      { text: "Choose new adventure", next: -2 },
      { text: "See my rewards", next: -1 },
    ],
  },
];

const castleSteps: StoryStep[] = [
  {
    text: "Welcome to the Enchanted Castle! You arrive at a magnificent castle with purple towers, golden flags, and a rainbow bridge. Princess Harmony, wearing a crown of flowers, greets you warmly! Beside her is Sparkles, a gentle purple dragon with butterfly wings. 'Oh wonderful! We need your help! Sparkles has lost his magical confidence gems and without them, he can't create his beautiful sparkles anymore!' What will you do?",
    imagePrompt: "A magical castle with purple towers and a princess with a gentle purple dragon with butterfly wings",
    choices: [
      { text: "Help the dragon", next: 1 },
      { text: "Explore the castle", next: 2 },
      { text: "Meet the castle friends", next: 8 },
    ],
  },
  {
    text: "Princess Harmony leads you to the castle courtyard and points to three tall towers! The Star Tower twinkles with starlight at the top, the Heart Tower glows with warm pink light, and the Rainbow Tower shimmers with all colors! 'Each tower holds one of Sparkles' confidence gems. He needs all three to sparkle again!' Which tower should we search first?",
    imagePrompt: "Three magical towers: one with stars, one with hearts, and one with rainbows",
    choices: [
      { text: "Search the Star Tower", next: 3 },
      { text: "Check the Heart Tower", next: 4 },
      { text: "Visit the Rainbow Tower", next: 5 },
    ],
  },
  {
    text: "Princess Harmony shows you around the magnificent castle while Sparkles flies alongside! 'Our castle has 5 tall towers for viewing the kingdom, 10 beautiful rooms including a library and an art studio, 3 magical gardens with singing flowers, a grand ballroom, and stables for the unicorns! Everyone here is kind and helpful. We all love Sparkles and want to help him feel confident again!'",
    imagePrompt: "Princess Harmony showing a beautiful castle with towers and gardens",
    choices: [
      { text: "Yes, let's help Sparkles!", next: 1 },
      { text: "Tell me about the dragon", next: 6 },
    ],
  },
  {
    text: "You climb the spiral staircase of the Star Tower! At the top, you find a magical observatory! The ceiling is open to the sky. You count 5 shining stars that form a special constellation! As you count - 1, 2, 3, 4, 5 - the stars light up brighter and brighter! The Confidence Star Gem appears in a burst of starlight! Sparkles does a happy loop in the air! You earned a Star Finder badge! ⭐✨",
    imagePrompt: "Inside a magical tower with stars shining through and a glowing star gem appearing",
    choices: [
      { text: "Continue the quest", next: 7 },
      { text: "Try another tower", next: 1 },
    ],
  },
  {
    text: "You enter the Heart Tower and discover a room filled with love and friendship! The walls have hearts in every color: ruby red hearts, soft pink hearts, deep purple hearts, and even golden hearts! Each heart represents an act of kindness done in the kingdom. As you admire them all, the Confidence Heart Gem materializes! It glows with warm light! Sparkles purrs like a kitten! You earned a Heart Hero badge! 💖✨",
    imagePrompt: "A room filled with colorful hearts floating and glowing on walls",
    choices: [
      { text: "Continue the quest", next: 7 },
      { text: "Try another tower", next: 1 },
    ],
  },
  {
    text: "You ascend the Rainbow Tower! The staircase itself changes colors with each step! At the top, you find a round room with crystal windows. Sunlight streams through, creating rainbows everywhere! You see all the rainbow colors: RED, ORANGE, YELLOW, GREEN, BLUE, INDIGO, and VIOLET dancing on the walls! The Confidence Rainbow Gem appears in a spectrum of light! Sparkles' scales shimmer! You earned a Rainbow Knight badge! 🌈✨",
    imagePrompt: "A rainbow-filled tower room with crystal windows and a glowing rainbow gem",
    choices: [
      { text: "Continue the quest", next: 7 },
      { text: "Try another tower", next: 1 },
    ],
  },
  {
    text: "Princess Harmony tells you all about Sparkles! 'Sparkles is special! He's a rare Confidence Dragon - purple with butterfly wings instead of bat wings! Unlike scary dragons, he breathes colorful sparkles and glitter, never fire! He loves to paint pictures, tell jokes, and make friends laugh. He's been my best friend since we were both very young. When he has his confidence gems, his sparkles can make flowers bloom and create beautiful light shows!'",
    imagePrompt: "A friendly purple dragon with butterfly wings playing and creating sparkles",
    choices: [
      { text: "Let's help Sparkles!", next: 1 },
      { text: "Start a new adventure", next: -2 },
    ],
  },
  {
    text: "Wonderful! Sparkles is getting happier with each gem we find! He can already make small sparkles again! Princess Harmony claps her hands! 'You're doing amazingly! But there are actually MORE gems hidden around the castle - the Courage Gem and the Joy Gem! With all five gems, Sparkles will shine brighter than ever! Should we keep searching?'",
    imagePrompt: "A dragon beginning to sparkle again with collected gems floating nearby",
    choices: [
      { text: "Find the Courage Gem!", next: 9 },
      { text: "Find the Joy Gem!", next: 10 },
    ],
  },
  {
    text: "You meet the castle's delightful residents! Sir Bunny the brave rabbit knight, Lady Squirrel who runs the library, Chef Mouse who makes the best acorn cookies, and three fairy friends: Twinkle, Shimmer, and Glow! They all love Sparkles and want to help. They tell you stories about how Sparkles helped each of them when they felt sad! 🐰🐿️🐭🧚",
    imagePrompt: "Cute castle residents including a bunny knight, squirrel, mouse, and fairies",
    choices: [
      { text: "Continue the quest", next: 7 },
      { text: "Search the towers", next: 1 },
    ],
  },
  {
    text: "You explore the castle's enchanted garden! There's a maze made of hedges, but instead of getting lost, Sir Bunny guides you through! In the center of the maze, you find the Courage Statue - a dragon standing brave and proud! As you admire it and think about being brave, the Courage Gem appears from behind the statue! Sparkles roars (very softly and cutely)! 🛡️✨",
    imagePrompt: "A garden maze with a statue of a brave dragon and a glowing gem",
    choices: [
      { text: "Find the Joy Gem!", next: 10 },
      { text: "Continue exploring", next: 11 },
    ],
  },
  {
    text: "Princess Harmony leads everyone to the Grand Ballroom! 'The Joy Gem appears when there's laughter and fun!' Everyone starts dancing and playing games! You join in, dancing with the princess, playing tag with Sir Bunny, and laughing at Chef Mouse's funny jokes! As joy fills the room, the Joy Gem sparkles into existence, floating down like a soap bubble! 🎉💫",
    imagePrompt: "A grand ballroom with characters dancing and celebrating joyfully",
    choices: [
      { text: "Collect all the gems!", next: 11 },
      { text: "Keep celebrating!", next: 12 },
    ],
  },
  {
    text: "Almost there! Sparkles is looking more confident with each gem! Princess Harmony gathers all the gems you've found: the Star Gem, the Heart Gem, the Rainbow Gem, the Courage Gem, and the Joy Gem! They float in a circle, glowing brighter and brighter! 'Just one more thing,' says Princess Harmony, 'we need to take them to the Castle's heart!' Ready for the finale?",
    imagePrompt: "Five glowing magical gems floating in a circle",
    choices: [
      { text: "Go to the Castle's heart!", next: 13 },
    ],
  },
  {
    text: "Everyone celebrates in the ballroom! The band plays happy music, fairy lights twinkle everywhere, and a magnificent rainbow cake appears! All the castle residents dance together - even the shy unicorns from the stables come to join! Sparkles practices making small sparkles and everyone cheers! It's the best party ever! 🎊🎵",
    imagePrompt: "A celebration with dancing characters, lights, and a rainbow cake",
    choices: [
      { text: "Complete the quest!", next: 13 },
    ],
  },
  {
    text: "Princess Harmony leads you to a secret room in the castle's central tower - the Crystal Heart Chamber! It's a beautiful room with a giant crystal shaped like a heart. 'This is where all the castle's magic comes from!' You and Sparkles place all five confidence gems around the crystal heart. They glow and merge with the crystal!",
    imagePrompt: "A magical chamber with a giant crystal heart surrounded by five glowing gems",
    choices: [
      { text: "Watch the magic happen!", next: 14 },
    ],
  },
  {
    text: "AMAZING! The Crystal Heart absorbs all the gems and sends rainbow light throughout the entire castle! Sparkles transforms - his scales shimmer with rainbow colors, his butterfly wings sparkle with starlight, and he breathes the most beautiful sparkles you've ever seen! The whole castle illuminates! Flowers bloom everywhere! Princess Harmony hugs you! Sparkles creates a spectacular sparkle show just for you! You're a Castle Hero! You earned the Kingdom Protector medal, the Friendship Crown, and the Dragon Helper badge! 🏰👑🐉⭐",
    imagePrompt: "A magical transformation scene with a sparkling dragon, glowing castle, and celebrating characters",
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
    description: "Help Sparkle the unicorn find the lost rainbow gems!",
    icon: TreePine,
    bgColor: "from-green-500/20 to-emerald-500/20",
    steps: magicForestSteps,
  },
  {
    id: "space",
    title: "Space Explorer",
    description: "Travel through space with Commander Luna!",
    icon: Rocket,
    bgColor: "from-blue-500/20 to-purple-500/20",
    steps: spaceSteps,
  },
  {
    id: "ocean",
    title: "Ocean Adventure",
    description: "Dive deep with Captain Coral to find treasures!",
    icon: Fish,
    bgColor: "from-cyan-500/20 to-blue-500/20",
    steps: oceanSteps,
  },
  {
    id: "castle",
    title: "Enchanted Castle",
    description: "Help Sparkles the dragon in Princess Harmony's kingdom!",
    icon: Castle,
    bgColor: "from-pink-500/20 to-purple-500/20",
    steps: castleSteps,
  },
];

const Story = () => {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [storyImage, setStoryImage] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);

  const currentAdventure = storyAdventures.find(s => s.id === selectedStory);
  const story = currentAdventure?.steps[currentStep];

  useEffect(() => {
    if (story?.imagePrompt && !loadingImage) {
      generateStoryImage(story.imagePrompt);
    }
  }, [story?.imagePrompt]);

  const generateStoryImage = async (prompt: string) => {
    setLoadingImage(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-story-image', {
        body: { prompt }
      });

      if (error) throw error;
      
      if (data?.imageUrl) {
        setStoryImage(data.imageUrl);
      }
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error('Could not load story image');
    } finally {
      setLoadingImage(false);
    }
  };

  const handleChoice = (nextStep: number) => {
    if (nextStep === -1) {
      window.location.href = "/rewards";
    } else if (nextStep === -2) {
      setSelectedStory(null);
      setCurrentStep(0);
      setStoryImage(null);
    } else {
      setCurrentStep(nextStep);
      setStoryImage(null);
    }
  };

  const handleStorySelect = (storyId: string) => {
    setSelectedStory(storyId);
    setCurrentStep(0);
    setStoryImage(null);
  };

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
                Choose your own adventure and see it come to life!
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
                setStoryImage(null);
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
              className={`h-64 bg-gradient-to-br ${currentAdventure?.bgColor} relative flex items-center justify-center overflow-hidden`}
            >
              {loadingImage ? (
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
              ) : storyImage ? (
                <img 
                  src={storyImage} 
                  alt="Story scene" 
                  className="w-full h-full object-cover"
                />
              ) : (
                currentAdventure && (
                  <currentAdventure.icon className="w-32 h-32 text-primary/40" />
                )
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
