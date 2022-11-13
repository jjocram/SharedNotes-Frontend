import { Component, OnInit } from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  errorMessage = '';
  showSpinner = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.showSpinner = true;
    const {username, password} = this.form;
     this.authService.register(username, password).subscribe({
       next: data => {
         // successful registration
         console.log(data);
         this.showSpinner = false;
         this.router.navigate(['login']);
       },
       error: err => {
         this.showSpinner = false;
         this.errorMessage = err.error.errorMessage;
       }
     })
  }

}
