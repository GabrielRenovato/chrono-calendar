import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensalViewComponent } from './mensal-view.component';

describe('MensalViewComponent', () => {
  let component: MensalViewComponent;
  let fixture: ComponentFixture<MensalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensalViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
