import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCashierComponent } from './update-cashier.component';

describe('UpdateCashierComponent', () => {
  let component: UpdateCashierComponent;
  let fixture: ComponentFixture<UpdateCashierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCashierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCashierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
