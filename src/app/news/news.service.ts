import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GetNewsResponse, News } from './news';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  uri: string = `https://api.spaceflightnewsapi.net/v4/articles/?limit=10`

  constructor(private httpClient:HttpClient) { }

  getNews(
    offset: number,
    ordering: string,
    search: string = ''
  ): Observable<GetNewsResponse> {
    const getNewsUri = `${this.uri}&offset=${offset}&ordering=${ordering}&search=${search}`

    const response = this.httpClient.get<GetNewsResponse>(getNewsUri)

    return response
  }
}
