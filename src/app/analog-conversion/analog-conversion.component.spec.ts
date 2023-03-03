import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalogConversionComponent } from './analog-conversion.component';

describe('AnalogConversionComponent', () => {
  let component: AnalogConversionComponent;
  let fixture: ComponentFixture<AnalogConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalogConversionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalogConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
