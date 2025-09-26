import { AbstractControl, FormControl } from '@angular/forms';
import { EmailDirective } from './email.directive';

describe('EmailDirective', () => {

  test("should have 'emailRegex' property",async() => {
    const emailDirective = new EmailDirective();
    expect(emailDirective.emailRegex).toBeDefined()
  })

  test("'emailRegex' property should be of type RegExp",async() => {
    const emailDirective = new EmailDirective();
    expect(emailDirective.emailRegex).toBeInstanceOf(RegExp)
  })

  test("should have 'validate' property",async() => {
    const emailDirective = new EmailDirective();
    expect(emailDirective.validate).toBeDefined()
  })

   test("should have 'validate' property of type Function",async() => {
    const emailDirective = new EmailDirective();
    expect(emailDirective.validate).toBeInstanceOf(Function)
  })

    test("should return { invalidEmail: {invalid: true} } object when the email format is invalid",async() => {
    const emailDirective = new EmailDirective();
    const mockAbstractControl: AbstractControl = new FormControl("ivo@")
    const emailNotValid = emailDirective.validate(mockAbstractControl)
    expect(emailNotValid).toEqual({ invalidEmail: {invalid: true} })
  })

    test("should return null when the email format is valid",async() => {
    const emailDirective = new EmailDirective();
    const mockAbstractControl: AbstractControl = new FormControl("ivo@abv.bg")
    const validEmail = emailDirective.validate(mockAbstractControl)
    expect(validEmail).toBe(null)
  })

});
