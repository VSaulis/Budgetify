import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsSmallTableComponent } from './operations-small-table.component';

describe('OperationsSmallTableComponent', () => {
  let component: OperationsSmallTableComponent;
  let fixture: ComponentFixture<OperationsSmallTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationsSmallTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsSmallTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
