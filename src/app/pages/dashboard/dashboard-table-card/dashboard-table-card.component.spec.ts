import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTableCardComponent } from './dashboard-table-card.component';

describe('DashboardTableCardComponent', () => {
  let component: DashboardTableCardComponent;
  let fixture: ComponentFixture<DashboardTableCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTableCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
