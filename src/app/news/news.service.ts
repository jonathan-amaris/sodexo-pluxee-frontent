import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from './news';
import { HttpClient } from '@angular/common/http';

export interface GetNewsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: News[]
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  spaceFlightNewsApi = `https://api.spaceflightnewsapi.net/v4/articles/?limit=10`
  favoriteNewsApi = `http://localhost:9090/api/v1/news/favorites`
  
  constructor(private httpClient:HttpClient) {}

  getNews(
    offset: number,
    ordering: string,
    search: string = ''
  ): Observable<GetNewsResponse> {
    const response = this.httpClient.get<GetNewsResponse>(
      `${this.spaceFlightNewsApi}&offset=${offset}&ordering=${ordering}&search=${search}`
    )

    return response
  }

  addNewsToFavorite(news: News): Observable<News> {
    const response = this.httpClient.post<News>(this.favoriteNewsApi, news)

    return response
  }

  removeNewsFromFavorites(id: number): Observable<News> {
    const response = this.httpClient.delete<News>(`${this.favoriteNewsApi}/${id}`)

    return response
  }

  getFavoriteNews(
    offset: number,
    ordering: string,
    search: string = ''
  ): Observable<News[]> {
    const response = this.httpClient.get<News[]>(
      `${this.favoriteNewsApi}?offset=${offset}&ordering=${ordering}&search=${search}`
    )

    return response
  }
}
