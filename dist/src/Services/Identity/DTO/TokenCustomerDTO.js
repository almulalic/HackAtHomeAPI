"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenCustomerDTO = void 0;
class TokenCustomerDTO {
    constructor(customer) {
        this.id = customer.id;
        this.firstName = customer.firstName;
        this.lastName = customer.lastName;
        this.email = customer.email;
        this.role = customer.role;
        this.address = customer.address;
        this.telephoneNumber = customer.telephoneNumber;
    }
}
exports.TokenCustomerDTO = TokenCustomerDTO;
//# sourceMappingURL=TokenCustomerDTO.js.map