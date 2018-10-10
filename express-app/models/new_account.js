const mongoose = require('mongoose');
const Promise = require('bluebird');
const connStr = process.env.MONGO_ENDPOINT;

mongoose.Promise = Promise;
mongoose.connect(connStr, {useNewUrlParser: true});

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error'));

const newAccountSchema = mongoose.Schema({
	email: {type: String, required: true},
	publicKey: {type: String, required: true},
	reason: {type: String, required: true}
});

module.exports = mongoose.model('NewAccount', newAccountSchema);