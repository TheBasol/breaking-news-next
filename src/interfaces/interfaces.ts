export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content?: string;
  author: string | null;
  source: {
    id: string | null;
    name: string;
  };
}