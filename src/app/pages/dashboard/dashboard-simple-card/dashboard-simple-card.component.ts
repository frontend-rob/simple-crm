import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-dashboard-simple-card',
    imports: [],
    templateUrl: './dashboard-simple-card.component.html',
    styleUrl: './dashboard-simple-card.component.scss'
})
export class DashboardSimpleCardComponent {

    @Input() title: string = '';
    @Input() value: number | string = '';
    @Input() icon: string = '';

    sanitizedIcon: SafeHtml = '';

    /**
     * initializes the component and sanitizes the provided icon HTML.
     * @param sanitizer service to sanitize HTML content for safe rendering.
     */
    constructor(private sanitizer: DomSanitizer) { }

    /**
     * lifecycle hook that runs after the component is initialized.
     * sanitizes the icon input to ensure safe rendering in the template.
     */
    ngOnInit() {
        this.sanitizedIcon = this.sanitizer.bypassSecurityTrustHtml(this.icon);
    }

}
