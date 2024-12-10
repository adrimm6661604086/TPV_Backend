// Model
import TransactionModel from '../models/TransactionModel';

// Libraries
import { Op } from 'sequelize';
import logger from '../logger';

class StatsController {
    /**
     * Obtener las estadísticas de las transacciones.
     * @param opcionales: filter.
     * @return {Object} Estadísticas de las transacciones.
     */ 
    static async getStats(req, res) {
        try {
            const { filter } = req.query;

            let startDate;
            let endDate = new Date(); 

            if (filter === 'lastWeek') {
                startDate = new Date();
                startDate.setDate(endDate.getDate() - 7);
            } else if (filter === 'lastMonth') {
                startDate = new Date();
                startDate.setMonth(endDate.getMonth() - 1);
            } else if (filter === 'lastYear') {
                startDate = new Date();
                startDate.setFullYear(endDate.getFullYear() - 1);
            } else if (!filter) {
                startDate = null;
            }

            const whereClause = startDate
                ? { createdAt: { [Op.between]: [startDate, endDate] } } : {}; 

            const transactions = await TransactionModel.findAll({ where: whereClause });

            logger.info(`Transacciones de ${filter} recuperadas con éxito: ${transactions.length}`);
            return res.status(200).json({
                status: 200,
                message: 'Transacciones recuperadas con éxito',
                transactions,
            });
        } catch (error) {
            logger.error(`Error en getStats: ${error.message}`);
            return res.status(500).json({
            message: 'Error interno del servidor',
            error: error.message,
            });
        }
    }
}

export default StatsController();