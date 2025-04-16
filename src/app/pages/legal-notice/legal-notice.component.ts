import { Component } from '@angular/core';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-legal-notice',
    imports: [
        RouterLink,
        ToolbarComponent
    ],
    templateUrl: './legal-notice.component.html',
    styleUrls: [
        './legal-notice.component.scss',
        '../../shared/toolbar/toolbar.component.scss',
        '../../../styles/_article.scss',
    ]
})

export class LegalNoticeComponent {

}
