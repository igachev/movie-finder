import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserRegisterRequest } from '../../types/UserTypes';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {

  userService = inject(UserService)
  router = inject(Router)
  registerSubscription!: Subscription
  errors: WritableSignal<string[]> = signal([])

onRegister(registerForm: NgForm) {
  const {username,email,password} = registerForm.value
  const userData: UserRegisterRequest = {username,email,password}
  this.registerSubscription = this.userService.register(userData).subscribe({
    next: (res) => {
      localStorage.setItem("userData",JSON.stringify(res))
      this.router.navigate(['movies'])
    },
    error: (err) => {
      let errorList: string[] = []
      for(let i = 0; i < err.error.length; i++) {
        errorList.push(err.error[i].description)
      }
      this.errors.set(errorList)
    }
  })
}

ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe()
}

}
