const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    password: 'ItischeaT1',
    host: 'localhost',
    port: 5432,
    database: 'hackaton'
})

module.exports = pool