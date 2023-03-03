import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rs232Component } from './rs232.component';

describe('Rs232Component', () => {
  let component: Rs232Component;
  let fixture: ComponentFixture<Rs232Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Rs232Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rs232Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
