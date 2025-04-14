import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-toolbar',
    imports: [RouterLink],
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

    toggleSidebarMenu() {
        const menu = document.querySelector('app-sidebar') as HTMLElement;
        menu.classList.toggle('visible');
    }
}
