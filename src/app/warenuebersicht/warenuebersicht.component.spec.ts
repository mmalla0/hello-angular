import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarenuebersichtComponent } from './warenuebersicht.component';

describe('WarenuebersichtComponent', () => {
  let component: WarenuebersichtComponent;
  let fixture: ComponentFixture<WarenuebersichtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarenuebersichtComponent]
    });
    fixture = TestBed.createComponent(WarenuebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
