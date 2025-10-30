import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Clock, Target } from "lucide-react";

const ParentDashboard = () => {
  const weeklyActivity = [
    { day: "Mon", stories: 2, games: 3, mindfulness: 1 },
    { day: "Tue", stories: 1, games: 2, mindfulness: 2 },
    { day: "Wed", stories: 3, games: 1, mindfulness: 1 },
    { day: "Thu", stories: 2, games: 4, mindfulness: 1 },
    { day: "Fri", stories: 1, games: 2, mindfulness: 3 },
    { day: "Sat", stories: 3, games: 5, mindfulness: 2 },
    { day: "Sun", stories: 2, games: 3, mindfulness: 1 },
  ];

  const skills = [
    { name: "Counting & Numbers", progress: 75, color: "bg-primary" },
    { name: "Shape Recognition", progress: 90, color: "bg-secondary" },
    { name: "Color Identification", progress: 85, color: "bg-accent" },
    { name: "Emotional Awareness", progress: 70, color: "bg-success" },
    { name: "Problem Solving", progress: 65, color: "bg-primary" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-magic bg-clip-text text-transparent flex items-center justify-center gap-3">
              <Users className="w-12 h-12 text-primary" />
              Parent Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Track your child's learning journey
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="shadow-playful border-4 border-primary/20">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-3xl font-bold text-foreground">2.5h</p>
                <p className="text-sm text-muted-foreground">This Week</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-playful border-4 border-secondary/20">
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <p className="text-3xl font-bold text-foreground">12</p>
                <p className="text-sm text-muted-foreground">Activities</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-playful border-4 border-success/20">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-success" />
                <p className="text-3xl font-bold text-foreground">+25%</p>
                <p className="text-sm text-muted-foreground">Progress</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-playful border-4 border-accent/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">🎯</div>
                <p className="text-3xl font-bold text-foreground">8</p>
                <p className="text-sm text-muted-foreground">Streaks</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Weekly Activity */}
            <Card className="shadow-playful border-4 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Weekly Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyActivity.map((day) => (
                    <div key={day.day} className="flex items-center gap-4">
                      <span className="text-sm font-bold text-muted-foreground w-12">
                        {day.day}
                      </span>
                      <div className="flex-1 flex gap-1">
                        {Array.from({ length: day.stories }).map((_, i) => (
                          <div key={`s${i}`} className="h-8 flex-1 bg-primary rounded" />
                        ))}
                        {Array.from({ length: day.games }).map((_, i) => (
                          <div key={`g${i}`} className="h-8 flex-1 bg-secondary rounded" />
                        ))}
                        {Array.from({ length: day.mindfulness }).map((_, i) => (
                          <div key={`m${i}`} className="h-8 flex-1 bg-success rounded" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-4 mt-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded" />
                    <span>Stories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-secondary rounded" />
                    <span>Games</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-success rounded" />
                    <span>Mindfulness</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Progress */}
            <Card className="shadow-playful border-4 border-secondary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Skills Development</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">
                          {skill.name}
                        </span>
                        <span className="text-sm font-bold text-muted-foreground">
                          {skill.progress}%
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${skill.color} transition-all duration-500`}
                          style={{ width: `${skill.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card className="shadow-playful border-4 border-accent/20">
            <CardHeader>
              <CardTitle className="text-2xl">Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-primary/10 rounded-xl border-2 border-primary/20">
                  <div className="text-4xl mb-2">📚</div>
                  <h4 className="font-bold text-foreground mb-2">
                    Continue Stories
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Your child loves interactive stories. Try the Rainbow Quest next!
                  </p>
                </div>
                
                <div className="p-4 bg-secondary/10 rounded-xl border-2 border-secondary/20">
                  <div className="text-4xl mb-2">🎮</div>
                  <h4 className="font-bold text-foreground mb-2">
                    New Games
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Counting games will help develop number recognition skills.
                  </p>
                </div>
                
                <div className="p-4 bg-success/10 rounded-xl border-2 border-success/20">
                  <div className="text-4xl mb-2">🧘</div>
                  <h4 className="font-bold text-foreground mb-2">
                    Daily Calm
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Regular mindfulness practice improves focus and emotional awareness.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ParentDashboard;
