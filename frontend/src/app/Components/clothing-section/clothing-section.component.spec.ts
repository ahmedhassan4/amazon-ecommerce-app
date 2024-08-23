import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingSectionComponent } from './clothing-section.component';

describe('ClothingSectionComponent', () => {
  let component: ClothingSectionComponent;
  let fixture: ComponentFixture<ClothingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClothingSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClothingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
