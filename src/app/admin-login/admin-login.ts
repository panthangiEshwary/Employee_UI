import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.css']
})
export class AdminLoginComponent {

  // Login fields
  username = '';
  password = '';
  error = '';

  // Forgot password modal fields
  showForgotModal = false;
  resetEmail = '';
  newPassword = '';
  confirmPassword = '';
  errorMsg = '';

  constructor(private router: Router) {}

  // ADMIN LOGIN (BACKEND WILL HANDLE VALIDATION)
  loginAsAdmin() {
    if (!this.username || !this.password) {
      this.error = 'Please enter username and password';
      return;
    }

    // 🔐 BACKEND API WILL GO HERE
    // authService.adminLogin(this.username, this.password)

    // TEMP navigation only (remove after backend integration)
    this.router.navigate(['/admin-dashboard']);
  }

  //  OPEN FORGOT PASSWORD MODAL
  forgotPassword() {
    this.showForgotModal = true;
    this.errorMsg = '';
  }

  //  RESET PASSWORD (BACKEND RESPONSIBILITY)
  resetPassword() {
    if (!this.resetEmail || !this.newPassword || !this.confirmPassword) {
      this.errorMsg = 'All fields are required';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMsg = 'Passwords do not match';
      return;
    }

    //  BACKEND API WILL GO HERE
    // authService.resetAdminPassword(this.resetEmail, this.newPassword)

    alert('Password reset request sent');
    this.closeModal();
  }

  //  CLOSE MODAL
  closeModal() {
    this.showForgotModal = false;
    this.resetEmail = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.errorMsg = '';
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
