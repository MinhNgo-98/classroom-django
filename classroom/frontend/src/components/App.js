import React, {Component, Fragment} from 'react';
import {render} from 'react-dom';
import Overview from './Overview';
import Members from './Members';
import Sidebar from './layout/Sidebar';
import Navbar from './layout/Navbar';
import Login from './layout/auth/Login';
import Register from './layout/auth/Register';
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username : '',
			token    : ''
		};
		this.userLogin = this.userLogin.bind(this);
	}
	userLogin(data) {
		this.setState({username: data.username, token: data.token});
		this.forceUpdate();
	}
	render() {
		return (
			<Fragment>
				<Router>
					<Route>
						<Navbar username={this.state.username} token={this.state.token} />
					</Route>
					<div className='container-fluid h-100'>
						<div className='d-flex h-100'>
							<Sidebar />
							<Route exact path='/'>
								<Overview token={this.state.token} />
							</Route>
							<Route path='/members'>
								<Members token={this.state.token} />
							</Route>
							<Route path='/login'>
								<Login userLogin={this.userLogin} />
							</Route>
							<Route path='/register'>
								<Register />
							</Route>
						</div>
					</div>
				</Router>
			</Fragment>
		);
	}
}

const appDiv = document.querySelector('#root');
render(<App />, appDiv);

