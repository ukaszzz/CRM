const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DB_USER,
    database: 'CRM',
    password: process.env.DB_PASSWORD,
    namedPlaceholders: true,
    decimalNumbers: true
});

async function cos(){
    const [client] = await pool.execute('SELECT * From `client`');
    console.log(client)
return cos
}
console.log(cos())


module.default = {
    pool
}