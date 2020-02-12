import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationBoxComponent } from './operation-box.component';

describe('OperationBoxComponent', () => {
  let component: OperationBoxComponent;
  let fixture: ComponentFixture<OperationBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
