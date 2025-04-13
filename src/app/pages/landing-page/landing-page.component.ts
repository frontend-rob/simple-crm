import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-landing-page',
    imports: [
        CommonModule,
        RouterLink
    ],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss'
})

export class LandingPageComponent {

    theme: string | undefined;

    constructor() {
        this.initializeTheme();
    }

    initializeTheme(): void {
        this.theme = this.getSavedTheme() || this.getPreferredTheme();
    }

    getSavedTheme(): string | null {
        return localStorage.getItem('theme');
    }

    getPreferredTheme(): string {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    toggleTheme(): void {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        this.updateThemeColor(newTheme);
        this.theme = newTheme;
        localStorage.setItem('theme', newTheme);
    }

    updateThemeColor(theme: string): void {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        const themeColor = theme === 'dark' ? '#1c1c1f' : '#ffffff';
        metaThemeColor?.setAttribute('content', themeColor);
    }

}
