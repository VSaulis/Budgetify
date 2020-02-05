import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDetailsModalComponent } from './category-details-modal.component';

describe('CategoryDetailsModalComponent', () => {
  let component: CategoryDetailsModalComponent;
  let fixture: ComponentFixture<CategoryDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
