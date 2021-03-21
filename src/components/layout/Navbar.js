import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

export class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token    : '',
			username : '',
			redirect : ''
		};
		this.logoutUser = this.logoutUser.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		this.setState({token: nextProps.token, username: nextProps.username});
	}
	logoutUser = () => {
		let config = {
			method  : 'post',
			url     : 'http://127.0.0.1:8000/api/auth/logout/',
			headers : {
				Authorization : `Token ${this.state.token}`
			},
			data    : ''
		};
		console.log('State: ' + this.state.token);
		axios(config)
			.then((response) => {
				console.log(JSON.stringify(response.data));
				console.log('Logging out...');
				this.setState({token: '', username: '', redirect: '/'});
			})
			.catch(function(error){
				console.log(error);
			});
	};
	render() {
		return (
			<nav className='navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow'>
				<div className='container-fluid py-1 px-4'>
					<Link className='navbar-brand col-sm-3 col-md-2 mr-0 ' to='/'>
						Classroom
					</Link>
					{!this.state.token ? (
						<ul className='navbar-nav px-3 d-flex flex-row'>
							<li className='nav-item mr-4 text-nowrap'>
								<Link to='/login' className='nav-link'>
									Login
								</Link>
							</li>
							<li className='nav-item mr-4 text-nowrap'>
								<Link to='/register' className='nav-link'>
									Register
								</Link>
							</li>
						</ul>
					) : (
						<ul className='navbar-nav px-3 d-flex flex-row'>
							<li className='nav-item mr-4 text-nowrap'>
								<Link onClick={this.logoutUser} to='/logout' className='nav-link'>
									Logout
								</Link>
							</li>
						</ul>
					)}
				</div>
				{this.state.redirect ? <Redirect to={this.state.redirect} /> : <div />}
			</nav>
		);
	}
}

export default Navbar;
