const express = require('express')
const routes = require('./routes')
const path = require('path')

const server = express()

//setar configuração da view engine
server.set('view engine', 'ejs')

// setar a localização das views
server.set('views', path.join(__dirname, "views"))

//setar para o express o local dos arquivos estaticos
server.use(express.static('public'))

// habilita o uso do req.body nas requisições
server.use(express.urlencoded({ extend: true }))

//setar para o express as rotas da aplicação
server.use(routes)


//informar a porta de funcionamento do servidor
server.listen(3000, () => {
  console.log('server is running')
})
