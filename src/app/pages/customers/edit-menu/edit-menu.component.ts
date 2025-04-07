import { Component, Input, inject } from '@angular/core';
import { Firestore, doc, deleteDoc } from '@angular/fire/firestore';

@Component({
    selector: 'app-edit-menu',
    imports: [],
    templateUrl: './edit-menu.component.html',
    styleUrl: './edit-menu.component.scss'
})

export class EditMenuComponent {

    @Input() customerID: string = '';

    firestore: Firestore = inject(Firestore);

    editPersonData() { }

    editAddressData() { }

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

    toggleEditMenu() {
        const menuElement = document.querySelector('app-edit-menu') as HTMLElement;
        menuElement.classList.toggle('hidden');

    }
}
