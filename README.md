<h1 align="center">🧠 TPV Virtual – Backend API (Node.js)</h1>

<p align="center">
  API REST que gestiona la lógica de negocio del TPV Virtual: autenticación, transacciones, estadísticas y comunicación con el simulador bancario.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/node.js-v18+-green.svg" />
  <img src="https://img.shields.io/badge/express.js-v4.18-blue.svg" />
  <img src="https://img.shields.io/badge/database-PostgreSQL-lightblue" />
  <img src="https://img.shields.io/badge/status-estable-brightgreen" />
  <img src="https://img.shields.io/badge/security-PCI--DSS%20compliant-critical" />
</p>

---

## 🧭 Tabla de Contenidos

- [📜 Descripción](#-descripción)
- [🎯 Funcionalidades Clave](#-funcionalidades-clave)
- [📐 Arquitectura General](#-arquitectura-general)
- [🗂️ Estructura del Proyecto](#️-estructura-del-proyecto)
- [🚀 Instalación](#-instalación)
- [🧪 Endpoints Principales](#-endpoints-principales)
- [🔐 Seguridad y Cumplimiento](#-seguridad-y-cumplimiento)
- [📚 Stack Tecnológico](#-stack-tecnológico)
- [📁 Enlaces Útiles](#-enlaces-útiles)
- [🪪 Licencia](#-licencia)

---

## 📜 Descripción

Este backend actúa como el motor del sistema TPV Virtual. Su función es procesar solicitudes desde la app móvil, validar transacciones y asegurar que los pagos simulados sean gestionados correctamente. Toda la información se maneja bajo protocolos de seguridad robustos, encriptación y cumplimiento con estándares como PCI-DSS y RGPD.

---

## 🎯 Funcionalidades Clave

- 🔑 Autenticación y gestión de usuarios (JWT + Bcrypt).
- 💸 Procesamiento de pagos y validación con entidad bancaria simulada.
- 🧾 Histórico de transacciones.
- 📊 Generación de estadísticas (mensual, semanal, anual).
- 💬 Notificaciones y mensajes de confirmación de operaciones.
- 🔒 Middleware de validación de tokens y roles.

---

## 📐 Arquitectura General

- Basado en el patrón **MVC**.
- Comunicación con frontend mediante **RESTful APIs**.
- Gestión de base de datos con **Sequelize (ORM)** y PostgreSQL.
- Comunicación con **simulador en Go** vía HTTP interno.
- Soporte para escalabilidad futura mediante contenedores y microservicios.

---

## 🗂️ Estructura del Proyecto

```
TPV_BACKEND
├── src/
│   ├── controllers/     # Lógica principal (Auth, Payment, Stats)
│   ├── middleware/      # Autenticación, validaciones
│   ├── models/          # Definiciones de entidades (Sequelize)
│   ├── routes/          # Endpoints de la API
│   ├── services/        # Comunicación con banco simulado
│   ├── config/          # Configuración DB, variables
│   └── utils/           # Helpers generales
├── tests/               # Casos de prueba unitarios
├── .env                 # Variables de entorno
├── app.js               # Configuración del servidor Express
├── server.js            # Arranque del servidor
└── package.json
```

---

## 🚀 Instalación

```
# Clonar repositorio
git clone https://github.com/tuusuario/TPV_Backend.git
cd TPV_Backend

# Instalar dependencias
npm install

# Configurar archivo .env
cp .env.example .env

# Ejecutar servidor
npm run dev
```

---

## 🧪 Endpoints Principales

| Método | Endpoint                 | Descripción                         |
|--------|--------------------------|-------------------------------------|
| POST   | `/api/auth/register`     | Registro de nuevos usuarios         |
| POST   | `/api/auth/login`        | Login con token JWT                 |
| GET    | `/api/transactions`      | Historial de transacciones          |
| POST   | `/api/payment`           | Inicia un pago vía banco simulado   |
| GET    | `/api/stats/weekly`      | Estadísticas por semana             |
| POST   | `/api/refund/:id`        | Solicitar devolución (refund)       |

---

## 🔐 Seguridad y Cumplimiento

- 🔒 **Autenticación JWT** con expiración configurable.
- 🔐 **Hashing con Bcrypt** para credenciales.
- 📦 **Tokenización de datos sensibles** como tarjetas.
- 🔍 Validación de entrada para evitar **inyecciones SQL / XSS**.
- 📜 Preparado para cumplir con **PCI-DSS y GDPR**.

---

## 📚 Stack Tecnológico

| Capa        | Tecnología            |
|-------------|------------------------|
| Core        | Node.js 18+, Express.js |
| DB          | PostgreSQL + Sequelize |
| Seguridad   | JWT, Bcrypt, TLS       |
| Testing     | Jest + Supertest       |
| Comunicación externa | HTTP con Go API simulada |

---

## 📁 Enlaces Útiles

- 📱 **Frontend App**: [TPV_Frontend](https://github.com/adrimm6661604086/TPV_Frontend)
- 🏦 **Simulador Bancario Go**: *(por agregar)*
- 📘 **Informe del Proyecto (PDF)**: [`TPVVirtualMóvil-Informe.pdf`](../TPVVirtualMóvil-Informe.pdf)

---

## 🪪 Licencia

Distribuido bajo la Licencia MIT. Consulta el archivo [`LICENSE`](LICENSE) para más detalles.

---

> _Proyecto desarrollado como parte del Trabajo Final de Grado en Ingeniería Informática (UAB) – Curso 2024/2025._
