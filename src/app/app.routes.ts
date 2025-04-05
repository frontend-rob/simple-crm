import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { LegalNoticeComponent } from './pages/legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { LoginComponent } from './pages/login/login.component';


export const routes: Routes = [
    {
        path: '',
        title: 'Simple CRM',
        component: LoginComponent
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
