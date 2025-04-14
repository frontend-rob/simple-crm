import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Customer } from '../../../models/customers.class';
import { FormsModule } from '@angular/forms';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
    selector: 'app-modal-edit-customer',
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './modal-edit-customer.component.html',
    styleUrls: ['./modal-edit-customer.component.scss']
})

export class ModalEditCustomerComponent {

    @Input() updateCustomerData!: Customer;
    editedCustomer!: Customer;
    firestore: Firestore = inject(Firestore);
    currentTab: number = 1;
    avatarList: string[] = [];

    /**
     * initializes the component and populates the avatar list.
     */
    constructor() {
        this.avatarList = Array.from({ length: 6 }, (_, i) => `av-${i + 1}`);
    }

    /**
     * lifecycle hook that runs when input properties change.
     * copies the input customer data to the editable customer object.
     */
    ngOnChanges() {
        if (this.updateCustomerData) {
            this.editedCustomer = new Customer({ ...this.updateCustomerData });
        }
    }

    /**
     * closes the edit customer modal and resets the tab index.
     */
    closeEditCustomerModal() {
        const modal = document.querySelector('app-modal-edit-customer') as HTMLElement;
        modal.classList.add('hidden');
        this.currentTab = 1;
    }

    /**
     * saves the updated customer data to the Firestore database.
     * closes the modal upon successful update or logs an error if the update fails.
     */
    saveUpdatedCustomerData() {
        if (this.updateCustomerData.id) {
            const customerDocRef = doc(this.firestore, 'customers', this.updateCustomerData.id);
            updateDoc(customerDocRef, this.updateCustomerData.toJSON())
                .then(() => this.closeEditCustomerModal())
                .catch(error => console.error('Error updating customer:', error));
        } else {
            console.error('Error: Customer ID is undefined.');
        }
    }

}
