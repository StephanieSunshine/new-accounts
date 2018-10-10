import React, {Component} from 'react';
import axios from 'axios';
import '../styles/app.css';

export default class App extends Component {

	constructor(){
		super();
		this.state = {
			email: '',
			publicKey: '',
			reason: '',
			formSubmitted: false
		};

		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handlePublicKeyChange = this.handlePublicKeyChange.bind(this);
		this.handleReasonChange = this.handleReasonChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChangeEmail(e){
		this.setState({email: e.target.value});
	}

	handlePublicKeyChange(e){
		this.setState({publicKey: e.target.value});
	}

	handleReasonChange(e){
		this.setState({reason: e.target.value});
	}

	componentDidMount(){

	}

	handleSubmit(e){
		e.preventDefault();

		//should have better vadation
		if(
			!this.state.email ||
			!this.state.publicKey ||
			!this.state.reason
		){
			alert('all inputs are required');
		}
		const fields = {
			email: this.state.email.trim(),
			publicKey: this.state.publicKey.trim(),
			reason: this.state.reason.trim()
		};

		axios.post('/api/v1/new_accounts/create', fields)
		.then(res => {
			console.log(res);
			this.setState({formSubmitted: true});
		})
		.catch(err => console.log(err));
	}

	render(){
		const theForm = () => {
			return (
				<form onSubmit={this.handleSubmit}>
					<input type='email' required value={this.state.email} placeholder='email (required)' onChange={this.handleChangeEmail} />
					<input type='text' required value={this.state.publicKey} placeholder='public key (required)' onChange={this.handlePublicKeyChange} />
					<textarea required value={this.state.reason} placeholder='reason for new account (required)' onChange={this.handleReasonChange} />
					<button type='submit'>Submit</button>
 				</form>
			);
		};

		const theMessage = () => {
			return (
				<div className='message'>
					<h3>Thanks for your submission.</h3>
				</div>
			);
		};

		return (
			<main className='wrapper'>
				<div className='new_accounts'>
					{ this.state.formSubmitted ? theMessage() : theForm() }
				</div>
			</main>
		);
	}
}