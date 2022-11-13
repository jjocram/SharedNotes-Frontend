import { Component } from '@angular/core';
import {TokenStorageService} from "./_services/token-storage.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SharedNotesFrontend';
  isLoggedIn: boolean = false;
  subscription: Subscription;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService) {
    this.subscription = this.tokenStorageService.isLoggedIn$.subscribe(loggedIn => this.isLoggedIn = loggedIn)
  }



  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken()
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }


}
