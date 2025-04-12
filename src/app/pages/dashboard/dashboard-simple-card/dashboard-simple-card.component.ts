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

    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.sanitizedIcon = this.sanitizer.bypassSecurityTrustHtml(this.icon);
    }

}
