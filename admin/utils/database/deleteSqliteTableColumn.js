const deleteSqliteTableColumn = (db, tableName, column) => {
    return new Promise((resolve, reject) => {
        db.all(`PRAGMA table_info(${tableName});`, [], (err, columns) => {
            if (err) {
                return reject(err);
            }

            if (!columns.some(col => col.name === column)) {
                return reject(new Error(`Column ${column} does not exist in table ${tableName}`));
            }

            const newColumns = columns.filter(col => col.name !== column).map(col => `${col.name} ${col.type}`).join(', ');

            const newColumnNames = columns.filter(col => col.name !== column).map(col => col.name).join(', ');

            const createTempTableSQL = `CREATE TABLE ${tableName}_temp (${newColumns});`;
            const copyDataSQL = `INSERT INTO ${tableName}_temp SELECT ${newColumnNames} FROM ${tableName};`;
            const dropOldTableSQL = `DROP TABLE ${tableName};`;
            const renameTempTableSQL = `ALTER TABLE ${tableName}_temp RENAME TO ${tableName};`;

            db.serialize(() => {
                db.run("BEGIN TRANSACTION;");
                db.run(createTempTableSQL);
                db.run(copyDataSQL);
                db.run(dropOldTableSQL);
                db.run(renameTempTableSQL);
                db.run("COMMIT;", (err) => {
                    if (err) {
                        db.run("ROLLBACK;");
                        return reject(err);
                    }
                    resolve(`Column ${column} removed from ${tableName} table`);
                });
            });
        });
    });
}

module.exports = deleteSqliteTableColumn;
