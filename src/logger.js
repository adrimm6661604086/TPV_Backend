import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Configurar el logger
const logger = createLogger({
  level: 'info', // Nivel por defecto (info, warn, error, debug)
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Añade timestamp
    colorize(), // Colorea los logs en consola
    logFormat // Aplica el formato definido
  ),
  transports: [
    new transports.Console(), // Muestra los logs en la consola
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Guarda logs de errores
    new transports.File({ filename: 'logs/combined.log' }) // Guarda todos los logs
  ],
});

// Exportar el logger para usarlo en otros módulos
module.exports = logger;
