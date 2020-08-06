import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterDetailsComponent } from './scatter-details.component';

describe('ScatterDetailsComponent', () => {
  let component: ScatterDetailsComponent;
  let fixture: ComponentFixture<ScatterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScatterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
