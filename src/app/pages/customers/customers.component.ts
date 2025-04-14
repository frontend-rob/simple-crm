import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { ModalAddCustomerComponent } from './modal-add-customer/modal-add-customer.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Customer } from '../../models/customers.class';

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

    /**
     * initializes the component, fetches customer data from Firestore, and sorts it by last name.
     */
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

    /**
     * opens the modal for adding a new customer.
     */
    openAddCustomerModal() {
        const modal = document.querySelector('app-modal-add-customer') as HTMLElement;
        modal.classList.remove('hidden');
    }

    /**
     * sorts the customer list by the specified field and direction.
     * @param field the field to sort by.
     * @param direction the direction of sorting ('asc' or 'desc').
     */
    private sortCustomers(field: string, direction: 'asc' | 'desc') {
        this.allCustomers.sort((a: Customer, z: Customer) => {
            const aVal = a[field]?.toLowerCase?.() || '';
            const zVal = z[field]?.toLowerCase?.() || '';
            return direction === 'asc'
                ? aVal.localeCompare(zVal)
                : zVal.localeCompare(aVal);
        });
    }

    /**
     * toggles sorting by the specified field and updates the sort direction.
     * @param field the field to sort by.
     */
    sortBy(field: string) {
        if (this.sortField === field) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortField = field;
            this.sortDirection = 'asc';
        }

        this.sortCustomers(this.sortField, this.sortDirection);
    }

    /**
     * toggles the visibility of the search bar and focuses it if shown.
     */
    showSearchBar() {
        const searchBar = document.getElementById('search-bar') as HTMLInputElement;
        const wasHidden = searchBar.classList.contains('hidden');
        searchBar.classList.toggle('hidden');

        if (wasHidden) {
            setTimeout(() => searchBar.focus(), 0);
        }
    }

    /**
     * filters the customer list based on the search term entered in the search bar.
     * @param event the input event containing the search term.
     */
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
