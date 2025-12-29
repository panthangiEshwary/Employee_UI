import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-dashboard.html',
  styleUrls: ['./employee-dashboard.css']
})
export class EmployeeDashboardComponent implements OnInit {

 user: any = {};

  departments = ['VEDC', 'GUSS', 'EMSS'];
  selectedDepartment = '';

  months = [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 }
  ];

  years: number[] = [];
  selectedMonth: number | '' = '';
  selectedYear: number | '' = '';

  daysInMonth = 0;
  workingDays = 0;
  showError = false;

ngOnInit() {
  this.generateYears();
}

generateYears() {
  const currentYear = new Date().getFullYear();

  this.years = Array.from(
    { length: 11 },
    (_, i) => currentYear - 5 + i
  );
}

  onMonthOrYearChange() {
    if (this.selectedMonth && this.selectedYear) {
      this.daysInMonth = new Date(
        this.selectedYear,
        this.selectedMonth,
        0
      ).getDate();
      this.workingDays = 0;
      this.showError = false;
    }
  }

  validateWorkingDays() {
    if (this.workingDays > this.daysInMonth) {
      this.showError = true;
      this.workingDays = this.daysInMonth;
    } else {
      this.showError = false;
    }
  }

  isFormValid() {
    return (
      this.selectedDepartment &&
      this.selectedMonth &&
      this.selectedYear &&
      this.workingDays > 0 &&
      this.workingDays <= this.daysInMonth
    );
  }

  submit() {
    const monthKey = `${this.selectedYear}-${String(this.selectedMonth).padStart(2,'0')}`;

    const list = JSON.parse(localStorage.getItem('employeeAvailabilityList') || '[]');

    const existing = list.find(
      (e: any) => e.email === this.user.email && e.month === monthKey
    );

    if (existing) {
      existing.department = this.selectedDepartment;
      existing.workingDays = this.workingDays;
    } else {
      list.push({
        name: this.user.name,
        email: this.user.email,
        department: this.selectedDepartment,
        month: monthKey,
        workingDays: this.workingDays
      });
    }

    localStorage.setItem('employeeAvailabilityList', JSON.stringify(list));
    alert('Availability submitted successfully');
  }

  logout() {
    window.location.href = '/login';
  }
}