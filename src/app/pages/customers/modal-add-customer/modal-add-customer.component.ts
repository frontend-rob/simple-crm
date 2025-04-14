import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../../models/customers.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
    selector: 'app-modal-add-customer',
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './modal-add-customer.component.html',
    styleUrl: './modal-add-customer.component.scss'
})

export class ModalAddCustomerComponent {

    currentTab: number = 1;
    customer = new Customer();
    firestore: Firestore = inject(Firestore);
    avatarList: string[] = [];

    /**
     * initializes the component and populates the avatar list.
     */
    constructor() {
        this.avatarList = Array.from({ length: 6 }, (_, i) => `av-${i + 1}`);
    }

    /**
     * closes the add customer modal and resets the form.
     */
    closeAddCustomerModal() {
        const modal = document.querySelector('app-modal-add-customer') as HTMLElement;
        modal.classList.add('hidden');
        this.currentTab = 1;
        this.customer.avatar = '';
    }

    /**
     * adds a new customer to the Firestore database.
     * resets the form and closes the modal upon successful addition.
     */
    addCustomer() {
        const customersCollection = collection(this.firestore, 'customers');
        const customerData = {
            ...this.customer.toJSON(),
            avatar: this.customer.avatar,
            createdOn: new Date().toISOString().split('T')[0]
        };
        addDoc(customersCollection, customerData)
        .then((result: any) => {
            console.log('Customer added successfully', result);
        });
        
        this.closeAddCustomerModal();
        this.resetAddCustomerForm();
        this.currentTab = 1;
        console.log(this.customer);
    }

    /**
     * resets the add customer form to its initial state.
     */
    resetAddCustomerForm() {
        this.customer = new Customer();
        this.currentTab = 1;
        this.customer.avatar = '';
    }

}
