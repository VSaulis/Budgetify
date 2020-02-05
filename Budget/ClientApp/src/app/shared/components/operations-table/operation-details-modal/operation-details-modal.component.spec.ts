import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationDetailsModalComponent } from './operation-details-modal.component';

describe('OperationDetailsModalComponent', () => {
  let component: OperationDetailsModalComponent;
  let fixture: ComponentFixture<OperationDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
