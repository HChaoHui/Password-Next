const getSqliteAllTable = async (db) => {
    return new Promise((resolve, reject) => {
        const getSqliteAllTableSQL = `SELECT name FROM sqlite_master WHERE type='table'`;
        db.all(getSqliteAllTableSQL, (err, rows) => {
            if (err) {
                reject(err);
            }

            resolve(rows);
        });
    })
}

// 查询Admin数据库的表
// (async () => {
//     const db = require('./getSqlite')('Admin', 'password');
//     console.log(await getSqliteAllTable(db)); 
// })() 

module.exports = getSqliteAllTable;
