import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

let listaDeCarros = [];

app.post('/carros', (req, res)=> {
    const modelo = req.body.modelo
    const marca = req.body.marca
    const ano = Number(req.body.ano)
    const cor =  req.body.cor
    const preco = Number(req.body.preco)

    if(!modelo){
        res.status(400).send('Modelo inválido')
    }

    if(!marca){
        res.status(400).send('Marca inválida')
    }

    if(!ano){
        res.status(400).send('Forma do ano incorreto')
    }
    if(!cor){
        res.status(400).send('Cor inválida')
    }

    if(!preco){
        res.status(400).send('Forma do valor informado incorreto')
    }

    let idteste = 1

    let carro = {
        id : idteste,
        modelo : modelo,
        marca : marca,
        ano : ano, 
        cor : cor, 
        preco : preco
    }
    listaDeCarros.push(carro)
    id++

    res.status(201).send(`
    carro foi adicionado \n
    ID: ${carro.id} | Modelo: ${modelo} | Marca: ${marca} | Ano: ${ano} | Cor: ${cor} | Preço: R$${preco}`)
})
app.listen(3333,()=> console.log('Servidor rodando na porta 3333'))
