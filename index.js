const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const NewAccountController = require('./express-app/controllers/new_account_controller');

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// app.get('/api/v1/new_accounts', (req, res, next) => {
// 	res.set('Content-Type', 'text/json');
// 	NewAccountController.getNewAccounts().then(items => {
// 		if(!items){
// 			return res.status(404).send('error, new accts not found');
// 		}
// 		res.json(items.map(acct => {
// 			return {
// 				email: acct.email,
// 				publicKey: acct.publicKey
// 			};
// 		}));
// 	}).catch(err => next(err));
// });

app.post('/api/v1/new_accounts/create', (req, res, next) => {
	res.set('Content-Type', 'text/json');
	const {email, publicKey} = req.body;
	if(!email || !publicKey) return res.status(500).send('missing and input');
	NewAccountController.addNewAccount({
		email: email,
		publicKey: publicKey
	}).then(newAcct => res.json({
		email: newAcct.email,
		publicKey: newAcct.publicKey
	}))
	.catch(err => next(err));
});

app.listen(process.env.PORT || 8080);