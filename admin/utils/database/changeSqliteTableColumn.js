const changeSqliteTableColumn = (db, tableName, oldColumn, newColumn, newColumnType) => {
    return new Promise((resolve, reject) => {
        db.serialize(async () => {
            try {
                const tableInfo = await new Promise((resolve, reject) => {
                    db.all(`PRAGMA table_info(${tableName})`, (err, rows) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(rows);
                        }
                    }); 
                });

                const columns = tableInfo.map(info => info.name);

                if (!columns.includes(oldColumn)) {
                    throw new Error(`Column ${oldColumn} does not exist in table ${tableName}`);
                }

                const newColumnsWithTypes = tableInfo.map(info => {
                    if (info.name === oldColumn) {
                        return `${newColumn} ${newColumnType}`;
                    }
                    return `${info.name} ${info.type}`;
                }).join(', ');

                const newColumns = tableInfo.map(info => {
                    if (info.name === oldColumn) {
                        return `${newColumn}`;
                    }
                    return `${info.name}`;
                }).join(', ');

                const tempTable = `${tableName}_temp`;
                await new Promise((resolve, reject) => {
                    db.run(`ALTER TABLE ${tableName} RENAME TO ${tempTable}`, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });

                await new Promise((resolve, reject) => {
                    db.run(`CREATE TABLE ${tableName} (${newColumnsWithTypes})`, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });

                await new Promise((resolve, reject) => {
                    db.run(`INSERT INTO ${tableName} (${newColumns}) SELECT ${newColumns} FROM ${tempTable}`, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });

                await new Promise((resolve, reject) => {
                    db.run(`DROP TABLE ${tempTable}`, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });

                resolve(`Column ${oldColumn} modified to ${newColumn} in table ${tableName}`);
            } catch (err) {
                reject(err);
            }
        });
    });
}

// 修改Admin数据库password的表website字段为webSite
// (async () => {
//     const db = require('./getSqlite')('Admin', 'password');
//     console.log(await changeSqliteTableColumn(db, 'password','website','webSite','TEXT'));
// })()

module.exports = changeSqliteTableColumn;
