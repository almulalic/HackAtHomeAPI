"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailer = void 0;
const sgMail = require("@sendgrid/mail");
const mailerConfig = require("../../../mailer.config.json");
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
class Mailer {
}
exports.Mailer = Mailer;
Mailer.SendConfirmationEmail = async (identity, token) => {
    const url = process.env.BASE_APP_URL + `/confirmation/${token}`;
    return new Promise((resolve, reject) => {
        sgMail
            .send({
            to: identity.email,
            from: mailerConfig.noReply,
            subject: mailerConfig.confirmation.subject,
            html: `Hi ${identity.firstName} ${identity.lastName}! Please click this link to confirm your email <a href="${url}">${url}</a>`,
        })
            .then(() => {
            resolve(mailerConfig.confirmation.success);
        })
            .catch((err) => {
            resolve(mailerConfig.confirmation.fail);
        });
    });
};
Mailer.ResendConfirmationEmail = async (identity, token) => {
    const url = process.env.BASE_APP_URL + `/confirmation/${token}`;
    return new Promise((resolve, reject) => {
        sgMail
            .send({
            to: identity.email,
            from: mailerConfig.noReply,
            subject: mailerConfig.confirmation.subject,
            html: `Hi ${identity.firstName} ${identity.lastName}! You requested a new email confirmation mail. Please click this link to confirm your email <a href="${url}">${url}</a> `,
        })
            .then(() => {
            resolve(mailerConfig.confirmation.success);
        })
            .catch(() => {
            resolve(mailerConfig.confirmation.fail);
        });
    });
};
Mailer.SendResetPasswordEmail = async (identity, token) => {
    const url = process.env.BASE_APP_URL + `/confirmPasswordReset/${token}`;
    return new Promise((resolve, reject) => {
        sgMail
            .send({
            to: identity.email,
            from: mailerConfig.noReply,
            subject: 'Reset password empero',
            html: ` Please click this link to proceed to password reset <a href="${url}">${url}</a>`,
        })
            .then(() => {
            resolve(mailerConfig.confirmation.success);
        })
            .catch(() => {
            resolve(mailerConfig.confirmation.fail);
        });
    });
};
Mailer.SendGenericEmail = async (body) => {
    sgMail
        .send({
        from: body.from,
        to: body.to,
        subject: body.subject,
        html: body.html,
    })
        .then(() => {
        return 'EmailSentSuccessfully';
    })
        .catch((err) => {
        console.log(err);
        return 'EmailNotSent';
    });
};
//# sourceMappingURL=Mailer.js.map