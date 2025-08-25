import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChronoCalendarComponent } from './ngx-simple-calendar.component';

describe('NgxSimpleCalendarComponent', () => {
  let component: ChronoCalendarComponent;
  let fixture: ComponentFixture<ChronoCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChronoCalendarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChronoCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
