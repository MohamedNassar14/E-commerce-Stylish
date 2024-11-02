import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SneakersComponent } from './sneakers.component';

describe('SneakersComponent', () => {
  let component: SneakersComponent;
  let fixture: ComponentFixture<SneakersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SneakersComponent]
    });
    fixture = TestBed.createComponent(SneakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
