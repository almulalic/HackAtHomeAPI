"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Credential = void 0;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class Credential {
    static async EncryptPassword(password) {
        return await new Promise((resolve, reject) => {
            bcrypt.hash(password, Credential._salt, (err, hash) => {
                if (err)
                    reject(err);
                resolve(hash);
            });
        });
    }
    static async DecryptPassword(recievedPassword, password) {
        return bcrypt.compare(recievedPassword, password);
    }
    static async VerifyJWT(refreshToken) {
        return await new Promise((resolve, reject) => {
            jwt.verify(refreshToken, Credential._jwtRefreshSecret, (err) => {
                console.log(err);
                if (err)
                    reject(err);
                resolve(true);
            });
        });
    }
    static async GenerateConfirmationToken(id, duration) {
        return await jwt.sign({ identityId: id }, Credential._jwtEmailSecret, {
            expiresIn: duration,
        });
    }
    static async DecodeRegisterConfirmationToken(token) {
        return jwt.verify(token, Credential._jwtEmailSecret);
    }
    static async DecodePasswordResetToken(token) {
        return jwt.verify(token, Credential._resetPasswordResetSecret);
    }
    static async GenerateAccessToken(tokenCustomer, duration) {
        return await jwt.sign({ currentCustomer: tokenCustomer }, Credential._jwtAccessSecret, {
            expiresIn: duration,
        });
    }
    static async GenerateRefreshToken(tokenCustomer, duration) {
        return await jwt.sign({ currentCustomer: tokenCustomer }, Credential._jwtRefreshSecret, {
            expiresIn: duration,
        });
    }
    static async GenerateResetPasswordToken(identity, duration) {
        return await jwt.sign({ id: identity.id }, Credential._resetPasswordResetSecret, {
            expiresIn: duration,
        });
    }
}
exports.Credential = Credential;
Credential._salt = Number(process.env.PASSWORD_SALT);
Credential._jwtEmailSecret = process.env.EMAIL_SECRET;
Credential._jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
Credential._jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
Credential._resetPasswordResetSecret = process.env.PASSWORD_RESET_SECRET;
//# sourceMappingURL=Credential.js.map