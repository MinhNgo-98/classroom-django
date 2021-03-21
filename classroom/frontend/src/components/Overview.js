import React, { Component } from 'react';
import HomeworkBoard from './layout/homework/HomeworkBoard';
import TodoBoard from './layout/todo/TodoBoard';
import MembersBoard from './layout/members/MembersBoard';

export default class Home extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div id="overview-board" className="m-0 h-100 w-100 px-0 py-3">
				<TodoBoard token={this.props.token} />
				<HomeworkBoard token={this.props.token} />
				<MembersBoard token={this.props.token} />
			</div>
		);
	}
}
