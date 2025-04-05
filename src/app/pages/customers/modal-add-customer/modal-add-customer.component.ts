import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../../models/customers.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';

@Component({
    selector: 'app-modal-add-customer',
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './modal-add-customer.component.html',
    styleUrl: './modal-add-customer.component.scss'
})

export class ModalAddCustomerComponent implements OnInit {

    customer = new Customer();

    private firestore: Firestore = inject(Firestore);

    ngOnInit(): void { }

    closeAddCustomerModal() {
        const modal = document.querySelector('app-modal-add-customer') as HTMLElement;
        modal.classList.add('hidden');
    }

    addCustomer() {
        const customersCollection = collection(this.firestore, 'customers');
        addDoc(customersCollection, this.customer.toJSON())
        .then((result: any) => {
            // console.log('Customer added successfully', result);
        })
        
        this.closeAddCustomerModal();
        // console.log(this.customer);
        this.resetAddCustomerForm();
    }

    resetAddCustomerForm() {
        this.customer = new Customer();
    }
}
