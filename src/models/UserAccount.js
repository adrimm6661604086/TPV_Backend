/**
 * Modelo de UserAccount.
 */
export default class UserAccount {
    /**
     * @param {string} id - UUID de la cuenta.
     * @param {string} userId - ID del usuario asociado.
     * @param {string} IBAN - Código IBAN.
     * @param {'BankSim' | 'BBVA' | 'Caixabank' | 'Santander'} bankEntity - Entidad bancaria.
     */
    constructor({ id, userId, IBAN, bankEntity }) {
      this.id = id;
      this.userId = userId;
      this.IBAN = IBAN;
      this.bankEntity = bankEntity;
    }
  }
  