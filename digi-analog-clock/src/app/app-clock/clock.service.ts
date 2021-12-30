import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClockService {
  private clock: Observable<Date>;

  constructor() {
    this.clock = interval(1000).pipe(
      map((tick) => new Date()),
      share()
    );
  }

  getClock(): Observable<Date> {
    return this.clock;
  }

  setClock(customeTime: string): Date {
    const splitHourandMin = customeTime.split(':');
    const getHourAndMin = splitHourandMin.map((val: string) => parseInt(val));
    const setDate = new Date();
    setDate.setHours(getHourAndMin[0]);
    setDate.setMinutes(getHourAndMin[1]);
    return setDate;
  }
}
