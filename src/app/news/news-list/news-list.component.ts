import { Component, OnInit } from '@angular/core';
import { News, OrderingEnum } from '../news';
import { NewsService } from '../news.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  displayedColumns = ['title', 'summary', 'published_at', 'symbol'];

  newsList: News[] = []

  search = '';
  newsLength = 0
  offset = 0
  ordering: OrderingEnum = OrderingEnum.DESC

  constructor(private newsServices: NewsService) {}

  getNewsFromService(offset: number, ordering: OrderingEnum, search: string) {
    this.newsServices.getNews(offset, ordering, search)
      .subscribe((data) => {
        this.newsList = data.results
        this.newsLength = data.count

        if (offset != this.offset) this.offset = offset
        if (ordering != this.ordering) this.ordering = ordering
        if (search != this.search) this.search = search
      });
  }

  ngOnInit(): void {
    this.getNewsFromService(this.offset, this.ordering, this.search)
  }

  handlePageEvent({ pageIndex, pageSize }: PageEvent) {
    const newOffSet = pageIndex * pageSize

    this.getNewsFromService(newOffSet, this.ordering, this.search)
  }

  handleOrderEvent() {
    const newOrdering = this.ordering === OrderingEnum.ASC ? OrderingEnum.DESC : OrderingEnum.ASC

    this.getNewsFromService(this.offset, newOrdering, this.search)
  }

  handleSearchEvent() {
    this.getNewsFromService(this.offset, this.ordering, this.search)
  }

  addNewsToFavorite({ id, title, summary, published_at }: News) {
    this.newsServices.addNewsToFavorite({ id, title, summary, published_at })
      .subscribe(() => {})
  }
}
