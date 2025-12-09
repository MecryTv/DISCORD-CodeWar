const CacheNode = require('../structures/CacheNode');
const UserNode = require('../models/user/UserNode');
const CacheService = require('../services/CacheService');

const userNodeCache = new CacheNode({
    name: 'UserNode',
    model: UserNode,
    fields: ['kt', 'db', 'shd', 'atk', 'eff', 'level'],
    defaults: {
        kt: 50,
        db: 0,
        shd: 100,
        atk: 50,
        eff: 100,
        level: 1
    }
});

CacheService.registerCacheNode(userNodeCache);

module.exports = userNodeCache;