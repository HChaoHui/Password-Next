const insertSqliteTableColumn = (db, tableName, column, columnType) => {
    return new Promise((resolve, reject) => {
        const sql = `ALTER TABLE ${tableName} ADD COLUMN ${column} ${columnType}`;
        db.run(sql, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(`Column ${column} added to ${tableName} table`);
            }
        });
    });
}

// 向Admin数据库password的表中插入twofa字段类型为TEXT
// (async () => {
//     const db = require('./getSqlite')('Admin', 'password');
//     console.log(await insertSqliteTableColumn(db, 'password','twofa','TEXT'));
// })()

module.exports = insertSqliteTableColumn;
