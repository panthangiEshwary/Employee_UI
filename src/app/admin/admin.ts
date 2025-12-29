import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('isAdmin');
    this.router.navigate(['/']);
  }
}
