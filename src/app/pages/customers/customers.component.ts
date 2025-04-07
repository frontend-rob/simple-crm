import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { ModalAddCustomerComponent } from './modal-add-customer/modal-add-customer.component';
import { Customer } from '../../models/customers.class';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-customers',
    imports: [
        CommonModule,
        RouterLink,
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

export class CustomersComponent {

    customer = new Customer();
    allCustomers: Customer[] = [];
    firestore: Firestore = inject(Firestore);

    constructor() {
        const customersCollection = collection(this.firestore, 'customers');
        collectionData(customersCollection, { idField: 'id' })
        .subscribe((customers: any) => {
            this.allCustomers = customers;
            // console.log('Customers with IDs: ', customers);
        });
    }

    openAddCustomerModal() {
        const modal = document.querySelector('app-modal-add-customer') as HTMLElement;
        modal.classList.remove('hidden');
    }
}
