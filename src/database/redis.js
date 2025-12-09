const Redis = require('ioredis');
const { REDIS } = require("../../config.json")
const logger = require('../utils/logger');
const Guardian = require("../services/Guardian")

class RedisClient {
    constructor() {
        this.client = null;
        this.isConnected = false;
    }

    async connect(){
        try {
            this.client = new Redis({
                host: REDIS.HOST,
                port: REDIS.PORT,
                username: REDIS.USER,
                password: REDIS.PASSWORD,
                db: REDIS.DB,
                retryStrategy: (times) => {
                    const delay = Math.min(times * 50, 2000);
                    return delay;
                },
                lazyConnect: true
            });

            this.client.on('connect', () => {
                this.isConnected = true;
                logger.info('✅  Redis Connection established');
            });

            this.client.on('error', (error) => {
                this.isConnected = false;
                Guardian.handleGeneric('Redis Connection Error', 'Redis Client', error.stack);
            });

            this.client.on('close', () => {
                this.isConnected = false;
                logger.warn('⚠️  Redis Connection closed');
            });

            await this.client.connect();
        } catch (error) {
            Guardian.handleGeneric('Failed to initialize Redis client', 'Redis Init', error.stack);
            throw error;
        }
    }

    async disconnect() {
        if (this.client) {
            await this.client.quit();
            this.isConnected = false;
            logger.info('🔌  Redis Connection closed gracefully');
        }
    }

    getClient() {
        if (!this.isConnected) {
            throw new Error('Redis client is not connected');
        }
        return this.client;
    }

    isReady() {
        return this.isConnected;
    }
}

const redisClient = new RedisClient();
module.exports = { redisClient };