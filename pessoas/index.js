// IMPORTS
const express = require('express')

const pessoas = require('./routes/pessoas')

const app = express()
app.use(express.json())

// ROTAS
app.use(pessoas)

app.get("/", (req, res) => {
    res.send("Aplicação rodando!!!")
})

app.listen(2000, () => {
    console.log("Api rodando em http://localhost:2000")
})