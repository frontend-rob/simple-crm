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

    constructor() {
        this.avatarList = Array.from({ length: 6 }, (_, i) => `av-${i + 1}`);
    }

    closeAddCustomerModal() {
        const modal = document.querySelector('app-modal-add-customer') as HTMLElement;
        modal.classList.add('hidden');
        this.currentTab = 1;
        this.customer.avatar = '';
    }

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

    resetAddCustomerForm() {
        this.customer = new Customer();
        this.currentTab = 1;
        this.customer.avatar = '';
    }
}
