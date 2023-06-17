import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitarbeiterDashboardComponent } from './mitarbeiter-dashboard.component';

describe('MitarbeiterDashboardComponent', () => {
  let component: MitarbeiterDashboardComponent;
  let fixture: ComponentFixture<MitarbeiterDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MitarbeiterDashboardComponent]
    });
    fixture = TestBed.createComponent(MitarbeiterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
