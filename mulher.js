const express = require('express')
const router = express.Router()

const app = express()

const porta = 3333; 
function mostrarMulher(request, response){
    response.json({
        nome: 'Bárbara Alves',
        Imagem: 'https://media.licdn.com/dms/image/C4D03AQEp1q3xamCnLQ/profile-displayphoto-shrink_400_400/0/1660153271047?e=1689206400&v=beta&t=ovpiy5Z_G1mloBWsGu-2jBFtCQ35bGntAcKSaaqljHg',
        minibio: 'Desenvolvedora'
    })
}

function mostraPorta(){
    console.log('Servidor criado e rodando na porta', porta)
}
app.use(router.get('/mulher', mostrarMulher))
app.listen(porta, mostraPorta) 