import { Component, Input, inject } from '@angular/core';
import { Firestore, doc, deleteDoc } from '@angular/fire/firestore';
import { Customer } from '../../../models/customers.class';

@Component({
    selector: 'app-edit-menu',
    imports: [],
    templateUrl: './edit-menu.component.html',
    styleUrl: './edit-menu.component.scss'
})

export class EditMenuComponent {

    @Input() customerID: string = '';
    customerData!: Customer;
    firestore: Firestore = inject(Firestore);

    /**
     * deletes the customer from the Firestore database.
     * logs success or error messages based on the operation result.
     */
    deleteCustomer() {
        if (this.customerID) {
            const customerDoc = doc(this.firestore, `customers/${this.customerID}`);
            deleteDoc(customerDoc).then(() => {
                console.log('Customer deleted successfully');
                this.toggleEditMenu();
            }).catch((error: Error) => {
                console.error('Error deleting customer:', error);
            });
        } else {
            console.error('No customer ID provided for deletion');
        }
    }

    /**
     * toggles the visibility of the edit menu.
     */
    toggleEditMenu() {
        const menuElement = document.querySelector('app-edit-menu') as HTMLElement;
        menuElement.classList.toggle('hidden');
    }

    /**
     * opens the modal for editing customer details.
     */
    openEditCustomerModal() {
        const editModal = document.querySelector('app-modal-edit-customer') as HTMLElement;
        editModal.classList.remove('hidden');
    }

}
