import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesFilterModalComponent } from './categories-filter-modal.component';

describe('CategoriesFilterModalComponent', () => {
  let component: CategoriesFilterModalComponent;
  let fixture: ComponentFixture<CategoriesFilterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesFilterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
