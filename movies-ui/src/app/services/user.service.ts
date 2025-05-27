import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegisterRequest, UserRegisterResponse } from '../types/UserTypes';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSubject = new BehaviorSubject<UserRegisterResponse>({ email:'',token:'',username:'' })
  

  constructor(
    private http: HttpClient,
    
  ) { }

  register(userRegisterRequest: UserRegisterRequest): Observable<UserRegisterResponse> {
    return this.http.post<UserRegisterResponse>("http://localhost:5174/users/register",userRegisterRequest)
  }

}
