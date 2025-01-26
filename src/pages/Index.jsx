import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Terminal } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import MatrixBackground from '@/components/MatrixBackground';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import StoriesGrid from '@/components/StoriesGrid';

const fetchTopStories = async () => {
  const response = await fetch('https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=100');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typingEffect, setTypingEffect] = useState('');
  const { toast } = useToast();

  const { data, isLoading, error, dataUpdatedAt } = useQuery({
    queryKey: ['topStories'],
    queryFn: fetchTopStories,
    refetchInterval: 60000,
    onSuccess: (newData, variables, context) => {
      if (context?.previousData && newData.hits.length !== context.previousData.hits.length) {
        toast({
          title: "New Stories Available",
          description: "The feed has been updated with new stories!",
          duration: 3000,
        });
      }
    },
  });

  const filteredStories = data?.hits
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .filter(story => story.title.toLowerCase().includes(searchTerm.toLowerCase())) || [];

  useEffect(() => {
    const text = "Hacker News Terminal";
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setTypingEffect((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <>
      <div className="container mx-auto p-4 bg-background/80 relative z-10 min-h-screen">
        <MatrixBackground />
        <h1 className="text-4xl font-bold mb-6 text-primary text-glow flex items-center">
          <Terminal className="mr-2" />
          {typingEffect}<span className="animate-pulse">_</span>
        </h1>
        
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          lastUpdated={dataUpdatedAt} 
        />

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="animate-pulse bg-card rounded-lg p-6">
                <div className="h-6 bg-secondary rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-secondary rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-secondary rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-destructive">Error: {error.message}</p>}
        
        {!isLoading && !error && (
          <StoriesGrid stories={filteredStories} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Index;