import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';

@Component({
    selector: 'app-dashboard',
    imports: [
        SidebarComponent,
        ToolbarComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: [
        './dashboard.component.scss',
        '../../shared/sidebar/sidebar.component.scss',
        '../../shared/toolbar/toolbar.component.scss',
        
    ]
})

export class DashboardComponent {

}
