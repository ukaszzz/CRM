class ClientRecord {
    constructor(obj) {
        const {id, name, mail, nextContactAt, notes} = obj

        if(!id || typeof id !== 'string') {
            throw new Error('Id can not be empty')
        }

        if(!name || typeof name !== 'string' || name.length < 3) {
            throw new Error('Name should be text and should be at least 3 characters long')
        }

        if(!mail || typeof mail !== 'string' || mail.indexOf('@') === -1) {
            throw new Error('Incorrect email')
        }

        if(typeof nextContactAt !== 'string') {
            throw new Error('Contact date must be of type text')
        }

        if(typeof notes !== 'string') {
            throw new Error('notes must be of type text')
        }

        this.id = id;
        this.name = name;
        this.mail = mail;
        this.nextContactAt = nextContactAt;
        this.notes = notes;
    }

}

module.exports = {
    ClientRecord
}