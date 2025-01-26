import StoryCard from "./StoryCard";

const StoriesGrid = ({ stories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stories.map((story) => (
        <StoryCard key={story.objectID} story={story} />
      ))}
    </div>
  );
};

export default StoriesGrid;