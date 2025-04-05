export class Customer {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    zipCode: number
    city: string;
    country: string;

    constructor(object?: any) {
        this.firstName = object ? object.firstName: '';
        this.lastName = object ? object.lastName: '';
        this.email = object ? object.email: '';
        this.address = object ? object.address: '';
        this.zipCode = object ? object.zipCode: '';
        this.city = object ? object.city: '';
        this.country = object ? object.country: '';
    }
}