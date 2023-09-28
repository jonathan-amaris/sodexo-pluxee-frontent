import { Component, OnInit } from '@angular/core';
import { News } from '../news';
import { NewsService } from '../news.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  newsList: News[] = []

  search = '';
  newsLength: number = 0
  offset: number = 0
  ordering: string = '-published_at'

  constructor(private newsServices: NewsService) {}


  ngOnInit(): void {
    this.newsServices.getNews(this.offset, this.ordering, this.search)
      .subscribe((data) => {
        this.newsList = data.results
        this.newsLength = data.count
      });
  }

  addNewsToFavorite(id: number) {
    console.log({ id })
  }

  handlePageEvent({ pageIndex, pageSize }: PageEvent) {
    const newOffSet = pageIndex * pageSize

    this.newsServices.getNews(newOffSet, this.ordering, this.search)
      .subscribe((data) => {
        this.newsList = data.results
        this.offset = newOffSet
      });
  }

  handleOrderEvent() {
    const newOrdering = this.ordering === 'published_at' ? '-published_at' : 'published_at'

    this.newsServices.getNews(this.offset, newOrdering, this.search)
      .subscribe((data) => {
        this.newsList = data.results
        this.ordering = newOrdering
      });
  }

  handleSearchEvent() {
    this.newsServices.getNews(this.offset, this.ordering, this.search)
      .subscribe((data) => {
        this.newsList = data.results
        this.newsLength = data.count
      });
  }
}
