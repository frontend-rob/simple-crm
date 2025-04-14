import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

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

    /**
     * lifecycle hook that runs after the component is initialized.
     * Initializes the theme for the application.
     */
    ngOnInit(): void {
        this.initializeTheme();
    }

    /**
     * initializes the theme by checking saved settings or preferred system settings.
     */
    initializeTheme(): void {
        this.theme = this.getSavedTheme() || this.getPreferredTheme();
        this.applyTheme(this.theme);
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
     * applies the specified theme to the application by updating the DOM.
     * @param theme the theme to apply ('light' or 'dark').
     */
    applyTheme(theme: string): void {
        document.documentElement.setAttribute('data-theme', theme);
    }

}
