export class Address {
    firstName: string
    lastName: string
    address1: string
    address2: string
    city: string
    state: string
    zip: string
    country: string
  
    constructor (
      firstName: string,
      lastName: string,
      address1: string,
      address2: string,
      city: string,
      state: string,
      zip: string,
      country: string
    ) {
      this.firstName = firstName
      this.lastName = lastName
      this.address1 = address1
      this.address2 = address2
      this.city = city
      this.state = state
      this.zip = zip
      this.country = country
    }
}
