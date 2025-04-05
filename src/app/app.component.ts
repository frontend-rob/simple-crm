import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import { Firestore, collection, collectionData } from '@angular/fire/firestore';


@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        RouterOutlet,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})

export class AppComponent {

    theme: string | undefined;

    // firestore: Firestore = inject(Firestore);

    ngOnInit(): void {
        this.initializeTheme();
    }

    initializeTheme(): void {
        this.theme = this.getSavedTheme() || this.getPreferredTheme();
        this.applyTheme(this.theme);
    }

    getSavedTheme(): string | null {
        return localStorage.getItem('theme');
    }

    getPreferredTheme(): string {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    applyTheme(theme: string): void {
        document.documentElement.setAttribute('data-theme', theme);
    }
}
