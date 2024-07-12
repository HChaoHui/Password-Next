const deleteSqliteTableData = (db, tableName, conditions) => {
    return new Promise((resolve, reject) => {
        const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
        const values = Object.values(conditions);
        const sql = `DELETE FROM ${tableName} WHERE ${whereClause}`;
        db.run(sql, values, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    });
}

module.exports = deleteSqliteTableData;
