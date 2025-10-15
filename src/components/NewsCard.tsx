import type { NewsArticle } from "../interfaces/interfaces";

interface NewsCardProps {
  article: NewsArticle;
}

export const NewsCard = ({ article }: NewsCardProps) => {

  return (
    <div className="card bg-base-100 shadow-xl">
        {article.urlToImage && (
          <figure>
            <img src={article.urlToImage} alt={article.title} className="h-48 w-full object-cover"/>
          </figure>
        )}
        <div className="card-body">
          <h2 className="card-title">{article.title}</h2>
          {article.source?.name && (
            <p className="text-sm text-gray-500">Source: {article.source.name}</p>
          )}
          <p>{article.description}</p>
          <div className="card-actions justify-end mt-4">
            <a href={article.url} target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary">
                Read More
            </a>
          </div>
        </div>
    </div>
  );
};