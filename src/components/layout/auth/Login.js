import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export class Login extends Component {
	constructor(props) {
		super(props);
		this.loginUser = this.loginUser.bind(this);
		this.state = {
			credentials: { username: '', password: '' },
			redirect: null
		};
		this.inputChange = this.inputChange.bind(this);
		this.loginUser = this.loginUser.bind(this);
		this.resetForm = this.resetForm.bind(this);
	}
	resetForm() {
		this.setState({ credentials: { username: '', password: '' } });
	}
	loginUser(event) {
		event.preventDefault();
		axios
			.post('api/auth/login/', {
				username: this.state.credentials['username'],
				password: this.state.credentials['password']
			})
			.then((result) => {
				console.log('Logging in...');
				this.props.userLogin(result.data);
				this.resetForm();
				this.setState({ redirect: '/' });
			})
			.catch((err) => console.log(err));
	}
	inputChange(event) {
		let cred = this.state.credentials;
		cred[event.target.name] = event.target.value;
		this.setState({ credentials: cred });
	}
	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />;
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col-10 col-lg-6 login-box mx-auto p-4">
						<div className="col-lg-12 login-title">LOGIN</div>
						<div className="col-lg-12 login-form">
							<div className="col-lg-12 login-form">
								<form onSubmit={(event) => this.loginUser(event)}>
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
									<div className="login-btm login-button">
										<button type="submit" className="btn btn-outline-primary">
											LOGIN
										</button>
									</div>
								</form>
							</div>
						</div>
						<div className="col-lg-3 col-md-2" />
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
