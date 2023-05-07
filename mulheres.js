const express = require('express') // aqui estou inciando o express
const router = express.Router() // aqui estou configurando a primeira parte da rota
const cors = require('cors') //trazendo o pacote cors que permite consumir a api no frontend
const conectaBancoDeDados = require('./bancoDeDados')//aqui estou ligando ao arquivo bancoDeDados
conectaBancoDeDados()//chamando a função que conecta o banco de dados


const Mulher = require('./mulherModel')
const app = express() //iniciando app
app.use(express.json())
app.use(cors())
const porta = 3333; //criando a porta

//GET
async function mostrarMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()
        response.json(mulheresVindasDoBancoDeDados)
    } catch (erro) {
        console.log(erro)
    }
}

//POST
async function criarMulher(request, response) {
    //const recebe um objeto - por isso a chaves no início
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })
    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log(erro)
    }


}

//PATCH
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)

        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }

        if (request.body.minibio) {
            mulherEncontrada.nome = request.body.minibio
        }

        if (request.body.imagem) {
            mulherEncontrada.nome = request.body.imagem
        }

        if (request.body.citacao) {
            mulherEncontrada = request.body.citacao
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
        response.json(mulherAtualizadaNoBancoDeDados)

    } catch (erro) {
        console.log(erro)
    }

}

//DELETE
async function deletaMulher(request, response) {
try{
    await Mulher.findByIdAndDelete(request.params.id)
    response.json({
        mensagem:'Mulher deletada com sucesso!'
    })

}catch(erro){
    console.log(erro)
}


}

//porta
function mostraPorta() {
    console.log('Servidor criado e rodando na porta', porta)
}


app.use(router.get('/mulheres', mostrarMulheres)) //configurei rota GET /mulheres
app.use(router.post('/mulheres', criarMulher)) //configurei rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher))// configurei a rota PATCH /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher))//configurei rota DELETE /mulheres/:id

app.listen(porta, mostraPorta) //servidor ouvindo a porta