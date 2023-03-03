import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayConversionComponent } from './array-conversion.component';

describe('ArrayConversionComponent', () => {
  let component: ArrayConversionComponent;
  let fixture: ComponentFixture<ArrayConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrayConversionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrayConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
