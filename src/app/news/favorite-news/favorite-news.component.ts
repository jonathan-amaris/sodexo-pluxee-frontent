import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NewsService } from '../news.service';
import { News, OrderingEnum } from '../news';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorite-news',
  templateUrl: './favorite-news.component.html',
  styleUrls: ['./favorite-news.component.css']
})
export class FavoriteNewsComponent {
  displayedColumns = ['title', 'summary', 'published_at', 'symbol'];

  error: Boolean = false
  newsList: News[] = []

  search = '';
  newsLength = 0
  offset = 0
  ordering = OrderingEnum.DESC

  constructor(
    private newsServices: NewsService,
    private snackbar: MatSnackBar
  ) {}

  getFavoriteNewsFromService(offset: number, ordering: OrderingEnum, search: string) {
    this.newsServices.getFavoriteNews(offset, ordering, search)
      .subscribe({
        next: (data) => {
          this.newsList = data
          this.newsLength = data?.length
  
          if (offset != this.offset) this.offset = offset
          if (ordering != this.ordering) this.ordering = ordering
        },
        error: () => {
          this.error = true;
        }
      });
  }

  ngOnInit(): void {
    this.getFavoriteNewsFromService(this.offset, this.ordering, this.search)
  }

  handlePageEvent({ pageIndex, pageSize }: PageEvent) {
    const newOffSet = pageIndex * pageSize

    this.getFavoriteNewsFromService(newOffSet, this.ordering, this.search)
  }

  handleOrderEvent() {
    const newOrdering = this.ordering === OrderingEnum.ASC ? OrderingEnum.DESC : OrderingEnum.ASC

    this.getFavoriteNewsFromService(this.offset, newOrdering, this.search)
  }

  handleSearchEvent() {
    this.getFavoriteNewsFromService(this.offset, this.ordering, this.search)
  }

  removeNewsFromFavorites(id: number) {
    this.newsServices.removeNewsFromFavorites(id)
      .subscribe(() => {
        this.newsList = this.newsList.filter((news) => news.id !== id)

        this.snackbar.open('Removed from Favorites', "", {
          duration: 1000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        })
      })
  }
}
