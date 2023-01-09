import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UDTStreamComponent } from './udt-stream.component';

describe('UDTStreamComponent', () => {
  let component: UDTStreamComponent;
  let fixture: ComponentFixture<UDTStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UDTStreamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UDTStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
