import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

type StoryImage = {
  id: string;
  story_name: string;
  step_number: number;
  step_text: string;
  image_url: string;
  created_at: string;
};

const Gallery = () => {
  const [images, setImages] = useState<StoryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<StoryImage | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('story_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-magic bg-clip-text text-transparent mb-4">
            Storybook Gallery
          </h1>
          <p className="text-muted-foreground text-lg">
            All your magical adventure memories in one place! 📚✨
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : images.length === 0 ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <ImageIcon className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                No images yet! Start your story adventures to create beautiful memories.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image) => (
              <Card
                key={image.id}
                className="group cursor-pointer overflow-hidden hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
                onClick={() => setSelectedImage(image)}
              >
                <CardContent className="p-0">
                  <div className="aspect-square relative overflow-hidden bg-muted">
                    <img
                      src={image.image_url}
                      alt={`${image.story_name} - Step ${image.step_number}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <p className="text-sm font-semibold text-foreground">{image.story_name}</p>
                      <p className="text-xs text-muted-foreground">Step {image.step_number}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <Card className="max-w-4xl w-full max-h-[90vh] overflow-auto">
              <CardContent className="p-6">
                <img
                  src={selectedImage.image_url}
                  alt={`${selectedImage.story_name} - Step ${selectedImage.step_number}`}
                  className="w-full h-auto rounded-lg mb-4"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {selectedImage.story_name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Step {selectedImage.step_number} • {new Date(selectedImage.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-foreground mt-4">
                    {selectedImage.step_text}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Gallery;
