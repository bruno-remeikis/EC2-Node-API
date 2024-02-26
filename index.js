const express = require('express')
const connection = require('./connection')

const app = express()
const port = 3333

app.get('/', (req, res) => res.json("API rodando na AWS!"))

app.get('/users', async (req, res) => {
    try {
        const [results] = await connection.execute('SELECT * FROM USER')
        res.json(results);
    }
    catch(err) {
        console.error(err)
        res.status(400).json(`ERRO não tratado: ${err}`)
    }
})

app.get('/create-user', async (req, res) => {
    try {
        if(!req.query.name || !req.query.email)
            res.status(400).json("ERRO: Para criar um novo usuário, informe 'name' e 'email' por query params.")

        const values = [ req.query.name, req.query.email ]

        await connection.query("INSERT INTO USER (NAME, EMAIL) VALUES (?, ?)", values);

        res.status(201).json(`Usuário '${req.query.name}' criado com sucesso!`);
    }
    catch(err) {
        console.error(err)
        res.status(400).json(`ERRO não tratado: ${err}`)
    }
})

app.get('/delete-user', async (req, res) => {
    try {
        if(!req.query.id)
            res.status(400).json("ERRO: Para deletar um usuário, informe 'id' por query params.")

        const values = [ req.query.id ]

        await connection.query("DELETE FROM USER WHERE ID = ?", values);

        res.status(201).json(`Usuário com ID ${req.query.id} deletado com sucesso!`);
    }
    catch(err) {
        console.error(err)
        res.status(400).json(`ERRO não tratado: ${err}`)
    }
})

// app.post('/teste', (res, res) =>
// {
//     const [ text ] = req.body

//     return res.json({ text });
// })

app.listen(port, () => console.log(`Listening on port ${port}...`))