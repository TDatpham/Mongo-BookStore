const path = require('path');
const crypto = require('crypto');
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
const { diskStorage } = require('multer')

module.exports = new function() {
    this.deploy = {
        port: 3000
    }

    this.views = {
        engine: 'ejs',
        dir: path.join(__dirname, 'views')
    }

    this.static = {
        dir: path.join(__dirname, 'assets')
    }

    this.thumbnails = {
        dir: path.join(__dirname, 'thumbnails')
    }

    this.upload = {
        storage: diskStorage({
            destination: (req, file, callback) => callback(null, this.thumbnails.dir),
            filename: (req, file, callback) => callback(null, `${Date.now()}-${file.originalname}`)
        })
    }

    this.db = {
        uri: process.env.SHOP_DB_URI || 'mongodb+srv://phamthanhdat2003vl1:root@cluster0.bownw.mongodb.net/online-shop?retryWrites=true&w=majority&appName=Cluster0'
    }

    this.session = {
        secret: crypto.randomBytes(20).toString('hex'),
        saveUninitialized: false,
        resave: false,
        store: new SessionStore({
            uri: this.db.uri,
            collection: 'sessions'
        })
    }
}