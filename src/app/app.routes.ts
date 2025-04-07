import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { CustomerDetailsComponent } from './pages/customers/customer-details/customer-details.component';
import { LegalNoticeComponent } from './pages/legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';


export const routes: Routes = [
    {
        path: '',
        title: 'Simple CRM',
        component: LandingPageComponent
    },
    {
        path: 'dashboard',
        title: 'Dashboard',
        component: DashboardComponent
    },
    {
        path: 'customers',
        title: 'Customers',
        component: CustomersComponent
    },
    {
        path: 'customers/:id',
        title: 'Customer Details',
        component: CustomerDetailsComponent
    },
    {
        path: 'legal-notice',
        title: 'Legal Notice',
        component: LegalNoticeComponent
    },
    {
        path: 'privacy-policy',
        title: 'Privacy Policy',
        component: PrivacyPolicyComponent
    },
];
