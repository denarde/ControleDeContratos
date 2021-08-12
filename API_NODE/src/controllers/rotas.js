const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const retornaDatabase = require('../models/datasourse')
const queries = require('../models/queries')
const db = retornaDatabase()
const dataCorrente = () => {
    const data = new Date()
    const dataFull = data.toJSON()
    const mes = dataFull.substring(5, 7)
    const ano = data.getFullYear()
    return '01/' + mes + '/' + ano
}


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

//rota home - busca todas as contas do mes corrente
router.get('/', async (req, res) => {
    console.log('-----BUSCAR------')
    
    const dataFormatada = dataCorrente()

    console.log(dataFormatada)
    db.all(queries.sqlPesquisar, dataFormatada, dataFormatada, (err, rows) => {
        try {

            json = JSON.stringify(rows)
            console.log(json)
            return res.json(json)
        } catch (erro) {
            return res.status(400).send({ error: 'Erro!' })
        }
    })



})
//rota pesquisar - busca todas as contas para o mes recebido na requisicao
router.post('/pesquisar', async (req, res) => {
    console.log('-----PESQUISAR------')
    let busca = req.body
    console.log(busca)

    db.all(queries.sqlPesquisar, data, data, (err, rows) => {
        try {

            return res.json(rows)
        } catch (erro) {
            return res.status(400).send({ error: 'Erro!' })
        }
    })

})
//rota cadastrar - cadastra conta recebida na requisicao
router.post('/cadastrar', async (req, res) => {
    console.log('-----CADASTRO------')
    try {
        let conta = req.body
        console.log(conta)
        console.log(typeof conta)
        console.log(conta.dataVencimentoContrato)

        const data = dataCorrente()


        let stmt = db.prepare(queries.sqlCadastrar)
        stmt.run(conta.nome, conta.dataPagamento, data, conta.dataVencimentoContrato, conta.isPago, conta.valorPago)
        stmt.finalize()

        return res.send('Rota cadastrar')
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Erro!' })
    }

})

//rota alterar - altera a conta recebida na requisicao
router.post('/alterar', async (req, res) => {
    console.log('-----ALTERAR------')
    try {
        const conta = req.body
        console.log(conta)

        let stmt = db.prepare(queries.sqlAlterar)
        stmt.run(conta.nome, conta.valorPago, conta.dataVencimentoContrato, conta.isPago, conta.id)
        stmt.finalize()

        return res.send('Rota alterar')
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Erro!' })
    }

})

//rota excluir - exclui a conta recebida na requisicao
router.post('/excluir', async (req, res) => {
    console.log('-----EXCLUIR------')
    try {
        const conta = req.body
        console.log(conta.id)
        let stmt = db.prepare(queries.sqlExcluir)
        stmt.run(conta.id)
        stmt.finalize()
        return res.send('Rota excluir')
    } catch (err) {
        return res.status(400).send({ error: 'Erro!' })
    }

})

//rota get - retorna as informações de resumo do mes recebido na requisicao 
router.post('/pago', async (req, res) => {
    try {
        const conta = req.body
        console.log(conta)
        let stmt = db.prepare(queries.sqlPago)
        stmt.run(conta.isPago, conta.id)
        stmt.finalize()

        return res.send('Rota pago')
    } catch (err) {
        console.log(erro)
        return res.status(400).send({ error: 'Erro!' })
    }

})


//rota resumo - resumo do mes recebido na requisicao
router.get('/resumo', async (req, res) => {
    console.log('-----RESUMO------')
    let data = dataCorrente()
    console.log(data)

    db.all(queries.sqlResumo, data, data, data, data, data, data, data, data, data, data, (err, rows) => {
        try {
            json = JSON.stringify(rows)
            console.log(json)
            return res.json(json)
        } catch (erro) {
            console.log(erro)
            return res.status(400).send({ error: 'Erro!' })
        }
    })

})

module.exports = app => app.use('/v1', router)
