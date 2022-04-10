const {v4: uuid} = require('uuid');
const {ClientRecord} = require("../records/client-record");
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

class Db {
    constructor() {
        this._load();
    }

    async _load() {
        const [client] = await pool.execute('SELECT * From `client`');
        return this._data = client.map(obj => new ClientRecord(obj));
    }

    async _save(id,obj) {
        await pool.execute(`INSERT INTO client VALUES(:id, :name, :email, :date, :notes)`, {
            id: id,
            name: obj.name,
            email: obj.email,
            date: obj.date,
            notes: obj.notes
        });
        this._load()
    }

    create(obj) {
        const id = uuid();
        this._save(id, obj);
        this._load()
        return id;
    }

    getAll() {
        return this._data;
    }

    getOne(id) {
        return this._data.find(oneObj => oneObj.id === id);
    }

    async update(id, obj) {
        this._data =  await pool.execute("UPDATE `client` SET `name` = :name, `email` = :email, `date` = :date, " +
            "`notes` = :notes WHERE `id` = :id", {
            id: id,
            name: obj.name,
            email: obj.email,
            date: obj.date,
            notes: obj.notes
        });
        this._load()
    }

    async delete(id) {
        await pool.execute(`DELETE FROM client WHERE client.id = :id`, {
            id
        });
        this._load()
    }
}

const db = new Db('client.json');

module.exports = {
    db
}