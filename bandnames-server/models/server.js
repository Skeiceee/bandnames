const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const Sockets = require('./sockets');
const cors = require('cors')
const { rateLimit } = require('express-rate-limit')

class Server {
     constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.server = http.createServer( this.app )
        this.io = socketio( this.server, { /** Configuración */ } )
        this.rateLimit = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
            standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
            legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        })
    }

    middlewares(){
        this.app.use( express.static( path.resolve( __dirname + '/../public' ) ) )
        this.app.use( cors() )
        this.app.use( this.rateLimit )
    }

    configurationSockets(){
        new Sockets( this.io )
    }

    execute(){
        
        this.middlewares()

        this.configurationSockets()

        this.server.listen(this.port, () => {
            console.log(`Server running on portServer running on port ${ this.port }`)
        });
    }
}

module.exports = Server