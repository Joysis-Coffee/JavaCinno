import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueeingComponent } from './queeing.component';

describe('QueeingComponent', () => {
  let component: QueeingComponent;
  let fixture: ComponentFixture<QueeingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueeingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QueeingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


