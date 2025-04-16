import { Component } from '@angular/core';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-privacy-policy',
    imports: [
        RouterLink,
        ToolbarComponent
    ],
    templateUrl: './privacy-policy.component.html',
    styleUrls: [
        './privacy-policy.component.scss',
        '../../shared/toolbar/toolbar.component.scss',
        '../../../styles/_article.scss',
    ]
})

export class PrivacyPolicyComponent {

}
