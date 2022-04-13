import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Booking } from './booking.model';
import { delay, take, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class BookingService {
    private _bookings = new BehaviorSubject<Booking[]>([]);

    get bookings() {
        // eslint-disable-next-line no-underscore-dangle
        return this._bookings.asObservable();
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    constructor(private authService: AuthService) {}

    addBooking(
      placeId: string,
      placeTitle: string,
      placeImage: string,
      firstName: string,
      lastName: string,
      guestNumber: number,
      dateFrom: Date,
      dateTo: Date
      ) {
      const newBooking = new Booking(
        Math.random().toString(),
        placeId,
        this.authService.userId,
        placeTitle,
        placeImage,
        firstName,
        lastName,
        guestNumber,
        dateFrom,
        dateTo
      );
       return this.bookings.pipe(
         take(1),
         delay(1000),
         tap(bookings => {
        // eslint-disable-next-line no-underscore-dangle
        this._bookings.next(bookings.concat(newBooking));
      })
    );
  }

    cancelBooking(bookingId: string) {
        return this.bookings.pipe(
          take(1),
          delay(1000),
          tap(bookings => {
        // eslint-disable-next-line no-underscore-dangle
        this._bookings.next(bookings.filter(b => b.id !== bookingId));
      })
    );
    }
}
