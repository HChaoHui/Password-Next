const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbDir = path.join(__dirname, '../../db/')

const createSqlite = (baseName, baseDir) => {

    return new Promise((resolve) => {
        const dbPath = path.join(dbDir, baseDir);

        if (!fs.existsSync(dbPath)) {
            fs.mkdirSync(dbPath);
        }

        if (fs.existsSync(path.join(dbPath, baseName + '.sqlite'))) {
            resolve('Database Already Exists')
        }

        new sqlite3.Database(path.join(dbPath, baseName + '.sqlite'));

        // 用于延迟执行 不然创建完成后立即获取不到Sqlite文件
        setTimeout(() => {
            resolve('Database Created')
        }, 1000)
    })

}

module.exports = createSqlite;
