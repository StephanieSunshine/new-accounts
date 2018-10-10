const NewAccount = require('../models/new_account');

exports.addNewAccount = (new_account) => {
	const newAcct = new NewAccount(new_account);
	return newAcct.save();
};

exports.getNewAccounts = () => {
	return NewAccount.find({}, (err, result) => {
		if(err) return err;
		return result;
	});
};