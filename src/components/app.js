import React, {Component} from 'react';
import axios from 'axios';
import '../styles/app.css';

//submission states
const NOT_SUBMITTED = 'not submitted';
const SUBMITTING = 'submitting';
const SUBMISSION_ERROR = 'submission error';
const SUBMISSION_SUCCESS = 'submission success';

export default class App extends Component {

	constructor(){
		super();
		this.state = {
			email: '',
			publicKey: '',
			reason: '',
			submissionState: NOT_SUBMITTED
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

	handleSubmit(e){
		e.preventDefault();

		//should have better vadation, but ok
		if(
			!this.state.email ||
			!this.state.publicKey ||
			!this.state.reason
		){
			alert('all inputs are required');
			this.setState({submissionState: NOT_SUBMITTED});
			return;
		}

		//actually do the submission
		const attemptSubmission = () => {
			const fields = {
				email: this.state.email.trim(),
				publicKey: this.state.publicKey.trim(),
				reason: this.state.reason.trim()
			};

			axios.post('/api/v1/new_accounts/create', fields)
			.then(res => {
				console.log(res.data);
				this.setState({submissionState: SUBMISSION_SUCCESS});
			})
			.catch(err => {
				console.log(err);
				this.setState({submissionState: SUBMISSION_ERROR});
			});
		};		

		//use callback here
		this.setState(
			{submissionState: SUBMITTING},
			attemptSubmission()
		);
	}

	render(){
		const {submissionState} = this.state;

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

		const theMessage = (message) => {
			return (
				<div className='message'>
					<h3>{message}</h3>
				</div>
			);
		};

		const theSpinner = () => {
			return (
				<div className='in_progress'>
					<p>submitting form...</p>
				</div>
			);
		};

		const renderContent = () => {
			let formState = null;
			switch(submissionState){
				case NOT_SUBMITTED:
					formState = theForm();
					break;
				case SUBMITTING:
					formState = theSpinner();
					break;
				case SUBMISSION_ERROR:
					formState = theMessage('There has been an error. Please email us at hello@telosfoundation.io');
					break;
				case SUBMISSION_SUCCESS:
					formState = theMessage('Thanks for your information.');
					break;
				default:
					formState = theForm();
					break;
			}
			return formState;
		}

		return (
			<main className='wrapper'>
				<div className='new_accounts'>
					{renderContent()}
				</div>
			</main>
		);
	}
}