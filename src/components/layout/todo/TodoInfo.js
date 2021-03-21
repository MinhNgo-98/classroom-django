import React, { Component } from 'react';
import axios from 'axios';

export class TodoInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todo: this.props.todo,
			completed: this.props.todo.completed,
			due_date: this.props.todo.due_date
		};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange() {
		axios
			.put(
				`https://classroom-django.herokuapp.com/api/todo/${this.state.todo.id}/`,
				{
					title: this.state.todo.title,
					description: this.state.todo.description,
					due_date: this.state.todo.due_date,
					completed: !this.state.todo.completed
				},
				{
					headers: {
						Authorization: `token ${this.props.token}`
					}
				}
			)
			.then(() => {
				console.log('Todo checked/unchecked...');
				this.setState({ completed: !this.state.completed });
			})
			.catch((err) => console.log(err));
	}
	componentWillReceiveProps({ todo }) {
		this.setState({ ...this.state, todo });
	}
	render() {
		return (
			<div
				style={{ width: '85%' }}
				className="form-check mx-1 p-0 h-100 mb-0 d-flex align-items-center position-relative"
			>
				<hr
					className="w-100 position-absolute"
					style={{
						height: 1,
						backgroundColor: '#000',
						display: this.state.completed ? '' : 'none',
						opacity: 1
					}}
				/>
				<div className="d-flex justify-content-center align-items-center" style={{ width: '5%' }}>
					<input
						className="form-check-input p-0 m-0 rounded-circle bg-dark border-dark"
						type="checkbox"
						defaultChecked={this.state.todo.completed}
						onChange={this.handleChange}
					/>
				</div>
				{!this.state.todo.is_editing ? (
					<div className="d-flex" style={{ width: '95%' }} id="todo-info">
						<div className="d-flex align-items-center p-1 mb-0">
							<p style={{ fontSize: 14 }} className="mb-0">
								{this.state.todo.description}
							</p>
						</div>
					</div>
				) : (
					<div className="d-flex" style={{ width: '95%' }} id="todo-info">
						<div className="d-flex align-items-center w-100 pr-0 mb-0">
							<input
								type="text"
								id={`edit-description-${this.state.todo.id}`}
								defaultValue={this.state.todo.description}
								className="w-100 form-control p-1 h-100"
								style={{ fontSize: 12 }}
							/>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default TodoInfo;
