const changeSqliteTableData = (db, tableName, updates, conditions) => {
    return new Promise((resolve, reject) => {
        const setClause = Object.keys(updates).map(key => `${key} = ?`).join(', ');
        const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
        const values = [...Object.values(updates), ...Object.values(conditions)];
        const sql = `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause}`;
        db.run(sql, values, function (err) {
            if (err) {
                reject(err);
                db.close();
            } else {
                resolve(this.changes);
            }
        });
    });
} 

module.exports = changeSqliteTableData;
