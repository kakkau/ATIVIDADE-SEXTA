// importar express
const express = require('express')
const router = express.Router()

// criar uma lista
let listapessoas = [
    {
        id: 1,
        nome: "João",
        idade: 20,
        email: "joão@email.com",
        telefone: "61900010002"
    }
]

router.get('/pessoas', (req, res) => {
    res.json(listapessoas)
})

router.get('/pessoas/:id', (req, res) => {
    const id = req.params.id
    const pessoas = listapessoas[id]
    res.json(pessoas)
})

router.post('/pessoas', (req, res) => {
    const pessoas = req.body
    listapessoas.push(pessoas.nome)
    res.status(201).json({ mensagem: "Pessoa criado com sucesso!" })
})

router.delete('/pessoas/:id', (req, res) => {
    const id = req.params.id
    listapessoas.splice(id, 1)
    res.json({ mensagem: "Pessoa excluido com sucesso!"})
})

router.put('/pessoas/:id', (req, res) => {
    const id = req.params.id
    const pessoas = req.body
    listapessoas[id] = pessoas.nome
    res.json({ mensagem: "Pessoa atualizado com sucesso!" })
})

module.exports = router