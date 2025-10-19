import { API_KEY } from '@/config/config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  const country = searchParams.get('country') || 'us'
  const category = searchParams.get('category') || 'general'
  const pageSize = searchParams.get('pageSize') || '20'
  const page = searchParams.get('page') || '1'
  const searchQuery = searchParams.get('q') || ''

  try {
    const baseUrl = searchQuery
      ? 'https://newsapi.org/v2/everything'
      : 'https://newsapi.org/v2/top-headlines'
    
    const queryParams = searchQuery
      ? `q=${searchQuery}&pageSize=${pageSize}&page=${page}`
      : `country=${country}&category=${category}&pageSize=${pageSize}&page=${page}`

    const response = await fetch(
      `${baseUrl}?${queryParams}&apiKey=${API_KEY}`
    )
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching news' }, 
      { status: 500 }
    )
  }
}