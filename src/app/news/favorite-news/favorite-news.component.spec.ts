import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { FavoriteNewsComponent } from './favorite-news.component';
import { NewsService } from '../news.service';
import { OrderingEnum } from '../news';

describe('FavoriteNewsComponent', () => {
  let component: FavoriteNewsComponent;
  let fixture: ComponentFixture<FavoriteNewsComponent>;
  let newsService: NewsService;
  let newsServiceGetNewsSpy: jasmine.Spy;
  let newsServiceRemoveFromFavoritesSpy: jasmine.Spy;

  const stubValue = [
    {
      "id": 21021,
      "title": "Shutdown Averted, Government Funded Until November 17",
      "summary": "In a dizzying day of developments, the House and Senate approved a Continuing Resolution to keep the government funded at current FY2023 level until November 17, averting a shutdown at […]",
      "published_at": "2023-10-01T03:04:10Z"
    },
    {
      "id": 21020,
      "title": "NASA selects SpaceX for rideshare launch of smallsat mission",
      "summary": "NASA has selected SpaceX to launch a pair of smallsats to study space weather as part of a rideshare mission in 2025.",
      "published_at": "2023-09-30T21:49:09Z"
    },
    {
      "id": 21019,
      "title": "Shutdown Showdown Coming To a Head",
      "summary": "With only 12 hours remaining in FY2023, the question of whether the government will be fully open tomorrow remains up in the air.  Neither the House nor the Senate has […]",
      "published_at": "2023-09-30T16:00:38Z"
    },
    {
      "id": 21018,
      "title": "NASA to extend New Horizons mission through late 2020s",
      "summary": "NASA has agreed to extend operations of its New Horizons spacecraft through late this decade to support “multidisciplinary” science that could include another Kuiper Belt object flyby.",
      "published_at": "2023-09-29T22:39:23Z"
    },
    {
      "id": 21017,
      "title": "ESA Calls for Small Moon Mission Ideas",
      "summary": "A call for proposals from the European Space Agency is asking European industry to submit ideas for “small lunar missions.” The call was published as a component of the agency’s Terrae Novae exploration programme, which seeks to establish a sustained European presence in low Earth orbit, send the first European astronaut to the Moon by […]\nThe post ESA Calls for Small Moon Mission Ideas appeared first on European Spaceflight.",
      "published_at": "2023-09-29T19:47:13Z"
    },
    {
      "id": 21016,
      "title": "How Sierra Space Protects America’s Next Space Plane, Dream Chaser",
      "summary": "Dream Chaser, the so-called “mini shuttle”, is set to bring back the capability of returning experiments and equipment from the International Space Station (ISS) through Earth’s atmosphere for an eventual runway landing.",
      "published_at": "2023-09-29T18:58:06Z"
    },
    {
      "id": 21015,
      "title": "Space Development Agency funds demonstration of satellite laser links in ‘degraded’ environments",
      "summary": "The Space Development Agency awarded a $14.2 million contract to General Atomics to produce two optical communications terminals hosted on two small satellites for an in-space demonstration.",
      "published_at": "2023-09-29T18:46:03Z"
    },
    {
      "id": 21014,
      "title": "NASA's Perseverance Captures Dust-Filled Martian Whirlwind",
      "summary": "The six-wheeled geologist spotted the twister as part of an atmospheric exploration of Jezero Crater.",
      "published_at": "2023-09-29T16:08:00Z"
    },
    {
      "id": 21013,
      "title": "Ispace revises design of lunar lander for NASA CLPS mission",
      "summary": "The American subsidiary of Japanese company ispace has revised the design of a lunar lander it is providing for a NASA mission, pushing back the launch of that mission by a year.",
      "published_at": "2023-09-29T12:12:52Z"
    },
    {
      "id": 21012,
      "title": "European Commission Launches Targeted Consultation for EU Space Law",
      "summary": "The European Commission has launched a targeted stakeholder consultation for an EU Space Law that could be adopted in 2024. The creation of an EU Space Law (EUSL) was identified as a priority for the Commission during a 13 September State of the Union address from President Ursula von der Leyen. The legislative proposal envisages […]\nThe post European Commission Launches Targeted Consultation for EU Space Law appeared first on European Spaceflight.",
      "published_at": "2023-09-29T08:59:46Z"
    },
    {
      "id": 21011,
      "title": "China to attempt lunar far side sample return in 2024",
      "summary": "China will launch its Chang’e-6 lunar sample return mission next year in an attempt at a first-ever collection of material from the far side of the moon.",
      "published_at": "2023-09-29T08:45:43Z"
    }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatPaginatorModule,
        MatButtonModule,
        MatInputModule,
        NgIf,
        FormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatTableModule,
        BrowserAnimationsModule,
      ],
      declarations: [FavoriteNewsComponent]
    }).compileComponents;

    fixture = TestBed.createComponent(FavoriteNewsComponent);
    component = fixture.componentInstance;

    newsService = TestBed.inject(NewsService);
    newsServiceGetNewsSpy = spyOn(newsService, 'getFavoriteNews').and.returnValue(of(stubValue));
    newsServiceRemoveFromFavoritesSpy = spyOn(newsService, 'removeNewsFromFavorites').and.returnValue(of(stubValue[0]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should news: News[] has values onInit', () => {
    fixture.detectChanges();
    expect(newsServiceGetNewsSpy).toHaveBeenCalled();
  });

  it('Should called handleOrderEvent when OrderButton is pressed', () => {
    fixture.detectChanges();
    newsServiceGetNewsSpy.calls.reset();

    const button = fixture.debugElement.query(By.css('.btn-ordering-styles'));

    button.triggerEventHandler('click', null);

    expect(newsServiceGetNewsSpy).toHaveBeenCalled();
    expect(component.ordering).toBe(OrderingEnum.ASC);

    button.triggerEventHandler('click', null);

    expect(newsServiceGetNewsSpy).toHaveBeenCalled();
    expect(component.ordering).toBe(OrderingEnum.DESC);
  });

  it('Should called removeNewsFromFavorites when FavoritesButton is pressed', () => {
    fixture.detectChanges();
    newsServiceGetNewsSpy.calls.reset();

    const button = fixture.debugElement.query(By.css('button[matTooltip="Basic"]'));

    button.triggerEventHandler('click', null);

    expect(newsServiceRemoveFromFavoritesSpy).toHaveBeenCalled();
  });

  it('Should called handlePageEvent when next page button is press', () => {
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.mat-mdc-paginator-navigation-next'));

    button.triggerEventHandler('click', null);

    expect(newsServiceGetNewsSpy).toHaveBeenCalled()
    expect(component.offset).toBe(10);
  });

  it('Should called handleSearchEvent when InputButton was pressed and InputText was typed', () => {
    fixture.detectChanges();
    newsServiceGetNewsSpy.calls.reset();

    const input = fixture.nativeElement.querySelector('#search');
    const button = fixture.debugElement.query(By.css('#search-btn'));

    fixture.detectChanges();

    input.value = 'Nasa';

    input.dispatchEvent(new Event('input'));
    expect(component.search).toBe('Nasa');

    button.triggerEventHandler('click', null);
    expect(newsServiceGetNewsSpy).toHaveBeenCalled();
  });
});
