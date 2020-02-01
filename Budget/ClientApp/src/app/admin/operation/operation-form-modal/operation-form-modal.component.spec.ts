import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationFormModalComponent } from './operation-form-modal.component';

describe('OperationFormModalComponent', () => {
  let component: OperationFormModalComponent;
  let fixture: ComponentFixture<OperationFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
