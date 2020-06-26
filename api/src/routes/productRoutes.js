//const BaseRoute = require('./base/baseRoute')

/*const Joi = require('joi')
const Boom = require('boom')
*/

/**
 * product.js
    3672382 - Richard Carvalho Calderan

    define products routes
 */

var express = require('express');
var router = express.Router();

//database
var MongoDb = require('../database/mongoDb')
const schema = require('../database/schemas/productSchema');

//validator
const { body, validationResult } = require('express-validator');
const validation = require('./base/productValidation');
//const middleware = require('./base/validade');


let produtos = new MongoDb(MongoDb.connect(), schema);

//get all products
router.get('/', async function (req, res) {
    try {
        //querys: ?skip=0&limit=10
        console.log("-> get product")
        let skip = req.query.skip ? parseInt(req.query.skip) : 0
        let limit = req.query.limit ? parseInt(req.query.limit) : 10
        if (isNaN(skip) || isNaN(limit)) {
            res.boom.badRequest()
            return;
        }
        let query = {}
        let {
            nome, valor
        } = req.query
        query = nome ? {
            nome: { $regex: `.*${nome}*.` }
        } : {}
        query = valor ? {
            ...query,
            valor: `${valor}`
        } : query

        let result = await produtos.read(query, skip, limit);
        if (result.length === 0)
            res.boom.notFound()
        else {
            res.send(result);
        }

    } catch (error) {
        console.log(error)
        res.boom.internal()
    }
});

//get last id
router.get('/lastid', async function (req, res) {
    try {
        console.log("-> get lastid")
        let result = await produtos.lastId();
        if (result.length === 0)
            res.boom.notFound()
        else {
            res.send(result);
        }

    } catch (error) {
        console.log(error)
        res.boom.internal()
    }
});

//get last
router.get('/last', async function (req, res) {
    try {
        console.log("-> get last")
        let result = await produtos.aggregate([{ "$sort": { _id: -1 } }, { "$limit": 1 }]);
        if (result.length === 0)
            res.boom.notFound()
        else {
            res.send(result[0]);
        }

    } catch (error) {
        console.log(error)
        res.boom.internal()
    }
});

//get list of all names
router.get('/names', async function (req, res) {
    try {
        //querys: ?skip=0&limit=10
        console.log("-> get names")/*
        let skip=req.query.skip ? parseInt( req.query.skip):0
        let limit = req.query.limit ? parseInt(req.query.limit):10
        */

        const result = await produtos.distinct('nome')
        if (result.length === 0)
            res.boom.notFound()
        else {
            res.send(result);
        }

    } catch (error) {
        console.log(error)
        res.boom.internal()
    }
});

//get user by id
router.get('/:id([0-9]+)', async (req, res) => {
    try {//querys: product/id
        let gotId = parseInt(req.params.id);
        console.log("-> get product " + gotId)
        let found = await produtos.read({ _id: gotId })
        const curr = found.filter(product => {
            if (product._id === gotId) {
                return true;
            }
        });
        if (curr.length === 1) {
            res.json(curr[0])
        } else {//boom!
            res.boom.notFound()
        }
    } catch (error) {
        console.log(error)
        res.boom.internal()
    }
});


//post product
router.post('/',  async (req, res) => {
    try {
        console.log("-> Create new product")
        const result = await produtos.create(req.body)
        res.send({ message: "Success!", _id: result._id });
    } catch (error) {
        console.log(error)
        res.boom.preconditionFailed()
    }
});

router.put('/:id([0-9]+)', validation.productPut(), async (req, res) => {
    try {/*
        if (!req.body.type ||
            !req.body.name ||
            !req.body.owner ||
            !req.body.race ||
            !req.body.age) {
    
            res.status(400);
            res.json({ message: "Bad Request" });
        } else {
        }*/

        let gotId = parseInt(req.params.id);
        let product = req.body;
        product._id = gotId;
        let result = await produtos.update(gotId, product);
        if (result.nModified === 1)
            res.json({ message: "Updated!" });
        else {
            let found = await produtos.read({ _id: gotId })
            const curr = found.filter(product => {
                if (product._id === gotId) {
                    return true;
                }
            });
            if (curr.length === 1) {
                res.status(303)
                res.json({ message: "Nothing changed!" })
            } else {//boom!
                res.boom.notFound()
            }
        }
    } catch (error) {
        console.log(error)
        res.boom.internal()
    }
});

router.delete('/:id([0-9]+)', async (req, res) => {
    try {
        let gotId = parseInt(req.params.id);
        let result = await produtos.delete(gotId);
        if (result.n === 1) {
            res.json({ message: "Product Removed!" })
        } else {
            res.boom.notFound()
        }

    } catch (error) {
        console.log(error)
        res.boom.internal()
    }
});


module.exports = router;



/*
const failAction =(request,headers,error) =>{
    throw error
}

class ClienteRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
        this.baseRoute='/api'
    }

    list() {
        return {
            path: `${this.baseRoute}/cliente`,
            method: 'GET',
            config :{
                validate:{
                    failAction,
                    query:{
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100),
                        cpf: Joi.string().length(14)
                    }
                }

            },
            handler: (request, headers) => {
                try{
                    let query ={}
                    const {
                        skip,limit,nome,cpf
                    } = request.query
                    query = nome ? {
                        nome: {$regex: `.*${nome}*.`}
                    } : {}
                    query = cpf ? {
                        ... query,
                        cpf: `${cpf}`
                    } : query
                    return this.db.read(query,skip,limit)
                }catch(error){
                    return Boom.internal()

                }
            }
        }
    }

    listById() {
        return {
            path: `${this.baseRoute}/cliente/{id}`,
            method: 'GET',
            config :{
                validate:{
                    failAction,
                    params: {
                        id: Joi.number().integer().required(),
                    }
                }

            },
            handler: async (request) => {
                try{
                    //
                    const {
                        id
                    } = request.params

                    const result = await this.db.read({_id:id},0,1)
                    if (result.length ===0)
                    return Boom.notFound('Cliente não Encontrado')
                    return result
                }catch(error){
                    return Boom.internal()

                }
            }
        }
    }
    listNames() {
        return {
            path: `${this.baseRoute}/cliente/names`,
            method: 'GET',
            config :{
                validate:{
                    failAction,
                }

            },
            handler: async (request) => {
                try{
                    const result = await this.db.distinct('nome')
                    return result
                }catch(error){
                    return Boom.internal()

                }
            }
        }
    }
    create(){
        return {
            path : `${this.baseRoute}/cliente`,
            method:'POST',
            config:{
                validate:{
                    failAction,
                    payload:{
                        _id:Joi.number().integer(),
                        nome: Joi.string().max(400).required(),
                        cpf: Joi.string().min(14).max(14).required(),
                        rg: Joi.string().max(14),
                        nascimento: Joi.date().required(),
                        sexo: Joi.boolean().required(),
                        autenticacao: Joi.boolean().required(),
                        fones: Joi.array().required(),
                        obs: Joi.string().min(0).max(500).required(),
                        email: Joi.string(),
                        por: Joi.number().required(),
                        endereco: Joi.object().keys({
                            cep:Joi.string(),
                            logradouro: Joi.string(),
                            numero: Joi.number().integer(),
                            bairro: Joi.string(),
                            cidade:Joi.string(),
                            uf: Joi.string().min(2).max(2),
                        }).required(),
                    }
                }
            },
            handler: async (request) =>{
                try{
                    const result = await this.db.create(request.payload)

                    if(!result)
                    return Boom.preconditionFailed( "Não foi possível atualizar cliente!")

                    return {
                        message: "Cliente cadastrado com sucesso!",
                        _id: result._id
                    }

                }
                catch(error){
                    return Boom.internal()
                }
            }
        }
    }
    update() {
        try {
            return {
                path: `${this.baseRoute}/cliente/{id}`,
                method: 'PATCH',
                config: {
                    validate: {
                        failAction,
                        payload: {
                            nome: Joi.string().max(400),
                            cpf: Joi.string().min(14).max(14),
                            rg: Joi.string().max(14),
                            nascimento: Joi.date(),
                            sexo: Joi.boolean(),
                            autenticacao: Joi.boolean(),
                            fones: Joi.array(),
                            obs: Joi.string().min(0).max(500),
                            email: Joi.string(),
                            por: Joi.number(),
                            endereco: Joi.object().keys({
                                cep: Joi.string(),
                                logradouro: Joi.string(),
                                numero: Joi.string(),
                                bairro: Joi.string(),
                                cidade: Joi.string(),
                                uf: Joi.string().min(2).max(2),
                            }),
                        },
                        params: {
                            id: Joi.number().integer().required(),
                            //nome: Joi.string().max(300),
                        }
                    },

                },
                handler: async (request, headers) => {
                    const {
                        id
                    } = request.params
                    const {
                        payload
                    } = request
                    console.log('updading...')
                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString) //<-- aqui ele elimina parametros undefided, a fim de não atualizar dados para undefined

                    const result = await this.db.update(id, dados)
                    if (result.nModified !== 1)
                    return Boom.preconditionFailed('Não foi possível atualizar cliente!')
                    return {
                        message: 'Cliente atualizado com sucesso!'
                    }

                }
            }
        } catch (error) {
            return Boom.internal()
        }
    }

    delete() {
        try{
            return {
                path: `${this.baseRoute}/cliente/{id}`,
                method: 'DELETE',
                config: {
                    validate: {
                        failAction,
                        params: {
                            id: Joi.number().integer().required()
                        }
                    }
                },
                handler: async (request) => {
                    const id = request.params.id;
                    const result = await this.db.delete(id)
                    if(result.n !== 1)
                    return Boom.preconditionFailed('Não foi possível remover cliente')
                    return{
                        message: 'Cliente removido com sucesso!'
                    }
                }
            }
        }catch{
            return Boom.internal()
        }
    }

}

module.exports = ClienteRoutes
*/