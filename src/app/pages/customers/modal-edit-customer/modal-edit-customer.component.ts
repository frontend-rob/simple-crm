import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Customer } from '../../../models/customers.class';
import { FormsModule } from '@angular/forms';

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
    @Input() customer: Customer = new Customer();

    currentTab: number = 1;

    closeEditCustomerModal() {
        const modal = document.querySelector('app-modal-edit-customer') as HTMLElement;
        modal.classList.add('hidden');
        this.currentTab = 1;
    }

    updateCustomerData() {
        console.log('Updated Customer Data:', this.customer);
        this.closeEditCustomerModal();
    }
}
