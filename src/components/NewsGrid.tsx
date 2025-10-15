
import type { NewsArticle } from "../interfaces/interfaces";
import { NewsCard } from "./NewsCard";

interface NewsGridProps {
  articles: NewsArticle[];
}

export const NewsGrid = ({ articles }: NewsGridProps) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article, index) => (
            <NewsCard key={index} article={article} />
        ))}
    </div>
  );
};
