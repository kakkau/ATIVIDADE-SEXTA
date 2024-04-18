const express = require('express')
const router = express.Router()

let listapessoas = [
    {
        id: 1,
        nome: "João",
        idade: 20,
        email: "joão@email.com",
        telefone: "61900010002"
    }
]

function validarpessoa(req, res, next) {
    const id = req.params.id
    const pessoa = listapessoas.find(pessoa => pessoa.id == id)
    if (pessoa) {
        req.pessoa = pessoa
        next()
    } else {
        return res.status(404).json({ mensagem: "pessoa não encontrado!" })
    }
}

// validar
function validarAtributos(req, res, next) {
    const dadosRecebidos = req.body
    if (!dadosRecebidos.nome || !dadosRecebidos.idade) {
        return res.status(400).json({ mensagem: "Nome e idade são obrigatórios" })
    } else {
        next()
    }
}

router.get('/pessoas', (req, res) => {
    res.status(200).json(listapessoas)
})

// READ 
router.get('/pessoas/:id', validarpessoa, (req, res) => {
    res.json(req.pessoa)
})


// CREATE 
router.post('/pessoas', validarAtributos, (req, res) => {
    const dados = req.body

    const pessoa = {
        id: Math.round(Math.random() * 1000),
        nome: dados.nome,
        idade: dados.idade,
        email: dados.email,
        telefone: dados.telefone
    }

    listapessoas.push(pessoa)

    res.status(201).json(
        {
            mensagem: "pessoa cadastrado com sucesso!",
            pessoa
        }
    )
})

// UPDATE 
router.put('/pessoas/:id', validarAtributos, validarpessoa, (req, res) => {
    const id = req.params.id
    const novosDados = req.body

    const index = listapessoas.findIndex(pessoa => pessoa.id == id)
    
    const pessoa = {
        id: Number(id),
        nome: novosDados.nome,
        idade: novosDados.idade,
        email: novosDados.email,
        telefone: novosDados.telefone
    }

    listapessoas[index] = pessoa

    res.status(200).json(
        {
            mensagem: "pessoa alterado com sucesso!",
            pessoa
        }
    )
})

// DELETE 
router.delete('/pessoas/:id', validarpessoa, (req, res) => {
    const id = req.params.id
    const index = listapessoas.findIndex(pessoa => pessoa.id == id)
    listapessoas.splice(index, 1)
    res.status(200).json({ mensagem: "pessoa excluido sucesso!" })
})




module.exports = router