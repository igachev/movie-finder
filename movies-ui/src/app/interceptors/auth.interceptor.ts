import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { catchError, EMPTY, switchMap, take } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService)
  const router = inject(Router)
  
 return userService.userSubject.pipe(
    take(1),
    switchMap((userData) => {

      if(userData.token !== "") {
        const modifiedRequest = req.clone({
          headers: req.headers.set("Authorization",`Bearer ${userData.token}`)
        })
        return next(modifiedRequest).pipe(
          catchError((err: any) => {
            console.log(err)
            if(err.status === 401) {
              userService.logout()
              router.navigate(['users/login'])
              return EMPTY
            }
            else {
              return EMPTY
            }
          })
        )
      }

      else {
        return next(req);
      }

    })
  )
  
};
