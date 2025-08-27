import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  const router = inject(Router)
  const isAdmin = userService.isAdmin();
  if(isAdmin) {
    return true;
  }
  else {
    router.navigate(['/movies'])
    return false;
  }
};
