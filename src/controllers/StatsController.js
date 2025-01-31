// Model
import TransactionModel from '../models/TransactionModel.js';
import BankAccountModel from '../models/BankAccountModel.js';

// Libraries
import { Op } from 'sequelize';
import logger from '../logger.js';
import moment from 'moment';
import Sequelize from 'sequelize';

const timeFilterFormats = {
    daily: '%Y-%m-%d',
    weekly: '%Y-%u',
    monthly: '%Y-%m',
    annually: '%Y'
};

class StatsController {
    /**
     * Obtener las estadísticas de las transacciones.
     * @param userId: ID del usuario. 
     * @param filterQuery: filter.
     * @return {Object} Estadísticas de las transacciones.
     */ 
    static async getStats(req, res) {
        try {
            const { userId } = req.params;
            const { 'time-filter': timeFilter } = req.query;

            if (!timeFilter) {
                return res.status(400).json({
                    error: "Missing 'time-filter' query parameter.",
                    status: 400,
                });
            }

            const bankAccount = await BankAccountModel.findOne({ where: { userId } });
            if (!bankAccount) {
                logger.error('Cuenta bancaria no encontrada');
                return res.status(404).json({
                    status: 404,
                    message: 'Cuenta bancaria no encontrada'
                });
            }

            logger.info('Bank account retrieved successfully');

            let startDate, endDate, groupFormat;
            const dateRangeRegex = /^(\d{2}\/\d{2}\/\d{4})-(\d{2}\/\d{2}\/\d{4})$/;

            if (dateRangeRegex.test(timeFilter)) {
                const [startStr, endStr] = timeFilter.split('-');

                startDate = moment(startStr, 'DD/MM/YYYY').startOf('day').toDate();
                endDate = moment(endStr, 'DD/MM/YYYY').endOf('day').toDate();

                groupFormat = '%Y-%m-%d'; 
            } else {
                if (!['daily', 'weekly', 'monthly', 'annually'].includes(timeFilter)) {
                    return res.status(400).json({
                        error: "Invalid time-filter. Use 'daily', 'weekly', 'monthly', 'annually', or a date range (DD/MM/YYYY-DD/MM/YYYY).",
                        status: 400,
                    });
                }

                const now = new Date();
                switch (timeFilter) {
                    case 'daily':
                        startDate = moment().subtract(30, 'days').startOf('day').toDate();
                        groupFormat = timeFilterFormats.daily;
                        break;
                    case 'weekly':
                        startDate = moment().subtract(12, 'weeks').startOf('isoWeek').toDate();
                        groupFormat = timeFilterFormats.weekly;
                        break;
                    case 'monthly':
                        startDate = moment().subtract(12, 'months').startOf('month').toDate();
                        groupFormat = timeFilterFormats.monthly;
                        break;
                    case 'annually':
                        startDate = moment().subtract(5, 'years').startOf('year').toDate();
                        groupFormat = timeFilterFormats.annually;
                        break;
                }
                endDate = now;
            }

            const transactions = await TransactionModel.findAll({
                where: {
                    bankAccountId: bankAccount.id,
                    transactionDate: {
                        [Op.between]: [startDate, endDate] 
                    }
                },
                attributes: [
                    [Sequelize.fn('DATE_FORMAT', Sequelize.col('transactionDate'), groupFormat), 'timeGroup'],
                    'transactionType',
                    [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
                    [Sequelize.fn('COALESCE', Sequelize.fn('SUM', Sequelize.col('amount')), 0), 'totalAmount']
                ],
                group: [
                    Sequelize.fn('DATE_FORMAT', Sequelize.col('transactionDate'), groupFormat),
                    'transactionType'
                ],
                order: [[Sequelize.literal('timeGroup'), 'ASC']],
                raw: true
            });

            logger.info('Transactions retrieved successfully');

            const stats = {};

            transactions.forEach(tx => {
                const timeGroup = tx.timeGroup;
                if (!stats[timeGroup]) {
                    stats[timeGroup] = {
                        transactions: 0,
                        totalAmount: 0,
                        payments: 0,
                        returns: 0,
                        paymentsAmount: 0,
                        returnAmount: 0
                    };
                }

                const count = parseInt(tx.count, 10);
                const amount = parseFloat(tx.totalAmount || 0);

                stats[timeGroup].transactions += count;

                if (tx.transactionType === 'PAYMENT') {
                    stats[timeGroup].payments += count;
                    stats[timeGroup].paymentsAmount += amount;
                    stats[timeGroup].totalAmount += amount;
                } else if (tx.transactionType === 'RETURN') {
                    stats[timeGroup].returns += count;
                    stats[timeGroup].returnAmount += amount;
                    stats[timeGroup].totalAmount -= amount;
                }
            });

            return res.json({
                Stats: stats,
                status: 200,
                message: "Stats processed successfully",
            });

        } catch (error) {
            console.error("Error fetching transactions stats:", error);
            res.status(500).json({
                status: 500,
                error: "Internal Server Error"
            });
        }
    }
}

export default StatsController;
