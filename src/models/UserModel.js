/**
 * Modelo de User.
 */
export default class User {
    /**
     * @param {string} id - UUID del usuario.
     * @param {string} name - Nombre del usuario.
     * @param {string} lastName - Apellido del usuario.
     * @param {string} email - Email del usuario.
     * @param {string} password - Contraseña del usuario.
     * @param {string} DNI - Documento de Identidad.
     * @param {string} [phoneNumber] - Número de teléfono.
     * @param {string} [address] - Dirección.
     * @param {string} [postalCode] - Código postal.
     * @param {string} [city] - Ciudad.
     * @param {string} [country] - País.
     * @param {Date} [createdAt] - Fecha de creación.
     */
    constructor({
      id,
      name,
      lastName,
      email,
      password,
      DNI,
      phoneNumber,
      address,
      postalCode,
      city,
      country,
      createdAt = new Date(),
    }) {
      this.id = id;
      this.name = name;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.DNI = DNI;
      this.phoneNumber = phoneNumber;
      this.address = address;
      this.postalCode = postalCode;
      this.city = city;
      this.country = country;
      this.createdAt = createdAt;
    }
  }
  