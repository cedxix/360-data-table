import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitCellComponent } from './unit-cell.component';

describe('UnitCellComponent', () => {
  let component: UnitCellComponent;
  let fixture: ComponentFixture<UnitCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
