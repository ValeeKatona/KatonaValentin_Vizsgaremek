import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places =  new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Manhattan',
      'In centre of New York.',
      'https://www.otptravel.hu/userfiles/USA/NYC-csoportos/NYC-Manhattan-2.jpg',
      149.99,
      new Date('2022-01-01'),
      new Date('2023-12-31'),
      'abc'
    ),
    new Place(
      'p2',
      'California',
      'Romantic place.',
      'https://www.artnews.com/wp-content/uploads/2022/03/LA-sunrise-small.jpg?w=1000',
      149.99,
      new Date('2022-01-01'),
      new Date('2023-12-31'),
      'abc'
    ),
    new Place(
      'p3',
      'Paris',
      'Beautiful city',
      'https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900',
      99.99,
      new Date('2022-01-01'),
      new Date('2023-12-31'),
      'abc'
    )
  ]);

  get places() {
    // eslint-disable-next-line no-underscore-dangle
    return this._places.asObservable();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private authService: AuthService) { }

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      // eslint-disable-next-line arrow-body-style
      map(places => {
      return { ...places.find(p => p.id === id )};
      })
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
    ) {
    const newPlace = new Place(
      Math.random().toString(),
    title,
    description,
    'https://www.otptravel.hu/userfiles/USA/NYC-csoportos/NYC-Manhattan-2.jpg',
    price,
    dateFrom,
    dateTo,
    this.authService.userId
    );

    this.places.pipe(take(1)).subscribe(places => {
    // eslint-disable-next-line no-underscore-dangle
      this._places.next(places.concat(newPlace));
    });
  }
}
