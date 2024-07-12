const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbDir = path.join(__dirname, '../../db/')

const getSqlite = (baseName, baseDir) => {

    const dbPath = path.join(dbDir, baseDir);
    const basePath = path.join(dbPath, baseName + '.sqlite');

    if (!fs.existsSync(basePath)) {
        throw new Error('Database Not Found.');
    }

    const db = new sqlite3.Database(basePath);

    return db

}

module.exports = getSqlite;
