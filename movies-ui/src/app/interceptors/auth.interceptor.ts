import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { switchMap, take } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService)
 return userService.userSubject.pipe(
    take(1),
    switchMap((userData) => {
      if(userData.token !== "") {
        const modifiedRequest = req.clone({
          headers: req.headers.set("Authorization",`Bearer ${userData.token}`)
        })
        return next(modifiedRequest)
      }
      else {
        return next(req);
      }
    })
  )
  
};
