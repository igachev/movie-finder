import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
 userService = inject(UserService)
 isLoggedIn: boolean = false;
 isAdmin: boolean = false;

 ngOnInit(): void {
  this.userService.$userSubjectObservable.subscribe({
    next: (res) => {
      if(res.token !== "") {
        this.isLoggedIn = true
        this.isAdmin = res.email === "admin@abv.bg" ? true : false;
      }
      else {
        this.isLoggedIn = false
        this.isAdmin = false
      }
    }
  })   
 }

 logout() {
  this.userService.logout()
 }

}
