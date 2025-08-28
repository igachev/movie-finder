import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function emailValidator(emailRegex: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const isEmailValid = emailRegex.test(control.value)
       return !isEmailValid ? { invalidEmail: {invalid: true} } : null
    }
}