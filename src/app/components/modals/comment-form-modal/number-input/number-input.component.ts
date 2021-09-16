import { Component, Input, Output, EventEmitter, forwardRef  } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true
    }
  ]
})
export class NumberInputComponent implements ControlValueAccessor {
  @Input()  
  _number!: number;

  get number() {
    return this._number;
  }
  set number(val) {
    this._number = val;
    this.propagateChange(this._number);
  }

  @Output() 
  numberChange = new EventEmitter<number>();

  constructor() { }

  inc() { 
    if (this.number === 10) return
    this.number++
  }
  dec() {
    if (this.number === 0) return
    this.number--
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.number = value;
    }
  }
  propagateChange = (_: any) => {};
  registerOnChange(fn: (_: any) => {}) {
    this.propagateChange = fn;
  }
  registerOnTouched() {}
}
