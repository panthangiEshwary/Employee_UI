import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private router: Router) {}

  onLogin() {
    if (!this.username || !this.password) {
      alert('Please enter username/email and password');
      return;
    }
  }

  // FORGOT PASSWORD LOGIC
  forgotPassword() {
    const email = prompt('Enter your registered email');
    if (!email) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.email === email);

    if (userIndex === -1) {
      alert('Email not found. Please register first.');
      return;
    }

    const newPassword = prompt('Enter new password');
    if (!newPassword) return;

    const confirmPassword = prompt('Confirm new password');
    if (!confirmPassword) return;

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));

    alert('Password updated successfully. Please login.');
  }

  // BACK BUTTON
  goBack() {
    this.router.navigate(['/']);
  }
}