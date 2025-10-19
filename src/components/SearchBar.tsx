import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search news..."
        className="input input-bordered w-full bg-primary-content/10 text-primary-content placeholder:text-primary-content/70 border-primary-content/30 focus:border-primary-content"
      />
      <button type="submit" className="btn btn-secondary">
        Search
      </button>
    </form>
  );
};