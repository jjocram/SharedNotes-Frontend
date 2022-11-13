import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  showSpinner = false;
  errorMessage = '';
  @Output() sender = new EventEmitter();

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['profile']);
    }
  }

  onSubmit(): void {
    this.showSpinner = true;
    const {username, password} = this.form;
    this.authService.login(username, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.access_token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.tokenStorage.isLoggedIn = true;
        this.showSpinner = false;
        this.router.navigate(['profile']);
      },
      error: err => {
        this.errorMessage = err.error.errorMessage;
        this.isLoginFailed = true;
        this.showSpinner = false;
      }
    })
  }

}
