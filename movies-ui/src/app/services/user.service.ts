import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginRequest, UserLoginResponse, UserRegisterRequest, UserRegisterResponse } from '../types/UserTypes';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSubject = new BehaviorSubject<UserRegisterResponse>({ email:'',token:'',username:'' })
  $userSubjectObservable!: Observable<UserRegisterResponse>

  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    this.$userSubjectObservable = this.userSubject.asObservable()
  }

  register(userRegisterRequest: UserRegisterRequest): Observable<UserRegisterResponse> {
    return this.http.post<UserRegisterResponse>("http://localhost:5174/users/register",userRegisterRequest)
  }

  login(userLoginRequest: UserLoginRequest): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>("http://localhost:5174/users/register",userLoginRequest)
  }

  autoLogin() {
    let localStorageData = localStorage.getItem("userData")
    if(localStorageData !== null) {
      let userData: UserRegisterResponse = JSON.parse(localStorage.getItem("userData") as string)
      this.userSubject.next(userData)
    }
  }

  logout() {
    let localStorageData = localStorage.getItem("userData")
    if(localStorageData !== null) {
      this.userSubject.next({email: "", username:"", token:""})
      localStorage.removeItem("userData")
      this.router.navigate(['/'])
    }
  }

}
