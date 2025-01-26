import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const StoryCard = ({ story }) => {
  return (
    <Card className="bg-card/90 border-primary hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 ease-in-out backdrop-blur-sm group">
      <CardHeader className="group-hover:text-pink-500 transition-colors duration-300">
        <CardTitle className="text-lg text-primary group-hover:text-pink-500 transition-colors duration-300">{story.title}</CardTitle>
      </CardHeader>
      <CardContent className="group-hover:text-pink-300 transition-colors duration-300">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Clock className="h-4 w-4" />
          <span>{formatDistanceToNow(new Date(story.created_at), { addSuffix: true })}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-2">Upvotes: {story.points}</p>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-primary text-primary hover:bg-pink-500 hover:text-black hover:border-pink-500 transition-colors duration-300"
        >
          <a href={story.url} target="_blank" rel="noopener noreferrer">
            Hack <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default StoryCard;