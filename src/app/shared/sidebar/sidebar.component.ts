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

    constructor(private router: Router) {
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
        const themeColor = theme === 'dark' ? '#0f0f0f' : '#f8f8f8';
        metaThemeColor?.setAttribute('content', themeColor);
    }
    
    isActive(url: string): boolean {
        return this.router.isActive(url, {
            paths: 'exact',
            queryParams: 'ignored',
            matrixParams: 'ignored',
            fragment: 'ignored'
        });
    }
}