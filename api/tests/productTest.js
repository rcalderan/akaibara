const assert = require('assert').strict
const mongoDb = require('../src/database/mongoDb')
const productSchema = require('../src/database/schemas/productSchema')
//const Context = require('../database/strategies/base/contextStrategy')

const api = require('../index')

const axios = require('axios');

let baseUrl = "http://127.0.0.1:5000/";

var MOCK = {
    _id: 1,
    type:"Noiva Modas",
    name: "Yakisoba",
    description: "Yakikakakakakka",
    img: 'img/yakisoba.jpg',
    price: 22.9,
    date: "2019-01-09 12:26:41.571",
    isActive: true,
    soldout: 0,
    status: 0,
};

let lastId = 0
describe.only('MongoDB test suit', function () {
    this.beforeAll(async () => {
        const connection = await mongoDb.connect()
        product = new mongoDb(connection, productSchema)
    })
    it('Check connection', async () => {
        const result = await product.isConnected()
        const expected = 'Connected'
        assert.deepEqual(result, expected)
    })

    it('getLastID', async function () {
        const gotId = await product.lastId()
        lastId = gotId._id
        assert.notDeepEqual(gotId._id, undefined)
    })

    it('Cadastrar product', async function () {
        try{
            const resultado = await product.create(MOCK)
            const gotId = await product.lastId()
            lastId = gotId._id
    
            assert.ok(resultado._id === lastId)
        }catch(message){
            console.log(message)
            assert.ok(false)
        }
    })
    it('Listar product', async function () {
        MOCK._id = lastId
        const [result] = await product.read({ _id: MOCK._id }, 0, 10)

        assert.ok(result._id == lastId)
    })
    it('Count: ', async function () {
        const result = await product.count()
        assert.notDeepStrictEqual(isNaN(result))
    })

    it('Atualizar product', async () => {
        var rand = Math.random()
        const result = await product.update(lastId, {
            name: MOCK.name + rand.toString()
        })
        assert.deepEqual(result.nModified, 1)
    })
    it('Remover product', async () => {
        if (!lastId)
            console.log('Não pode exluir id=0')

        const result = await product.delete(lastId)
        assert.deepEqual(result.n, 1)
    })
})


let app = {}
let lastOne = {}
describe('Product Routes', function () {
    this.beforeAll(async () => {
        app = api
    })

    it('/product -> lastID', async () => {
        const result = await axios.get(`${baseUrl}/product/lastid`);
        lastOne._id = result.data._id
        const statusCode = result.status
        assert.deepEqual(statusCode, 200)
        assert.ok(!isNaN(result.data._id))
    })

    it('POST product: /product', async function () {
        let expectedId = lastOne._id + 1
        const result = await axios.post(`${baseUrl}/product/`, MOCK);
        const msg = result.data.message
        const statusCode = result.status
        assert.deepEqual(statusCode, 200)
        assert.deepEqual(result.data._id, expectedId)
        assert.deepEqual(msg, 'Sucess!')

    })

    it('/product -> last', async () => {
        const result = await axios.get(`${baseUrl}/product/last`);
        lastOne = result.data
        const lastId = lastOne._id
        const statusCode = result.status
        assert.deepEqual(statusCode, 200)
        assert.ok(!isNaN(lastId))
    })

    it('/product -> http get - listar', async () => {
        const result = await axios.get(`${baseUrl}/product?skip=0&limit=10`);
        const statusCode = result.status
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(result.data))
    })
    it('Product POST fail: /product', async function () {
        try {
            let faible = MOCK
            faible.name = ""
            const result = await axios.post(`${baseUrl}/product/`, faible);
        } catch (error) {
            assert.deepEqual(error.response.status, 400)
        }

    })


    it('/product -> ListAllNames', async () => {
        const result = await axios.get(`${baseUrl}/product/names`);
        const dados = result.data
        const statusCode = result.status
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })

    it('/product -> get - listar por id', async () => {
        const id = 1
        const result = await axios.get(`${baseUrl}/product/${id}`);
        const statusCode = result.status

        assert.deepEqual(statusCode, 200)
        assert.deepEqual(result.data._id, id)
    })
    it('/product -> get - retrnar not found caso nao encontre', async () => {
        try {
            const id = 200000
            const result = await axios.get(`${baseUrl}/product/${id}`);
            assert.deepEqual(result.statusCode, 404)
        } catch (error) {

            assert.ok(error.response.status === 404)
        }
    })
    it('Lista products, deve falhar ao passar type errado de Limit', async () => {
        try {
            const _LIMIT_ERRADO = 'aaaaa'
            const result = await axios.get(`${baseUrl}/product?skip=0&limit=${_LIMIT_ERRADO}`);
            assert.deepEqual(result.data.statusCode, 400)
        } catch (error) {
            console.log(error.data)
            assert.deepEqual(error.response.status, 400)
        }
    })
    it('Lista products, filtra por nome', async () => {
        const NOME = 'EST'
        const result = await axios.get(`${baseUrl}/product?skip=0&limit=10&nome=${NOME}`);
        assert.ok(Array.isArray(result.data))
    })

    it('Lista products, filtra por valor', async () => {
        const valor = '190'
        const result = await axios.get(`${baseUrl}/product?skip=0&limit=10&valor=${valor}`);
        //console.log(result.data)
        //const statusCode = result.statusCode
        //const got = result.data[0].cpf
        //assert.deepEqual(got, CPF)
        assert.ok(Array.isArray(result.data))
    })
    it('Lista products, deve retornar 3 resgistros', async () => {
        const _TAMANHO_LIMITE = 3
        const result = await axios.get(`${baseUrl}/product?skip=0&limit=${_TAMANHO_LIMITE}`);
        const dados = result.data
        const statusCode = result.statusCode
        assert.deepEqual(dados.length, _TAMANHO_LIMITE)
    })


    it('Atualizar product- PATCH products', async () => {
        try {
            const expected = {
                nome: MOCK.nome + " " + Math.floor(Math.random() * 101) + ' (Atualizado)'
            }
            const result = await axios.put(`${baseUrl}/product/${MOCK._id}`, expected);
            //console.log(result.status)
            const statusCode = result.status
            if (statusCode === 200)
                MOCK.nome = expected.nome
            assert.deepEqual(statusCode,200)
            assert.deepEqual(result.data.message, "Updated!")

        } catch (error) {
            console.log(error)

        }
    })
    
    it('PUT product -> 303 must fail at same changes ', async () => {
        try {
            const body = {nome:MOCK.nome}
            await axios.put(`${baseUrl}/product/${MOCK._id}`, body);
            assert.ok(false)

        } catch (error) {
            //console.log(Object.keys(error.response.data.message))
            const statusCode = error.response.status
            assert.deepEqual(statusCode, 303)
            assert.deepEqual(error.response.data.message, "Nothing changed!")

        }
    })

    it('PUT product -> nao deve atualizar id inesistente', async () => {
        try {
            const body = {nome:MOCK.nome+"1"}
            await axios.put(`${baseUrl}/product/10000000000`, body);
            assert.ok(false)

        } catch (error) {
            //console.log(Object.keys(error.response.data.message))
            const statusCode = error.response.status
            assert.deepEqual(statusCode, 404)
            assert.deepEqual(error.response.data.message, "Not Found")

        }
        
    })

    it('Remover product- deve falhar', async () => {
        try {
            const result = await axios.delete(`${baseUrl}/product`);
        } catch (fail) {
            const statusCode = fail.response.status
            assert.deepEqual(statusCode, 404)
        }
    })

    it('Remover product- DELETE products', async () => {
        const result = await axios.delete(`${baseUrl}/product/${lastOne._id}`);
        const message = result.data.message
        assert.deepEqual(message, "Product Removed!")
    })
})
