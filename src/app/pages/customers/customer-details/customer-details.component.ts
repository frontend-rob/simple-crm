import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { ToolbarComponent } from '../../../shared/toolbar/toolbar.component';
import { EditMenuComponent } from '../edit-menu/edit-menu.component';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Customer } from '../../../models/customers.class';

@Component({
    selector: 'app-customer-details',
    imports: [
        CommonModule,
        SidebarComponent,
        ToolbarComponent,
        EditMenuComponent
    ],
    templateUrl: './customer-details.component.html',
    styleUrls: [
        './customer-details.component.scss',
        '../../../shared/sidebar/sidebar.component.scss',
        '../../../shared/toolbar/toolbar.component.scss',
        '../edit-menu/edit-menu.component.scss',
    ]
})

export class CustomerDetailsComponent implements OnInit {

    customerID: string = '';

    customerData: Customer = new Customer();

    constructor(private route: ActivatedRoute, private firestore: Firestore = inject(Firestore)) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.customerID = params['id'];
            console.log(this.customerID);

            this.getCustomerData(this.customerID);
        });
    }

    getCustomerData(customerID: string) {
        const customerDoc = doc(this.firestore, `customers/${customerID}`);
        getDoc(customerDoc).then(docSnapshot => {
            if (docSnapshot.exists()) {
                this.handleCustomerData(docSnapshot.data());
            }
        }).catch((error: Error) => {
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

    }

}
