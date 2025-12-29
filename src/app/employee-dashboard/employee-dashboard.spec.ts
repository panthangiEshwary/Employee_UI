import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EmployeeDashboardComponent } from './employee-dashboard.component';

describe('EmployeeDashboardComponent', () => {
  let component: EmployeeDashboardComponent;
  let fixture: ComponentFixture<EmployeeDashboardComponent>;

  beforeEach(async () => {
    spyOn(localStorage, 'setItem');
    spyOn(window, 'alert');

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [EmployeeDashboardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should generate 12 month-year options', () => {
    expect(component.monthYears.length).toBe(12);
  });

  it('should set daysInMonth when month changes', () => {
    component.selectedMonth = component.monthYears[1].value;
    component.onMonthChange();
    expect(component.daysInMonth).toBeGreaterThan(27);
  });

  it('should prevent working days beyond month limit', () => {
    component.daysInMonth = 30;
    component.workingDays = 40;
    component.validateWorkingDays();
    expect(component.workingDays).toBe(30);
  });

  it('should save data on valid submit', () => {
    component.selectedDepartment = 'VEDC';
    component.selectedMonth = component.monthYears[0].value;
    component.daysInMonth = 31;
    component.workingDays = 20;

    component.submit();
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
