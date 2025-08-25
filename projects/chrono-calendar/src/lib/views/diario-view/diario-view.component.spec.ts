import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioViewComponent } from './diario-view.component';

describe('DiarioViewComponent', () => {
  let component: DiarioViewComponent;
  let fixture: ComponentFixture<DiarioViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiarioViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiarioViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
