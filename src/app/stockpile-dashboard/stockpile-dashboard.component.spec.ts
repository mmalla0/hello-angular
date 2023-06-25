import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockpileDashboardComponent } from './stockpile-dashboard.component';

describe('StockpileDashboardComponent', () => {
  let component: StockpileDashboardComponent;
  let fixture: ComponentFixture<StockpileDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockpileDashboardComponent]
    });
    fixture = TestBed.createComponent(StockpileDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
