import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineEditCellComponent } from './inline-edit-cell.component';

describe('InlineEditCellComponent', () => {
  let component: InlineEditCellComponent;
  let fixture: ComponentFixture<InlineEditCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineEditCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineEditCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
