import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClockService } from './clock.service';

@Component({
  selector: 'app-clock',
  templateUrl: './app-clock.component.html',
  styleUrls: ['./app-clock.component.scss'],
})
export class AppClockComponent implements OnInit, OnDestroy {
  time!: Date;
  subscription!: Subscription;
  show24hrs: boolean = false;
  setTime = new FormControl('');

  constructor(private clockService: ClockService) {
    // this.setTime.valueChanges.subscribe((val) => console.log('hi', val));
  }

  ngOnInit(): void {
    this.subscription = this.clockService
      .getClock()
      .subscribe((time) => (this.time = time));
  }

  getHour() {
    return this.time ? (this.time.getHours() % 12 || 12) * 30 : null;
  }

  getMinute() {
    return this.time ? this.time.getMinutes() * 6 : null;
  }

  getSecond() {
    return this.time ? this.time.getSeconds() * 6 : null;
  }

  setOwnTime() {
    setInterval(() => this.setNewClock(), 1000);
  }

  setNewClock() {
    this.subscription.unsubscribe();
    let startDate = new Date();
    let diff = new Date().getTime() - startDate.getTime();
    const newDateFromService = this.clockService.setClock(this.setTime.value);
    newDateFromService.setMilliseconds(
      newDateFromService.getMilliseconds() + diff
    );
    this.time = newDateFromService;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
