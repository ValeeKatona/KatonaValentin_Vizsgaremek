import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1',
      'Manhattan',
      'In centre of New York.',
      'https://www.otptravel.hu/userfiles/USA/NYC-csoportos/NYC-Manhattan-2.jpg',
      149.99,
      new Date('2022-01-01'),
      new Date('2023-12-31')
    ),
    new Place(
      'p2',
      'California',
      'Romantic place.',
      'https://www.artnews.com/wp-content/uploads/2022/03/LA-sunrise-small.jpg?w=1000',
      149.99,
      new Date('2022-01-01'),
      new Date('2023-12-31')
    ),
    new Place(
      'p3',
      'Paris',
      'Beautiful city',
      'https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900',
      99.99,
      new Date('2022-01-01'),
      new Date('2023-12-31')
    )
  ];

  get places() {
    // eslint-disable-next-line no-underscore-dangle
    return [...this._places];
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor() { }

  getPlace(id: string) {
    // eslint-disable-next-line no-underscore-dangle
    return {...this._places.find(p => p.id === id)};
  }
}
