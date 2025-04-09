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

    sortField: string = 'lastName';
    sortDirection: 'asc' | 'desc' = 'asc';
    searchTerm: string = '';
    customer = new Customer();
    allCustomers: Customer[] = [];
    allCustomersUnfiltered: Customer[] = [];
    firestore: Firestore = inject(Firestore);

    constructor() {
        const customersCollection = collection(this.firestore, 'customers');
        collectionData(customersCollection, { idField: 'id' })
            .subscribe((customers: any) => {
                const sorted = customers.sort((a: Customer, z: Customer) => {
                    const aVal = a.lastName?.toLowerCase?.() || '';
                    const zVal = z.lastName?.toLowerCase?.() || '';
                    return aVal.localeCompare(zVal);
                });
                this.allCustomersUnfiltered = sorted;
                this.allCustomers = [...sorted];
            });
    }

    openAddCustomerModal() {
        const modal = document.querySelector('app-modal-add-customer') as HTMLElement;
        modal.classList.remove('hidden');
    }

    private sortCustomers(field: string, direction: 'asc' | 'desc') {
        this.allCustomers.sort((a: Customer, z: Customer) => {
            const aVal = a[field]?.toLowerCase?.() || '';
            const zVal = z[field]?.toLowerCase?.() || '';
            return direction === 'asc'
                ? aVal.localeCompare(zVal)
                : zVal.localeCompare(aVal);
        });
    }

    sortBy(field: string) {
        if (this.sortField === field) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortField = field;
            this.sortDirection = 'asc';
        }

        this.sortCustomers(this.sortField, this.sortDirection);
    }

    showSearchBar() {
        const searchBar = document.getElementById('search-bar') as HTMLInputElement;
        const wasHidden = searchBar.classList.contains('hidden');
        searchBar.classList.toggle('hidden');

        if (wasHidden) {
            setTimeout(() => searchBar.focus(), 0);
        }
    }


    filterCustomers(event: Event) {
        const input = event.target as HTMLInputElement;
        this.searchTerm = input.value.toLowerCase();

        this.allCustomers = this.allCustomersUnfiltered.filter(customer => {
            return (
                customer.lastName?.toLowerCase().includes(this.searchTerm) ||
                customer.firstName?.toLowerCase().includes(this.searchTerm) ||
                customer.country?.toLowerCase().includes(this.searchTerm) ||
                customer.city?.toLowerCase().includes(this.searchTerm) ||
                customer.email?.toLowerCase().includes(this.searchTerm)
            );
        });
    }

}
