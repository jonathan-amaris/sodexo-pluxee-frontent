import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GetNewsResponse, News } from './news';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private httpClient:HttpClient) { }

  getNews(): Observable<GetNewsResponse> {
    const response = this.httpClient.get<GetNewsResponse>("https://api.spaceflightnewsapi.net/v4/articles/")

    return response
  }
}
