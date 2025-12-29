import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  firstName = '';
  lastName = '';
  fullName = '';

  constructor(private router: Router) {}

  updateFullName() {
    this.fullName = `${this.firstName} ${this.lastName}`.trim();
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
