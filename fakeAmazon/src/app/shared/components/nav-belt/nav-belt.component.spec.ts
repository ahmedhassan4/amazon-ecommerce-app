import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBeltComponent } from './nav-belt.component';

describe('NavBeltComponent', () => {
  let component: NavBeltComponent;
  let fixture: ComponentFixture<NavBeltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBeltComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBeltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
