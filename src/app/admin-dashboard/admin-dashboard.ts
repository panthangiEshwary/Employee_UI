import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface EmployeeAvailability {
  name: string;
  email: string;
  department: string;
  month: string; // yyyy-MM
  workingDays: number;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit {

  departments = ['VEDC', 'GUSS', 'EMSS'];

  // 🔹 Filters
  selectedDepartment = '';
  selectedMonth = '';
  selectedYear = '';

  months = [
    { value: '01', label: 'Jan' },
    { value: '02', label: 'Feb' },
    { value: '03', label: 'Mar' },
    { value: '04', label: 'Apr' },
    { value: '05', label: 'May' },
    { value: '06', label: 'Jun' },
    { value: '07', label: 'Jul' },
    { value: '08', label: 'Aug' },
    { value: '09', label: 'Sep' },
    { value: '10', label: 'Oct' },
    { value: '11', label: 'Nov' },
    { value: '12', label: 'Dec' }
  ];

  years: number[] = [];

  employees: EmployeeAvailability[] = [];

  // 🔹 Edit state (NO auto-save)
  editingEmployee: EmployeeAvailability | null = null;

  editModel = {
    department: '',
    workingDays: 0
  };

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    const saved = localStorage.getItem('employeeAvailabilityList');
    this.employees = saved ? JSON.parse(saved) : [];
    this.extractYears();
  }

  extractYears() {
    this.years = Array.from(
      new Set(this.employees.map(e => Number(e.month.split('-')[0])))
    );
  }

  filteredEmployees() {
    return this.employees.filter(emp => {
      const [year, month] = emp.month.split('-');

      return (
        (!this.selectedDepartment || emp.department === this.selectedDepartment) &&
        (!this.selectedMonth || month === this.selectedMonth) &&
        (!this.selectedYear || year === this.selectedYear)
      );
    });
  }

  /* ===== Helpers ===== */

  getMonthName(month: string): string {
    const [, m] = month.split('-');
    const date = new Date(2000, Number(m) - 1);
    return date.toLocaleString('default', { month: 'short' });
  }

  getYear(month: string): string {
    return month.split('-')[0];
  }

  getDaysInMonth(month: string): number {
    const [year, m] = month.split('-').map(Number);
    return new Date(year, m, 0).getDate();
  }

  availabilityPercent(emp: EmployeeAvailability): number {
    const total = this.getDaysInMonth(emp.month);
    return Math.round((emp.workingDays / total) * 100);
  }

  /* ===== Actions ===== */

  editEmployee(emp: EmployeeAvailability) {
    this.editingEmployee = emp;
    this.editModel = {
      department: emp.department,
      workingDays: emp.workingDays
    };
  }

  saveEmployee() {
    if (!this.editingEmployee) return;

    const maxDays = this.getDaysInMonth(this.editingEmployee.month);

    if (
      this.editModel.workingDays < 1 ||
      this.editModel.workingDays > maxDays
    ) {
      alert(`Working days must be between 1 and ${maxDays}`);
      return;
    }

    this.editingEmployee.department = this.editModel.department;
    this.editingEmployee.workingDays = this.editModel.workingDays;

    localStorage.setItem(
      'employeeAvailabilityList',
      JSON.stringify(this.employees)
    );

    this.editingEmployee = null;
    alert('Saved successfully');
  }

  cancelEdit() {
    this.editingEmployee = null;
  }

  deleteEmployee(index: number) {
    if (!confirm('Delete this entry?')) return;

    this.employees.splice(index, 1);
    localStorage.setItem(
      'employeeAvailabilityList',
      JSON.stringify(this.employees)
    );
    this.extractYears();
  }

  logout() {
    localStorage.removeItem('isAdmin');
    window.location.href = '/login';
  }
}
