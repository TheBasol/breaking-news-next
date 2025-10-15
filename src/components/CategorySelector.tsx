interface CategorySelectorProps {
  category: string;
  setCategory: (category: string) => void;
}

export const CategorySelector = ({ category, setCategory }: CategorySelectorProps) => {
  const categories = [
    {id: "general", name: "General"},
    {id: "business", name: "Business"},
    {id: "entertainment", name: "Entertainment"},
    {id: "health", name: "Health"},
    {id: "science", name: "Science"},
    {id: "sports", name: "Sports"},
    {id: "technology", name: "Technology"}  
  ];

  return (
    <div className="flex justify-center space-x-2 mb-4">
        <div className="btn-group">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`btn ${category === cat.id ? "btn-active" : ""}`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

    </div>
  );
};

