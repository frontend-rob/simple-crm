import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSimpleCardComponent } from './dashboard-simple-card.component';

describe('DashboardSimpleCardComponent', () => {
    let component: DashboardSimpleCardComponent;
    let fixture: ComponentFixture<DashboardSimpleCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DashboardSimpleCardComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DashboardSimpleCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
