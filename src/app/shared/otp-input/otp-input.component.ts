import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Timer } from "../timer/timer";

@Component({
  selector: 'app-otp-input',
  imports: [FormsModule, Timer],
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.css']
})
export class OtpInputComponent implements OnChanges {
  @Input() length = 6;
  @Input() label = 'Verification code';
  @Input() submitButtonText = 'Submit OTP';

  @Output() otpChange = new EventEmitter<string>();
  @Output() otpSubmit = new EventEmitter<string>();

  @ViewChildren('otpInput') private otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  otpDigits = this.createEmptyOtp();

  get isOtpComplete() {
    return this.otpDigits.every((digit) => /^\d$/.test(digit));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['length']) {
      this.otpDigits = this.createEmptyOtp();
      this.emitOtpChange();
    }
  }

  onOtpInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const digit = input.value.replace(/\D/g, '').slice(-1);

    this.otpDigits[index] = digit;
    input.value = digit;
    this.emitOtpChange();

    if (digit && index < this.otpDigits.length - 1) {
      this.focusOtpInput(index + 1);
    }
  }

  onOtpKeydown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
      this.focusOtpInput(index - 1);
    }
  }

  onOtpPaste(event: ClipboardEvent) {
    event.preventDefault();

    const pastedOtp = event.clipboardData?.getData('text').replace(/\D/g, '').slice(0, this.length) ?? '';
    this.otpDigits = this.createEmptyOtp();

    pastedOtp.split('').forEach((digit, index) => {
      this.otpDigits[index] = digit;
    });

    this.emitOtpChange();

    const nextIndex = Math.min(pastedOtp.length, this.otpDigits.length - 1);
    this.focusOtpInput(nextIndex);
  }

  submitOtp() {
    if (!this.isOtpComplete) {
      return;
    }

    this.otpSubmit.emit(this.otpDigits.join(''));
  }

  private createEmptyOtp() {
    return Array.from({ length: this.length }, () => '');
  }

  private emitOtpChange() {
    this.otpChange.emit(this.otpDigits.join(''));
  }

  private focusOtpInput(index: number) {
    this.otpInputs.get(index)?.nativeElement.focus();
  }
}
