import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistogramConfigComponent } from './histogram-config.component';

describe('HistogramConfigComponent', () => {
  let component: HistogramConfigComponent;
  let fixture: ComponentFixture<HistogramConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistogramConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistogramConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
