const { redisClient } = require('../database/redis');
const { REDIS } = require('../../config.json');
const Guardian = require('../services/Guardian');

class CacheNode {
    constructor({ name, model, fields, ttl = REDIS.TTL }) {
        this.name = name;
        this.model = model;
        this.fields = fields;
        this.ttl = ttl;
        this.keyPrefix = `cache:${name}:`;
    }

    _buildKey(userId) {
        return `${this.keyPrefix}${userId}`;
    }

    async get(userId) {
        if (!redisClient.isReady()) {
            Guardian.handleGeneric('Redis ist nicht bereit', 'CacheNode Get');
            return null;
        }

        try {
            const client = redisClient.getClient();
            const key = this._buildKey(userId);
            const data = await client.hgetall(key);

            if (!data || Object.keys(data).length === 0) {
                return null;
            }

            const parsed = {};
            for (const field of this.fields) {
                if (data[field] !== undefined) {
                    parsed[field] = this._parseValue(data[field]);
                }
            }

            return parsed;
        } catch (error) {
            Guardian.handleGeneric(
                `Fehler beim Abrufen von Cache für User ${userId}`,
                'CacheNode Get',
                error.stack
            );
            return null;
        }
    }

    async set(userId, data, expiresIn = this.ttl) {
        if (!redisClient.isReady()) {
            Guardian.handleGeneric('Redis ist nicht bereit', 'CacheNode Set');
            return false;
        }

        try {
            const client = redisClient.getClient();
            const key = this._buildKey(userId);

            const pipeline = client.pipeline();

            for (const field of this.fields) {
                if (data[field] !== undefined) {
                    pipeline.hset(key, field, data[field].toString());
                }
            }

            if (expiresIn > 0) {
                pipeline.expire(key, expiresIn);
            }

            await pipeline.exec();
            return true;
        } catch (error) {
            Guardian.handleGeneric(
                `Fehler beim Setzen von Cache für User ${userId}`,
                'CacheNode Set',
                error.stack
            );
            return false;
        }
    }

    async increment(userId, field, amount = 1) {
        if (!redisClient.isReady()) {
            Guardian.handleGeneric('Redis ist nicht bereit', 'CacheNode Increment');
            return false;
        }

        if (!this.fields.includes(field)) {
            Guardian.handleGeneric(
                `Feld '${field}' ist nicht in den CacheNode-Feldern definiert`,
                'CacheNode Increment'
            );
            return false;
        }

        try {
            const client = redisClient.getClient();
            const key = this._buildKey(userId);

            await client.hincrby(key, field, amount);
            await client.expire(key, this.ttl);

            return true;
        } catch (error) {
            Guardian.handleGeneric(
                `Fehler beim Inkrementieren von ${field} für User ${userId}`,
                'CacheNode Increment',
                error.stack
            );
            return false;
        }
    }

    async delete(userId) {
        if (!redisClient.isReady()) {
            return false;
        }

        try {
            const client = redisClient.getClient();
            const key = this._buildKey(userId);
            await client.del(key);
            return true;
        } catch (error) {
            Guardian.handleGeneric(
                `Fehler beim Löschen von Cache für User ${userId}`,
                'CacheNode Delete',
                error.stack
            );
            return false;
        }
    }

    async syncToDatabase() {
        if (!redisClient.isReady()) {
            Guardian.handleGeneric('Redis ist nicht bereit für Sync', 'CacheNode Sync');
            return 0;
        }

        try {
            const client = redisClient.getClient();
            const pattern = `${this.keyPrefix}*`;
            const keys = await client.keys(pattern);

            if (keys.length === 0) {
                return 0;
            }

            let syncedCount = 0;

            for (const key of keys) {
                const userId = key.replace(this.keyPrefix, '');
                const data = await client.hgetall(key);

                if (!data || Object.keys(data).length === 0) {
                    continue;
                }

                const parsed = {};
                for (const field of this.fields) {
                    if (data[field] !== undefined) {
                        parsed[field] = this._parseValue(data[field]);
                    }
                }

                const [user, created] = await this.model.findOrCreate({
                    where: { discordId: userId },
                    defaults: { discordId: userId, ...parsed }
                });

                if (!created) {
                    for (const field of this.fields) {
                        if (parsed[field] !== undefined && parsed[field] !== 0) {
                            await user.increment(field, { by: parsed[field] });
                        }
                    }
                }

                await client.del(key);
                syncedCount++;
            }

            return syncedCount;
        } catch (error) {
            Guardian.handleGeneric(
                `Fehler beim Sync zur Datenbank für CacheNode '${this.name}'`,
                'CacheNode Sync',
                error.stack
            );
            return 0;
        }
    }

    _parseValue(value) {
        const num = parseInt(value, 10);
        return isNaN(num) ? value : num;
    }

    async getAllKeys() {
        if (!redisClient.isReady()) {
            return [];
        }

        try {
            const client = redisClient.getClient();
            const pattern = `${this.keyPrefix}*`;
            return await client.keys(pattern);
        } catch (error) {
            Guardian.handleGeneric(
                'Fehler beim Abrufen aller Keys',
                'CacheNode GetAllKeys',
                error.stack
            );
            return [];
        }
    }
}

module.exports = CacheNode;