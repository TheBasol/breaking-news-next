'use client'
import { CategorySelector, NewsGrid, Pagination, SearchBar } from "@/components"
import { NewsArticle } from "@/interfaces/interfaces"
import { useEffect, useState } from "react"


export default function Home() {
const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState("general")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")

  const PAGE_SIZE = 20

  const fetchNews = async (category: string, page: number, query: string = "") => {
    setLoading(true)
    setError(null)
    try {
      const url = query
        ? `/api/news?q=${query}&pageSize=${PAGE_SIZE}&page=${page}`
        : `/api/news?country=us&category=${category}&pageSize=${PAGE_SIZE}&page=${page}`
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setNews(data.articles || [])
      setTotalResults(data.totalResults || 0)
      setTotalPages(Math.ceil(data.totalResults / PAGE_SIZE))  
    } catch (err) {
      setError("Error fetching news")
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  } 

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory)
    setSearchQuery("")
    setCurrentPage(1)
  } 

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    if (page > 1) setCurrentPage(page - 1)
    if (page < totalPages) setCurrentPage(page + 1)
  }

  useEffect(() => {
    fetchNews(category, currentPage, searchQuery)
  }, [category, currentPage, searchQuery])

  return (
    <>
      <div className="min-h-screen bg-base-200">
        <header className="bg-primary text-primary-content p-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <h1 className="text-4xl font-bold">Breaking News</h1>
              <div className="w-full md:w-96">
                <SearchBar onSearch={handleSearch} />
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto p-4">
          <div className="mb-6">
            {!searchQuery && (
              <CategorySelector 
                category={category} 
                setCategory={handleCategoryChange} 
              />
            )}
          </div>
          <div className="mb-6 text-center">
            {totalResults > 0 && <p className="text-lg">Showing {totalResults} results</p>}
          </div>
          {loading && (
            <div className="flex justify-center">
              <span className="loading loading-ring loading-lg"></span>
            </div>
          )}
          {error && <div className="alert alert-error">{error}</div>}

          {!loading && !error && news.length > 0 && (
          <>
            <NewsGrid articles={news} />
            {totalPages > 1 && (
              <div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </div>
            )}
          </>
          )}
        </main>
      </div>
    </>
  )
}
