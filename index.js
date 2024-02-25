const express = require('express')

const app = express()
const port = 3333

app.get('/', (req, res) =>
{
    return res.json("API rodando na AWS!")
})

// app.post('/teste', (res, res) =>
// {
//     const [ text ] = req.body

//     return res.json({ text });
// })

app.listen(port, () =>
{
    console.log(`Listening on port ${port}...`);
});