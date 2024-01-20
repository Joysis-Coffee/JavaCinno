import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeQuantityDialogComponent } from './size-quantity-dialog.component';

describe('SizeQuantityDialogComponent', () => {
  let component: SizeQuantityDialogComponent;
  let fixture: ComponentFixture<SizeQuantityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SizeQuantityDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SizeQuantityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
