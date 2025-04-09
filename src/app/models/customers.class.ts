export class Customer {
    [key: string]: any;
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    address: string;
    zipCode: number;
    city: string;
    country: string;
    createdOn: string;

    constructor(object?: any) {
        this.id = object ? object.id : undefined;
        this.firstName = object ? object.firstName : '';
        this.lastName = object ? object.lastName : '';
        this.email = object ? object.email : '';
        this.phone = object ? object.phone : '';
        this.address = object ? object.address : '';
        this.zipCode = object ? object.zipCode : '';
        this.city = object ? object.city : '';
        this.country = object ? object.country : '';
        this.createdOn = object ? object.createdOn : '';
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            address: this.address,
            zipCode: this.zipCode,
            city: this.city,
            country: this.country,
        }
    }
}