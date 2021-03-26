"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenUserDTO = void 0;
class TokenUserDTO {
    constructor(User) {
        this.id = User.id;
        this.firstName = User.firstName;
        this.lastName = User.lastName;
        this.email = User.email;
        this.role = User.role;
        this.telephoneNumber = User.telephoneNumber;
    }
}
exports.TokenUserDTO = TokenUserDTO;
//# sourceMappingURL=TokenUserDTO.js.map