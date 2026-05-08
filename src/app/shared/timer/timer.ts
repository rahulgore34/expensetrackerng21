import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.html',
  styleUrl: './timer.css',
})
export class Timer implements OnInit, OnDestroy {
  timeLeft = signal(300); // 5 minutes = 300 sec
  interval: any;
  displayTime = computed(() => {
    const time = this.timeLeft();
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });
  isExpired = signal(false);

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft() > 0) {
        this.timeLeft.set(this.timeLeft() - 1);
      } else {
        this.clearTimer();
        this.isExpired.set(true);
      }
    }, 1000);
  }

  clearTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
