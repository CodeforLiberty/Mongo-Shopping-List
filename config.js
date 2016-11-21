exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://<user>:<user>@ds159527.mlab.com:59527/shooping-list' :
                            'mongodb://<Dev>:<Dev>@ds159527.mlab.com:59527/shooping-list');
exports.PORT = process.env.PORT || 59527;

PORT=59527