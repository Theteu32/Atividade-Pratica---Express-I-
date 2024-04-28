import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'

const app = express()

app.use(cors())

app.use(express.json())

let listaDeCarros = [];
let idteste = 1;
let logins = [];
let idLogin = 1

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

app.get('/buscarMarca', (req, res) => {

    const buscarMarca = req.body.buscarMarca;
    
    if (!buscarMarca) {
        res.status(400).send("Forneça uma marca válida para filtrar!");
    }
    
    const carroFiltrado = listaDeCarros.filter(carro => carro.marca === buscarMarca);

    if(listaDeCarros.length === 0){
        res.status(404).send('Não existe nenhum carro cadastrado!')
    }
    if(carroFiltrado.length === 0){
        res.status(400).send("Marca não encontrada!")
    }

    const listaDaBusca = carroFiltrado.map((carro)=> `ID: ${carro.id} | Modelo: ${carro.modelo} | Cor: ${carro.cor} | Preço: ${carro.preco}`)

    res.status(200).json({success: true, data:listaDaBusca})
})

app.put('/carros/:idBuscado', (req,res)=> {
    const idBuscado = Number(req.params.idBuscado);

    if(!idBuscado){
        res.status(400).send(JSON.stringify({Mensagem : "Informa um Id válido"}))
    }

    const verificandoId = listaDeCarros.findIndex(listaDeCarros => listaDeCarros.id === idBuscado)

    if(verificandoId === -1){
        res.status(400).send(JSON.stringify({Mensagem : "Veículo, não encontrado. O usuário deve voltar para o menu inicial depois"}))
    }

    const corNova = req.body.corNova;
    const precoNovo = req.body.precoNovo;

    if(!corNova){
        res.status(400).send(JSON.stringify({Mensagem : "Cor inválida"}))
    }

    if(!precoNovo){
        res.status(400).send(JSON.stringify({Mensagem : "Forma do valor informado incorreto"}))
    }

    if(verificandoId != -1){
        const carro = listaDeCarros[verificandoId];
        carro.cor = corNova;
        carro.preco = precoNovo;

    }

    res.status(200).send(JSON.stringify({
        Mensagem : "Atualização feita com sucesso!",
        data : listaDeCarros 
    }))
})

app.delete('/carros/:idBuscado', (req,res) => {
    const deletandoId = Number(req.params.idBuscado);

    if(!deletandoId){
        res.status(400).send(JSON.stringify({Mensagem : "Informa um Id válido"}))
    }

    const idExiste = listaDeCarros.findIndex(listaDeCarros => listaDeCarros.id === deletandoId)

    if(idExiste === -1){
        res.status(400).send(JSON.stringify({Mensagem : "Veículo, não encontrado. O usuário deve voltar para o menu inicial depois"}))
    }

    if(idExiste === -1){
        res.status(400).send(JSON.stringify({Mensagem : "Veículo, não encontrado. O usuário deve voltar para o menu inicial depois"}))
    }

    if(idExiste != -1){
        listaDeCarros.splice(idExiste, 1)
    }

    res.status(200).send(JSON.stringify({
        Mensagem:"Id deletado com sucesso!",
        data:listaDeCarros
    }))
})

app.post('/login', async (req,res) =>{
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

    if(!nome){
        res.status(400).send(JSON.stringify({Mensagem:'Nome inválido'}))
    }

    if(!email){
        res.status(400).send(JSON.stringify({Mensagem:'Email inválida'}))
    }

    if(!senha){
        res.status(400).send(JSON.stringify({Mensagem:'Senha inválida'}))
    }
    
    const verificandoEmail = logins.find((olhandoEmail)=> olhandoEmail.email === email)

    if(verificandoEmail){
        res.status(400).send(JSON.stringify({Mensagem : "Email já cadastrado, informe outro"}))
    }

    const senhaCript = await bcrypt.hash(senha, 10)

    let login ={
        id : idLogin,
        nome : nome,
        email : email,
        senha : senhaCript
    }

    logins.push(login)
    idLogin++


    res.status(200).send(JSON.stringify({Mensagem:"Login criado com sucesso"}))

})

app.get('/login', async(req,res) =>{
    const data = req.body
    const email = data.email
    const senha = data.senha

    if(!email){
        res.status(400).send(JSON.stringify({Mensagem : "Email inválido"}))
    }
    if(!senha){
        res.status(400).send(JSON.stringify({Mensagem : "Senha inválida"}))
    }

    const validEmail = logins.find((buscando) => buscando.email === email)

    const validSenha = await bcrypt.compare(senha, validEmail.senha)

    if(!validEmail){
        res.status(404).send(JSON.stringify({Mensagem:'Email não cadastrado'}))
    }

    if(!validSenha){
        res.status(404).send(JSON.stringify({Mensagem:'Senha incorreta'}))
    }

    res.status(200).send(JSON.stringify({Mensagem:"Login efetuado"}))

})

app.listen(3333,()=> console.log('Servidor rodando na porta 3333'));