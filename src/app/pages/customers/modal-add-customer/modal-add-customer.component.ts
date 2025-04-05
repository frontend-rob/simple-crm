import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../../models/customers.class';
import { FormsModule } from '@angular/forms';

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

    ngOnInit(): void { }

    closeAddCustomerModal() {
        const modal = document.querySelector('app-modal-add-customer') as HTMLElement;
        modal.classList.add('hidden');
    }

    addCustomer() {
        this.closeAddCustomerModal();
        console.log(this.customer);
        this.resetAddCustomerForm();
    }

    resetAddCustomerForm() {
        this.customer = new Customer();
    }
}
