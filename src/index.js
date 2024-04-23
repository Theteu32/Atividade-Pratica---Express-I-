import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

let listaDeCarros = [];
let idteste = 1

app.post('/carros', (req, res)=> {
    const modelo = req.body.modelo
    const marca = req.body.marca
    const ano = req.body.ano
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

    let carro = {
        id : idteste,
        modelo : modelo,
        marca : marca,
        ano : ano,
        cor : cor,
        preco : preco
    }
    listaDeCarros.push(carro)
    idteste++

    res.status(201).send(
        JSON.stringify({
        Mensagem: `carro foi adicionado: ID: ${carro.id} | Modelo: ${modelo} | Marca: ${marca} | Ano: ${ano} | Cor: ${cor} | Preço: R$${preco}`,
        data: carro,
        teste: listaDeCarros
    })
    )
})

app.get('/carros', (req, res) => {

    if(listaDeCarros.length === 0){
        res.status(404).send('Não existe nenhum carro cadastrado!')
    }

    const listadoscarros = listaDeCarros.map((carro)=> `ID: ${carro.id} | Modelo: ${carro.modelo} | Marca: ${carro.marca} | Ano: ${carro.ano} | Cor: ${carro.cor} | Preço: ${carro.preco}`)

    res.status(200).send(listadoscarros)

})

app.get('/carros/:buscarMarca', (req, res) => {

    const buscarMarca = req.body.buscarMarca;
    
    if (!buscarMarca) {
        res.status(400).send("Forneça uma marca válida para filtrar!");
    }
    
    const carroFiltrado = listaDeCarros.filter(carro => carro.marca === buscarMarca);

    // if(!carroFiltrado === buscarMarca){
    //     res.status(400).send("Marca não encontrada!")
    // }

    // res.status(200).send(carroFiltrado)
    res.status(200).send(`ID: ${carroFiltrado.id} | Modelo: ${carroFiltrado.modelo} | Cor: ${carroFiltrado.cor} | Preço: R$${carroFiltrado.preco}`)

})


app.listen(3333,()=> console.log('Servidor rodando na porta 3333'))
