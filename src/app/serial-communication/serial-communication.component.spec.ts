import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialCommunicationComponent } from './serial-communication.component';

describe('SerialCommunicationComponent', () => {
  let component: SerialCommunicationComponent;
  let fixture: ComponentFixture<SerialCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerialCommunicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SerialCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
