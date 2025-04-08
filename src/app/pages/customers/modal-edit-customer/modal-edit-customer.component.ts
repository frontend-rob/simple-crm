import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Customer } from '../../../models/customers.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, doc, updateDoc } from '@angular/fire/firestore';

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

    @Input() updateCustomer!: Customer;
    firestore: Firestore = inject(Firestore);
    currentTab: number = 1;

    closeEditCustomerModal() {
        const modal = document.querySelector('app-modal-edit-customer') as HTMLElement;
        modal.classList.add('hidden');
        this.currentTab = 1;
    }

    saveUpdatedCustomerData() {
        if (this.updateCustomer.id) {
            const customerDocRef = doc(this.firestore, 'customers', this.updateCustomer.id);
            updateDoc(customerDocRef, this.updateCustomer.toJSON())
                .then(() => this.closeEditCustomerModal())
                .catch(error => console.error('Error updating customer:', error));
        } else {
            console.error('Error: Customer ID is undefined.');
        }
    }
}
