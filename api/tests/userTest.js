const assert = require('assert').strict
const mongoDb = require('../src/database/mongoDb')
const userSchema = require('../src/database/schemas/userSchema')
//const Context = require('../database/strategies/base/contextStrategy')

const api = require('../index')

const axios = require('axios');

let baseUrl = "http://127.0.0.1:5000";

var MOCK = {
    _id: 1,
    type:"admin",
    name: 'Renata Emiko Kaibara',
    cpf: '292.237.008-92',
    fones: [16997696789, 1633729897],
    info: 'EMi',
    email: 'ekikacal@gmail.com',
    defaultAddress:0,
    addresses: [
    {
        cep: '13560-640',
        logradouro: 'rua 7 de setembro',
        numero: "1648",
        bairro: 'Centro',
        cidade: 'São Carlos',
        uf: 'SP'
    }]
};
let lastId = 0
describe('MongoDB Suite de testes', function () {
    this.beforeAll(async () => {
        const connection = await mongoDb.connect()
        context = new mongoDb(connection, userSchema)
    })
    it('verificar conexao', async () => {
        const result = await context.isConnected()
        const expected = 'Connected'
        assert.deepEqual(result, expected)
    })


    it('getLastID', async function () {
        const gotId = await context.lastId()
        assert.notDeepEqual(gotId._id, undefined)
    })

    it('Cadastrar User', async function () {
        const resultado = await context.create(MOCK)
        const gotId = await context.lastId()
        lastId = gotId._id

        assert.ok(resultado._id === lastId)
    })
    
    it('Listar User', async function () {
        MOCK._id = lastId
        const [result] = await context.read({ _id: MOCK._id }, 0, 10)

        assert.ok(result._id == lastId)
    })

    it('Atualizar User', async () => {
        var rand = Math.random()
        const result = await context.update(lastId, {
            name: MOCK.name + rand.toString()
        })
        assert.deepEqual(result.nModified, 1)
    })
    it('Remover User', async () => {
        if (!lastId)
            console.log('Não pode exluir id=0')

        const result = await context.delete(lastId)
        assert.deepEqual(result.n, 1)
    })
})


let app = {}
let lastOne = {}
describe.only('User Routes', function () {
    this.beforeAll(async () => {
        app = api
    })

    it('/User -> lastID', async () => {
        const result = await axios.get(`${baseUrl}/User/lastid`);
        lastOne._id = result.data._id
        const statusCode = result.status
        assert.deepEqual(statusCode, 200)
        assert.ok(!isNaN(result.data._id))
    })
    it('POST User: /User', async function () {
        let expectedId = lastOne._id + 1

        const result = await axios.post(`${baseUrl}/User/`, MOCK);
        const msg = result.data.message
        const statusCode = result.status
        assert.deepEqual(statusCode, 200)
        assert.deepEqual(result.data._id, expectedId)
        assert.deepEqual(msg, 'Sucess!')

    })

    it('User POST fail: /User', async function () {
        try {
            let faible = MOCK
            faible.name = ""
            const result = await axios.post(`${baseUrl}/User/`, faible);
        } catch (error) {
            assert.deepEqual(error.response.status, 400)
        }

    })
    it('/User -> last', async () => {
        const result = await axios.get(`${baseUrl}/User/last`);
        lastOne = result.data
        const lastId = lastOne._id
        const statusCode = result.status
        assert.deepEqual(statusCode, 200)
        assert.ok(!isNaN(lastId))
    })

    it('/User -> http get - listar', async () => {
        const result = await axios.get(`${baseUrl}/User?skip=0&limit=10`);
        const statusCode = result.status
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(result.data))
    })



    it('/User -> ListAllNames', async () => {
        const result = await axios.get(`${baseUrl}/User/names`);
        const dados = result.data
        const statusCode = result.status
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })

    it('/User -> get - listar por id', async () => {
        const id = 1
        const result = await axios.get(`${baseUrl}/User/${id}`);
        const statusCode = result.status

        assert.deepEqual(statusCode, 200)
        assert.deepEqual(result.data._id, id)
    })
    it('/User -> get - retrnar not found caso nao encontre', async () => {
        try {
            const id = 200000
            const result = await axios.get(`${baseUrl}/User/${id}`);
            assert.deepEqual(result.statusCode, 404)
        } catch (error) {

            assert.ok(error.response.status === 404)
        }
    })
    it('Lista Users, deve falhar ao passar type errado de Limit', async () => {
        try {
            const _LIMIT_ERRADO = 'aaaaa'
            const result = await axios.get(`${baseUrl}/User?skip=0&limit=${_LIMIT_ERRADO}`);
            assert.deepEqual(result.data.statusCode, 400)
        } catch (error) {
            console.log(error.data)
            assert.deepEqual(error.response.status, 400)
        }
    })
    it('Lista Users, filtra por nome', async () => {
        const NOME = 'ich'
        const result = await axios.get(`${baseUrl}/User?skip=0&limit=10&name=${NOME}`);
        assert.ok(Array.isArray(result.data))
    })

    it('Lista Users, filtra por CPF', async () => {
        const CPF = '326.972.218-40'
        const result = await axios.get(`${baseUrl}/User?skip=0&limit=10&cpf=${CPF}`);
        //console.log(result.data)
        //const statusCode = result.statusCode
        const got = result.data[0].cpf
        assert.deepEqual(got, CPF)
        //assert.ok(Array.isArray(dados))
    })
    it.skip('Lista Users, deve retornar 3 resgistros', async () => {
        const _TAMANHO_LIMITE = 3
        const result = await axios.get(`${baseUrl}/User?skip=0&limit=${_TAMANHO_LIMITE}`);
        const dados = result.data
        const statusCode = result.statusCode
        assert.deepEqual(dados.length, _TAMANHO_LIMITE)
    })


    it('Atualizar User- PATCH Users', async () => {
        try {
            const expected = {
                nome: MOCK.nome + " " + Math.floor(Math.random() * 101) + ' (Atualizado)'
            }
            const result = await axios.put(`${baseUrl}/User/${MOCK._id}`, expected);
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
    
    it('PUT User -> 303 must fail at same changes ', async () => {
        try {
            const body = {nome:MOCK.nome}
            await axios.put(`${baseUrl}/User/${MOCK._id}`, body);
            assert.ok(false)

        } catch (error) {
            //console.log(Object.keys(error.response.data.message))
            const statusCode = error.response.status
            assert.deepEqual(statusCode, 303)
            assert.deepEqual(error.response.data.message, "Nothing changed!")

        }
    })

    it('PUT User -> nao deve atualizar id inesistente', async () => {
        try {
            const body = {nome:MOCK.nome+"1"}
            await axios.put(`${baseUrl}/User/10000000000`, body);
            assert.ok(false)

        } catch (error) {
            //console.log(Object.keys(error.response.data.message))
            const statusCode = error.response.status
            assert.deepEqual(statusCode, 404)
            assert.deepEqual(error.response.data.message, "Not Found")

        }
        
    })

    it('Remover User- deve falhar', async () => {
        try {
            const result = await axios.delete(`${baseUrl}/User`);
        } catch (fail) {
            const statusCode = fail.response.status
            assert.deepEqual(statusCode, 404)
        }
    })

    it('Remover User- DELETE Users', async () => {
        const result = await axios.delete(`${baseUrl}/User/${lastOne._id}`);
        const message = result.data.message
        assert.deepEqual(message, "user Removed!")
    })
})
