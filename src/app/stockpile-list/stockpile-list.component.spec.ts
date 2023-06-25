import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockpileListComponent } from './stockpile-list.component';

describe('StockpileListComponent', () => {
  let component: StockpileListComponent;
  let fixture: ComponentFixture<StockpileListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockpileListComponent]
    });
    fixture = TestBed.createComponent(StockpileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
