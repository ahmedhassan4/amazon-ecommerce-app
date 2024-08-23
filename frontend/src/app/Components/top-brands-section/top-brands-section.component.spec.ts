import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBrandsSectionComponent } from './top-brands-section.component';

describe('TopBrandsSectionComponent', () => {
  let component: TopBrandsSectionComponent;
  let fixture: ComponentFixture<TopBrandsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBrandsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBrandsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
