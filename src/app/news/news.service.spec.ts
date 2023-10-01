import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { NewsService } from './news.service';
import { OrderingEnum } from './news';

describe('NewsService', () => {
  let service: NewsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(NewsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should called getNews using StubValue', () => {
    const stubValue = {
      count: 2,
      next: null,
      previous: null,
      results: [
        {
            id: 21018,
            title: "NASA to extend New Horizons mission through late 2020s",
            summary: "NASA has agreed to extend operations of its New Horizons spacecraft through late this decade to support “multidisciplinary” science that could include another Kuiper Belt object flyby.",
            published_at: "2023-09-29T22:39:23Z",
        },
        {
            'id': 21017,
            'title': "ESA Calls for Small Moon Mission Ideas",
            'summary': "A call for proposals from the European Space Agency is asking European industry to submit ideas for “small lunar missions.” The call was published as a component of the agency’s Terrae Novae exploration programme, which seeks to establish a sustained European presence in low Earth orbit, send the first European astronaut to the Moon by […]",
            'published_at': "2023-09-29T19:47:13Z",
        }
      ]
    }

    const getNews = jasmine.createSpy('service.getNews').and.returnValue(stubValue)

    expect(getNews(0, OrderingEnum.ASC, '')).toBe(stubValue)
  })

  it('Should called addNewsToFavorite', () => {
    const stubValue = {
      id: 21018,
      title: "NASA to extend New Horizons mission through late 2020s",
      summary: "NASA has agreed to extend operations of its New Horizons spacecraft through late this decade to support “multidisciplinary” science that could include another Kuiper Belt object flyby.",
      published_at: "2023-09-29T22:39:23Z",
    }

    service.addNewsToFavorite(stubValue).subscribe((data) => {
      expect(data).toBe(stubValue)
    })

    const request = httpMock.expectOne(service.favoriteNewsApi);

    expect(request.request.method).toBe('POST');
  })

  it('Should called removeNewsFromFavorites', () => {
    const stubValue = {
      id: 21018,
      title: "NASA to extend New Horizons mission through late 2020s",
      summary: "NASA has agreed to extend operations of its New Horizons spacecraft through late this decade to support “multidisciplinary” science that could include another Kuiper Belt object flyby.",
      published_at: "2023-09-29T22:39:23Z",
    }

    service.removeNewsFromFavorites(21018).subscribe((id) => {
      expect(id).toBe(stubValue)
    })

    const request = httpMock.expectOne(`${service.favoriteNewsApi}/${21018}`);

    expect(request.request.method).toBe('DELETE');
  })
});
