const insertSqliteTableData = (db, tableName, data) => {
    return new Promise((resolve, reject) => {
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map(key => '?').join(', ');
        const values = Object.values(data);
        const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
        db.run(sql, values, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve("Insert Data Success, LastID: " + this.lastID);
            }
        });
    });
}

// (async () => {
//     const db = require('./getSqlite')('user', 'user');
//     console.log(await insertSqliteTableData(db, 'userToken', {
//         token: 'PasswordNext',
//         user_id: "1",
//         user: "PasswordNext",
//     }));
// })()

module.exports = insertSqliteTableData;
