const searchSqliteTableData = (db, tableName, conditions = {}, useFuzzySearch = false) => {
    return new Promise((resolve, reject) => {
        let whereClause = '';
        let values = [];

        if (useFuzzySearch) {
            whereClause = Object.keys(conditions).map(key => `${key} LIKE ?`).join(' AND ');
            values = Object.values(conditions).map(value => `%${value}%`);
        } else {
            whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
            values = Object.values(conditions);
        }

        const sql = `SELECT * FROM ${tableName}` + (whereClause ? ` WHERE ${whereClause}` : '');
        db.all(sql, values, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// 查询user数据库userToken表的数据
(async () => {
    const db = require('./getSqlite')('user', 'user');
    console.log(await searchSqliteTableData(db, 'userToken', { }));
})() 
 
// 查询Admin数据库password表的数据
// (async () => {
//     const db = require('./getSqlite')('Admin', 'password');
//     console.log(await searchSqliteTableData(db, 'password', { }));
// })()

module.exports = searchSqliteTableData;
