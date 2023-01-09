import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTypeConversionComponent } from './data-type-conversion.component';

describe('DataTypeConversionComponent', () => {
  let component: DataTypeConversionComponent;
  let fixture: ComponentFixture<DataTypeConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTypeConversionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTypeConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
