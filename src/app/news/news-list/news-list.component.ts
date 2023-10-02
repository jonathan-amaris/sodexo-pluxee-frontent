import { Component, OnInit } from '@angular/core';
import { News, OrderingEnum } from '../news';
import { NewsService } from '../news.service';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  displayedColumns = ['title', 'summary', 'published_at', 'symbol'];

  error: Boolean = false
  newsList: News[] = []

  search = '';
  newsLength = 0
  offset = 0
  ordering: OrderingEnum = OrderingEnum.DESC

  constructor(
    private newsServices: NewsService,
    private snackbar: MatSnackBar
  ) {}

  getNewsFromService(offset: number, ordering: OrderingEnum, search: string) {
    this.newsServices.getNews(offset, ordering, search)
      .subscribe({
        next: (data) => {
          this.newsList = data.results
          this.newsLength = data.count

          if (offset != this.offset) this.offset = offset
          if (ordering != this.ordering) this.ordering = ordering
        },
        error: () => {
          this.error = true
        }
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
      .subscribe({
        next: () => {
          this.snackbar.open('Agregado como favoritos.', "", {
            duration: 1000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          })
        },
        error: () => {
          this.snackbar.open('Error, la noticia ya ha sido agregada.', "", {
            duration: 1000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          })
        },
      })
  }
}
