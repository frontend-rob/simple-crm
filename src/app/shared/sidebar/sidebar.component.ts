import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    imports: [
        RouterLink,
        CommonModule
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {

    theme: string | undefined;

    /**
     * initializes the component and sets the theme based on saved or preferred settings.
     * @param router router service for navigation and URL checks.
     */
    constructor(private router: Router) {
        this.initializeTheme();
    }

    /**
     * initializes the theme by checking saved settings or preferred system settings.
     */
    initializeTheme(): void {
        this.theme = this.getSavedTheme() || this.getPreferredTheme();
    }

    /**
     * retrieves the saved theme from local storage.
     * @returns the saved theme as a string, or null if not set.
     */
    getSavedTheme(): string | null {
        return localStorage.getItem('theme');
    }

    /**
     * determines the preferred theme based on the system's color scheme.
     * @returns 'dark' if the system prefers a dark theme, otherwise 'light'.
     */
    getPreferredTheme(): string {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    /**
     * toggles the theme between light and dark modes, updates the DOM, and saves the new theme.
     */
    toggleTheme(): void {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        this.updateThemeColor(newTheme);
        this.theme = newTheme;
        localStorage.setItem('theme', newTheme);
    }

    /**
     * updates the theme color meta tag in the document head.
     * @param theme the current theme ('light' or 'dark').
     */
    updateThemeColor(theme: string): void {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        const themeColor = theme === 'dark' ? '#1c1c1f' : '#ffffff';
        metaThemeColor?.setAttribute('content', themeColor);
    }
    
    /**
     * checks if the given URL is active based on exact matching.
     * @param url the URL to check.
     * @returns true if the URL is active, otherwise false.
     */
    isActive(url: string): boolean {
        return this.router.isActive(url, {
            paths: 'exact',
            queryParams: 'ignored',
            matrixParams: 'ignored',
            fragment: 'ignored'
        });
    }

    /**
     * checks if the current URL starts with the given URL.
     * @param url the URL to check.
     * @returns true if the current URL starts with the given URL, otherwise false.
     */
    isActiveStartsWith(url: string): boolean {
        return this.router.url.startsWith(url);
    }

}
