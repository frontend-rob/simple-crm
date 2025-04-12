import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-dashboard-table-card',
    imports: [
        CommonModule
    ],
    templateUrl: './dashboard-table-card.component.html',
    styleUrl: './dashboard-table-card.component.scss'
})

export class DashboardTableCardComponent implements OnInit {

    @Input() title: string = '';
    @Input() key: string = '';
    @Input() data: { [key: string]: any }[] = [];
    @Input() icon: string = '';

    sanitizedIcon: SafeHtml = '';

    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.sanitizedIcon = this.sanitizer.bypassSecurityTrustHtml(this.icon);
    }
}
