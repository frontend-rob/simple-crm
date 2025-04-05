export class Customer {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    zipCode: number;
    city: string;
    country: string;

    constructor(object?: any) {
        this.id = object ? object.id : undefined;
        this.firstName = object ? object.firstName : '';
        this.lastName = object ? object.lastName : '';
        this.email = object ? object.email : '';
        this.address = object ? object.address : '';
        this.zipCode = object ? object.zipCode : '';
        this.city = object ? object.city : '';
        this.country = object ? object.country : '';
    }

    public toJSON() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            address: this.address,
            zipCode: this.zipCode,
            city: this.city,
            country: this.country,
        }
    }
}