import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegisterRequest, UserRegisterResponse } from '../types/UserTypes';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSubject = new BehaviorSubject<UserRegisterResponse>({ email:'',token:'',username:'' })
  $userSubjectObservable!: Observable<UserRegisterResponse>

  constructor(
    private http: HttpClient,
    
  ) { 
    this.$userSubjectObservable = this.userSubject.asObservable()
  }

  register(userRegisterRequest: UserRegisterRequest): Observable<UserRegisterResponse> {
    return this.http.post<UserRegisterResponse>("http://localhost:5174/users/register",userRegisterRequest)
  }

  autoLogin() {
    let localStorageData = localStorage.getItem("userData")
    if(localStorageData !== null) {
      let userData: UserRegisterResponse = JSON.parse(localStorage.getItem("userData") as string)
      this.userSubject.next(userData)
    }
  }

}
