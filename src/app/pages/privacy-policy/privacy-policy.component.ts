import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';

@Component({
    selector: 'app-privacy-policy',
    imports: [
        SidebarComponent,
        ToolbarComponent
    ],
    templateUrl: './privacy-policy.component.html',
    styleUrls: [
        './privacy-policy.component.scss',
        '../../shared/sidebar/sidebar.component.scss',
        '../../shared/toolbar/toolbar.component.scss',
    ]
})

export class PrivacyPolicyComponent {

}
