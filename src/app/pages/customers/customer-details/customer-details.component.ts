import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { ToolbarComponent } from '../../../shared/toolbar/toolbar.component';
import { ModalEditCustomerComponent } from '../modal-edit-customer/modal-edit-customer.component';
import { EditMenuComponent } from '../edit-menu/edit-menu.component';
import { Firestore, doc , onSnapshot } from '@angular/fire/firestore';
import { Customer } from '../../../models/customers.class';

@Component({
    selector: 'app-customer-details',
    imports: [
        CommonModule,
        RouterLink,
        SidebarComponent,
        ToolbarComponent,
        EditMenuComponent,
        ModalEditCustomerComponent
    ],
    templateUrl: './customer-details.component.html',
    styleUrls: [
        './customer-details.component.scss',
        '../../../shared/sidebar/sidebar.component.scss',
        '../../../shared/toolbar/toolbar.component.scss',
        '../edit-menu/edit-menu.component.scss',
    ]
})

export class CustomerDetailsComponent {

    customerID: string = '';
    customerData: Customer = new Customer();
    copiedCustomer: Customer = new Customer();
    firestore: Firestore = inject(Firestore);

    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.customerID = params['id'];
            this.getCustomerData(this.customerID);
            console.log(this.customerID);
        });
    }

    // getCustomerData(customerID: string) {
    //     const customerDoc = doc(this.firestore, `customers/${customerID}`);
    //     getDoc(customerDoc).then(docSnapshot => {
    //         if (docSnapshot.exists()) {
    //             this.handleCustomerData(docSnapshot.data());
    //         }
    //     }).catch((error: Error) => {
    //         console.error('Error fetching customer data:', error);
    //     });
    // }
    getCustomerData(customerID: string) {
        const customerDoc = doc(this.firestore, `customers/${customerID}`);

        onSnapshot(customerDoc, (docSnapshot) => {
            if (docSnapshot.exists()) {
                this.handleCustomerData(docSnapshot.data());
            }
        }, (error) => {
            console.error('Error fetching customer data:', error);
        });
    }

    handleCustomerData(data: any) {
        this.customerData = new Customer(data);
        this.customerData.id = this.customerID;
        console.log('Customer Data:', data);
    }

    toggleEditMenu() {
        const editMenu = document.querySelector('app-edit-menu') as HTMLElement;
        editMenu.classList.toggle('hidden');

        this.copiedCustomer = new Customer({ ...this.customerData });


        if (!editMenu.classList.contains('hidden')) {
            const closeMenu = (event: MouseEvent) => {
                if (!editMenu.contains(event.target as Node)) {
                    editMenu.classList.add('hidden');
                    document.removeEventListener('click', closeMenu);
                }
            };
            setTimeout(() => {
                document.addEventListener('click', closeMenu);
            });
        }
    }

    deleteCustomerFromDB() {
        const editMenu = document.querySelector('app-edit-menu') as any;
        if (editMenu && editMenu.deleteCustomer) {
            editMenu.customerID = this.customerID;
            editMenu.deleteCustomer();
        }
    }
}
