import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-toolbar',
    imports: [RouterLink],
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

    /**
     * toggles the visibility of the sidebar menu.
     */
    toggleSidebarMenu() {
        const menu = document.querySelector('app-sidebar') as HTMLElement;
        menu.classList.toggle('visible');
    }
}
