const createSqliteTable = (db, tableName, columns) => {
    return new Promise((resolve, reject) => {
        let columnsDef = Object.entries(columns).map(([key, value]) => `${key} ${value}`).join(", ");
        const createTableSQL = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsDef})`;
        db.run(createTableSQL, (err) => {
            if (err) {
                reject("Error creating table:", err.message);
            }
            resolve(`${tableName} table created successfully.`);
        });
    });
}

// 创建user数据库userToken表的数据
// (async () => {
//     const db = require('./getSqlite')('user', 'user');
//     console.log(await createSqliteTable(db, 'userToken', {
//         id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
//         token: 'TEXT',
//         user_id: "INTEGER", 
//         user: "TEXT",
//     }));
// })()

module.exports = createSqliteTable;
