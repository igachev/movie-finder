import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function movieTitleValidator(): ValidatorFn {
    const forbiddenSymbols = /[@!}{\/#$%^&*()=<>]/;
    return (control: AbstractControl): ValidationErrors | null => {
        const isTitleInvalid = forbiddenSymbols.test(control.value)
        return isTitleInvalid ? { invalidTitle: { invalid: true } } : null
    }
}