import UserAccount from '../models/UserAccount.js';

export default class UserAccountController {
  static createUserAccount(accountData) {
    const account = new UserAccount(accountData);
    console.log('Cuenta de usuario creada:', account);
    return account;
  }

  static getAccountByUserId(userId) {
    console.log('Buscando cuenta asociada al usuario con ID:', userId);
    return null;
  }
}
