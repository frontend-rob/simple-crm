import { Component } from '@angular/core';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';

@Component({
    selector: 'app-legal-notice',
    imports: [
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
