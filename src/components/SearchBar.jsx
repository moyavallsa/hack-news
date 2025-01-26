import { Input } from "@/components/ui/input";

const SearchBar = ({ searchTerm, setSearchTerm, lastUpdated }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <Input
        type="text"
        placeholder="Hack the search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-input text-primary border-primary max-w-md"
      />
      <span className="text-sm text-muted-foreground">
        Last updated: {new Date(lastUpdated).toLocaleTimeString()}
      </span>
    </div>
  );
};

export default SearchBar;