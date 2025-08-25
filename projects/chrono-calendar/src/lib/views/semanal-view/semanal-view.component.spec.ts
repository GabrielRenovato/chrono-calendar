import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanalViewComponent } from './semanal-view.component';

describe('SemanalViewComponent', () => {
  let component: SemanalViewComponent;
  let fixture: ComponentFixture<SemanalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemanalViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemanalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
