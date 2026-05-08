import { AfterViewInit, Component, ElementRef, HostListener, model, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-childplayarea',
  templateUrl: './childplayarea.component.html',
  standalone: true,
  styleUrl: './childplayarea.component.css',
  imports: [FormsModule, CommonModule]
})
export class ChildplayareaComponent implements OnInit, AfterViewInit {
  numberOne = signal(3);
  numberTwo = signal(2);
  answerField = model('');
  @ViewChild('answerInput') answerInput!: ElementRef<HTMLInputElement>;
  stars = [1, 2, 3];
  score = signal(0);

  showQuiz = signal(true);
  showFirework = signal(false);

  ngOnInit(): void {
    this.setRandomDigits();
  }

  ngAfterViewInit(): void {
    this.setAutoFoucus();
  }

  setRandomDigits() {
    this.numberOne.set(Math.floor(Math.random() * 10));
    this.numberTwo.set(Math.floor(Math.random() * 10));
  }

  setAutoFoucus() {
    this.answerInput.nativeElement.focus();
  }

  onAnswerInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const answer = parseFloat(input.value);
    const expectedAnswer = this.numberOne() + this.numberTwo();

    if (answer === expectedAnswer) {
      this.score.update(score => score + 1);
      if (this.score() === 3) {
        this.showQuiz.set(false);
        this.showFirework.set(true);

        setTimeout(() => {
          const cheerSound = new Audio('sounds/claps.mp3');
          cheerSound.play();
          this.launchFireworks();
        }, 10);
      }
    }
  }

  @HostListener('document:keydown.space', ['$event'])
  handleSpace(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    this.onSpacePress();
  }

  onSpacePress() {
    this.answerField.set('');
    this.setRandomDigits();
    this.setAutoFoucus();
  }

  launchFireworks() {
    const duration = 2000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        angle: this.randomInRange(55, 125),
        spread: this.randomInRange(50, 70),
        particleCount: this.randomInRange(50, 100),
        origin: { y: 0.6 }
      });
    }, 250);
  }

  randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
