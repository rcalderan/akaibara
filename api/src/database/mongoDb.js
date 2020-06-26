/**Richard Calderan
 * 
 * Database class
 * Basic CRUD and mongodb methods 
 */

/* eslint-disable no-console */
const Mongoose = require('mongoose')
//Mongoose.set('debug', true);
const STATUS = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
}
const databaseName='akaibara'
class MongoDB {
    constructor(connection, schema) {
        this._connection = connection;
        this._schema = schema;
    }

    async isConnected() {
        const state = STATUS[this._connection.readyState]
        if (state === 'Connected') return state;

        if (state !== 'Connecting') return state

        //await new Promise(resolve => setTimeout(resolve, 4999))

        return STATUS[this._connection.readyState]
    }
    static async connect() {
        await Mongoose.connect('mongodb://127.0.0.1:27017/'+databaseName, {
            family: 4,//remove this and change localhost for 127.0.0.1 OR add it to "hosts"
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function (error) {
            if (!error) return;
            console.log('Connection fail!', error)
        })
        const connection = Mongoose.connection
        connection.on('error', console.error.bind(console, 'Error connecting to DB '+databaseName));

        connection.once('open', () => console.log('connection open!'))

        return connection;
    }

    async checkFistUsage() {
        const _defaults = this._schema.GetDefaultValues()
        if (_defaults.length > 0) {
            const result = await this._schema.insertMany(_defaults)
            let ad = result ? result.length : 1
            return ad
        }
        return 0
    }
    
    static ObjectId() {
        return new Mongoose.mongo.ObjectID()
    }

    async lastId() {
        try{
            const result = await this._schema.findOne({}, { _id: 1 }).sort({ _id: -1 }).limit(1)
            const last = result._id ? result : {_id:0}
            return last
        }catch(error) {
            return {_id:0}
        }

    }

    async count() {
        return this._schema.countDocuments()
    }

    async distinct(collumn) {
        return this._schema.distinct(collumn)
    }


    async aggregate(query) {
        return this._schema.aggregate(query)
    }

    async create(item) {
        try {
            const result = await this.lastId();
            let nextId = result._id ? result._id : 0
            if (nextId===0) {
                await this.checkFistUsage()
            }
            nextId++
            item._id = nextId;
            
            return this._schema.create(item);
        }
        catch (error) {
            console.log('Error: ', error)
        }
    }

    async read(item, skip = 0, limit = 100) {
        const result = this._schema.find(item, this._schema.collumns
        ).skip(skip).limit(limit)
        return result
    }


    async update(id, item) {
        try {

            return this._schema.updateOne({
                _id: id
            }
                , {
                    $set: item
                })
        } catch(error){
            console.log(error.message)
        }
    }

    async delete(id) {
        return this._schema.deleteOne({ _id: id })
    }
}
module.exports = MongoDB