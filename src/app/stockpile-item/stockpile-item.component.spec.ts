import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockpileItemComponent } from './stockpile-item.component';

describe('StockpileItemComponent', () => {
  let component: StockpileItemComponent;
  let fixture: ComponentFixture<StockpileItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockpileItemComponent]
    });
    fixture = TestBed.createComponent(StockpileItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
