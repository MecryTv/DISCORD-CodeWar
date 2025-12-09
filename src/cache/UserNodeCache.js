const CacheNode = require('../structures/CacheNode');
const UserNode = require('../models/user/UserNode');
const CacheService = require('../services/CacheService');

const userNodeCache = new CacheNode({
    name: 'UserNode',
    model: UserNode,
    fields: ['kt', 'db', 'shd', 'atk', 'eff', 'level'],
    ttl: 20
});

CacheService.registerCacheNode(userNodeCache);

module.exports = userNodeCache;