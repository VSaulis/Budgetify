import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsTableComponent } from './operations-table.component';

describe('OperationsTableComponent', () => {
  let component: OperationsTableComponent;
  let fixture: ComponentFixture<OperationsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
