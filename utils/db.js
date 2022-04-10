const {readFile, writeFile} = require('fs').promises;
const {join} = require('path');
const {v4: uuid} = require('uuid');
const {ClientRecord} = require("../records/client-record");


class Db {
    constructor(dbFilename) {
        this.dbFilename = join(__dirname, '../data', dbFilename);
        this._load();
    }

    async _load() {
        this._data = JSON.parse(await readFile(this.dbFilename,'utf8')).map(obj => new ClientRecord(obj));
    }

    _save() {
        writeFile(this.dbFilename, JSON.stringify(this._data), 'utf8');
    }

    create(obj) {
        const id = uuid();
        this._data.push(new ClientRecord({
            id,
            ...obj,
        }));
        this._save();
        return id;
    }

    getAll() {
        return this._data;
    }

    getOne(id) {
        return this._data.find(oneObj => oneObj.id === id);
    }

    update(id, newObj) {
        this._data = this._data.map(oneObj => {
            if (oneObj.id === id) {
                return new ClientRecord({
                    ...oneObj,
                    ...newObj,
                })
            } else {
                return oneObj;
            }
        })
        this._save();
    }

    delete(id) {
        this._data = this._data.filter(oneObj => oneObj.id !== id);
        this._save(); //debounce
    }
}

const db = new Db('client.json');



module.exports = {
    db
}