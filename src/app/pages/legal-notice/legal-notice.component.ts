import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';

@Component({
    selector: 'app-legal-notice',
    imports: [
        SidebarComponent,
        ToolbarComponent
    ],
    templateUrl: './legal-notice.component.html',
    styleUrls: [
        './legal-notice.component.scss',
        '../../shared/sidebar/sidebar.component.scss',
        '../../shared/toolbar/toolbar.component.scss',
    ]
})

export class LegalNoticeComponent {

}
