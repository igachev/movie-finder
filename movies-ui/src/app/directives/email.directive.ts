import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { emailValidator } from '../validators/email.validator';

@Directive({
  selector: '[appEmail]',
  providers: [
    {provide: NG_VALIDATORS,useExisting: EmailDirective,multi: true}
  ]
})
export class EmailDirective implements Validator {

  emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    return emailValidator(this.emailRegex)(control);
  }
  

}
