import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { ModalAddCustomerComponent } from './modal-add-customer/modal-add-customer.component';
import { Customer } from '../../models/customers.class';

@Component({
    selector: 'app-customers',
    imports: [
        CommonModule,
        SidebarComponent,
        ToolbarComponent,
        ModalAddCustomerComponent
    ],
    templateUrl: './customers.component.html',
    styleUrls: [
        './customers.component.scss',
        '../../shared/sidebar/sidebar.component.scss',
        '../../shared/toolbar/toolbar.component.scss',

    ]
})

export class CustomersComponent implements OnInit {

    customer = new Customer();

    ngOnInit(): void { }

    openAddCustomerModal() {
        const modal = document.querySelector('app-modal-add-customer') as HTMLElement;
        modal.classList.remove('hidden');
    }

}
