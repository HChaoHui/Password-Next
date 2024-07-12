const searchSqliteTableColumn = (db, tableName) => {
    return new Promise((resolve, reject) => {
        const sql = `PRAGMA table_info(${tableName})`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = searchSqliteTableColumn;
