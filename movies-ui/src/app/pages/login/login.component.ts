import { Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { UserLoginRequest } from '../../types/UserTypes';
import { LoadingSpinnerComponent } from "../../components/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, LoadingSpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  userService = inject(UserService)
  router = inject(Router)
  errors: WritableSignal<string[]> = signal([])
  loginSubscription!: Subscription

  onLogin(loginForm: NgForm) {
    const {email,password} = loginForm.value
    const userLoginRequest: UserLoginRequest = {email,password}
    this.loginSubscription = this.userService.login(userLoginRequest).subscribe({
      next: (res) => {
         localStorage.setItem("userData",JSON.stringify(res))
         this.userService.userSubject.next(res)
         this.router.navigate(['movies'])
      },
      error: (err) => {
      let errorList: string[] = []
      errorList.push(err.error)
      this.errors.set(errorList)
      }
    })
  }

  ngOnDestroy(): void {
      this.loginSubscription?.unsubscribe()
  }

}
