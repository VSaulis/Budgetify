import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsFilterModalComponent } from './operations-filter-modal.component';

describe('OperationsFilterModalComponent', () => {
  let component: OperationsFilterModalComponent;
  let fixture: ComponentFixture<OperationsFilterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationsFilterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
