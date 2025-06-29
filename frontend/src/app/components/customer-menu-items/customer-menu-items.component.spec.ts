import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMenuItemsComponent } from './customer-menu-items.component';

describe('CustomerMenuItemsComponent', () => {
  let component: CustomerMenuItemsComponent;
  let fixture: ComponentFixture<CustomerMenuItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerMenuItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
