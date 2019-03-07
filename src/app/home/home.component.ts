import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numbersObsSubscription: Subscription;
  customObsSubscription: Subscription;

  constructor() {}
  ngOnDestroy(): void {
    this.numbersObsSubscription.unsubscribe();
    this.customObsSubscription.unsubscribe();
  }
  ngOnInit() {
    const myNumbers = interval(1000).pipe(
      map((data: number) => {
        return data * data;
      })
    );
    this.numbersObsSubscription = myNumbers.subscribe((num: number) => {
      console.log(num);
    });

    const myObservervable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);
      setTimeout(() => {
        observer.next('second package');
      }, 4000);
      setTimeout(() => {
        // observer.error('third package does not work');
      }, 5000);
      setTimeout(() => {
        observer.next('third package works now');
      }, 6000);
      setTimeout(() => {
        observer.complete();
      }, 7000);
      setTimeout(() => {
        observer.next('fourth package');
      }, 8000);
    });

    this.customObsSubscription = myObservervable.subscribe(
      (data: string) => {
        console.log(data);
      },
      (error: string) => {
        console.log(error);
      },
      () => {
        console.log('completed');
      }
    );
  }
}
