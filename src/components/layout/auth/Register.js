import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export class Register extends Component {
	constructor(props) {
		super(props);
		this.registerUser = this.registerUser.bind(this);
		this.state = {
			credentials: { username: '', email: '', password: '', password2: '' },
			redirect: null,
			errorMessage: ''
		};
		this.inputChange = this.inputChange.bind(this);
		this.registerUser = this.registerUser.bind(this);
		this.resetForm = this.resetForm.bind(this);
	}
	resetForm() {
		this.setState({ credentials: { username: '', email: '', password: '' } });
	}
	registerUser(event) {
		event.preventDefault();
		if (this.state.credentials['password'] === this.state.credentials['password2']) {
			axios
				.post('api/auth/register/', {
					username: this.state.credentials['username'],
					email: this.state.credentials['email'],
					password: this.state.credentials['password']
				})
				.then((data) => {
					console.log('Register...');
					this.resetForm();
					this.setState({ redirect: '/login' });
				})
				.catch((err) => console.log(err));
		} else {
			this.setState({
				errorMessage: 'Passwords are not matching. Please try again.'
			});
			console.log('Errrorrr');
		}
	}
	inputChange(event) {
		const cred = this.state.credentials;
		cred[event.target.name] = event.target.value;
		this.setState({ credentials: cred });
		console.log(this.state.credentials);
	}
	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />;
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col-lg-6 col-10 login-box mx-auto p-4">
						<div className="col-lg-12 login-title">REGISTER</div>
						<div className="col-lg-12 login-form">
							<div className="col-lg-12 login-form">
								<form onSubmit={(event) => this.registerUser(event)}>
									<div className="form-group">
										<label className="form-control-label">USERNAME</label>
										<input
											id="username-input"
											name="username"
											type="text"
											className="form-control p-1"
											value={this.state.credentials.username}
											onChange={(event) => this.inputChange(event)}
										/>
									</div>
									<div className="form-group">
										<label className="form-control-label">EMAIL</label>
										<input
											id="email-input"
											name="email"
											type="text"
											className="form-control p-1"
											value={this.state.credentials.email}
											onChange={(event) => this.inputChange(event)}
										/>
									</div>
									<div className="form-group">
										<label className="form-control-label">PASSWORD</label>
										<input
											name="password"
											type="password"
											className="form-control p-1"
											value={this.state.credentials.password}
											i
											onChange={(event) => this.inputChange(event)}
										/>
									</div>
									<div className="form-group">
										<label className="form-control-label">CONFIRM PASSWORD</label>
										<input
											name="password2"
											type="password"
											className="form-control p-1"
											value={this.state.credentials.password2}
											i
											onChange={(event) => this.inputChange(event)}
										/>
										<div className="text-warning">{this.state.errorMessage}</div>
									</div>
									<div className="login-btm login-button">
										<button type="submit" className="btn btn-outline-primary">
											REGISTER
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Register;
