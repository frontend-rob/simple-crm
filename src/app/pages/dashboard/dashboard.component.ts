import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { DashboardSimpleCardComponent } from './dashboard-simple-card/dashboard-simple-card.component';
import { DashboardTableCardComponent } from './dashboard-table-card/dashboard-table-card.component';

@Component({
    selector: 'app-dashboard',
    imports: [
        CommonModule,
        SidebarComponent,
        ToolbarComponent,
        DashboardSimpleCardComponent,
        DashboardTableCardComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: [
        './dashboard.component.scss',
        './dashboard-simple-card/dashboard-simple-card.component.scss',
        './dashboard-table-card/dashboard-table-card.component.scss',
        '../../shared/sidebar/sidebar.component.scss',
        '../../shared/toolbar/toolbar.component.scss',
    ]
})

export class DashboardComponent {
    totalCustomers = 0;
    totalCountries = 0;
    monthlyRegistrations = 0;

    TOP_LIMIT = 3;
    topCountries: { country: string; count: number }[] = [];
    topCities: { city: string; count: number }[] = [];

    simpleDashboardCards = [
        {
            title: 'Total Customers',
            value: this.totalCustomers,
            icon: this.getCardIcons('users')
        },
        {
            title: 'Total Countries',
            value: this.totalCountries,
            icon: this.getCardIcons('map-pin')
        },
        {
            title: 'New This Month',
            value: this.monthlyRegistrations,
            icon: this.getCardIcons('calendar-arrow-up')
        }
    ];

    tableDashboardCards = [
        {
            title: `Top ${this.TOP_LIMIT} Countries`,
            key: 'country',
            data: this.getLoadingData(this.TOP_LIMIT, 'country'),
            icon: this.getCardIcons('list-ordered')
        },
        {
            title: `Top ${this.TOP_LIMIT} Cities`,
            key: 'city',
            data: this.getLoadingData(this.TOP_LIMIT, 'city'),
            icon: this.getCardIcons('list-ordered')
        }
    ];

    firestore: Firestore = inject(Firestore);

    constructor() {
        this.fetchCustomerData();
    }

    fetchCustomerData() {
        const customersCollection = collection(this.firestore, 'customers');
        collectionData(customersCollection)
            .subscribe((customers: any[]) => {
                this.getTotalCustomerNumber(customers);
                this.getTotalCountriesNumber(customers);
                this.getMonthlyRegistrations(customers);
                this.getTopCountries(customers);
                this.getTopCities(customers);
                this.updateDashboardCards();
            });
    }

    getTotalCustomerNumber(customers: any[]) {
        this.totalCustomers = customers.length;
    }

    getTotalCountriesNumber(customers: any[]) {
        const uniqueCountries = new Set(customers.map(customer => customer.country));
        this.totalCountries = uniqueCountries.size;
    }

    getMonthlyRegistrations(customers: any[]) {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        this.monthlyRegistrations = customers.filter(customer => {
            const createdOn = new Date(customer.createdOn);
            return createdOn.getMonth() === currentMonth && createdOn.getFullYear() === currentYear;
        }).length;
    }

    getTopItems(customers: any[], key: string) {
        const itemCounts = customers.reduce((counts: { [key: string]: number }, customer) => {
            counts[customer[key]] = (counts[customer[key]] || 0) + 1;
            return counts;
        }, {});

        return Object.entries(itemCounts)
            .map(([item, count]) => ({ item, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, this.TOP_LIMIT);
    }

    getTopCountries(customers: any[]) {
        this.topCountries = this.getTopItems(customers, 'country').map(({ item, count }) => ({
            country: item,
            count
        }));
    }

    getTopCities(customers: any[]) {
        this.topCities = this.getTopItems(customers, 'city').map(({ item, count }) => ({
            city: item,
            count
        }));
    }

    getLoadingData(limit: number, key: string) {
        return Array.from({ length: limit }, () => ({
            [key]: 'Loading...',
            count: 0
        }));
    }

    updateDashboardCards() {
        this.simpleDashboardCards[0].value = this.totalCustomers;
        this.simpleDashboardCards[1].value = this.totalCountries;
        this.simpleDashboardCards[2].value = this.monthlyRegistrations;
        this.tableDashboardCards[0].data = this.topCountries;
        this.tableDashboardCards[1].data = this.topCities;
    }

    getCardIcons(type: string) {
        const icons: { [key: string]: string } = {
            'users': `
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-users-round-icon lucide-users-round'>
                    <path d='M18 21a8 8 0 0 0-16 0' />
                    <circle cx='10' cy='8' r='5' />
                    <path d='M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3' />
                </svg>`,

            'map-pin': `
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-map-pin-icon lucide-map-pin'>
                    <path d='M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0' />
                    <circle cx='12' cy='10' r='3' />
                </svg>`,

            'calendar-arrow-up': `
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-calendar-arrow-up-icon lucide-calendar-arrow-up'>
                    <path d='m14 18 4-4 4 4' />
                    <path d='M16 2v4' />
                    <path d='M18 22v-8' />
                    <path d='M21 11.343V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9' />
                    <path d='M3 10h18' />
                    <path d='M8 2v4' />
                </svg>`,

            'list-ordered': `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-ordered-icon lucide-list-ordered">
                    <path d="M10 12h11" />
                    <path d="M10 18h11" />
                    <path d="M10 6h11" />
                    <path d="M4 10h2" />
                    <path d="M4 6h1v4" />
                    <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                </svg>`
        };
        return icons[type] || '';
    }

}