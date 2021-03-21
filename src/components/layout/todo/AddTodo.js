import React, { Component } from 'react';
import axios from 'axios';
import { Button, Collapse } from 'react-bootstrap';
import plus from '../../../images/plus.png';

export class AddTodo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: '',
			open: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.postTodo = this.postTodo.bind(this);
		this.resetForm = this.resetForm.bind(this);
	}
	resetForm() {
		this.setState({
			description: ''
		});
	}
	postTodo(event) {
		event.preventDefault();
		axios
			.post(
				'http://127.0.0.1:8000/api/todo/',
				{
					description: this.state.description
				},
				{
					headers: {
						Authorization: `token ${this.props.token}`
					}
				}
			)
			.then(() => {
				console.log('Todo added...');
				this.resetForm();
				this.props.rerenderList();
				document.querySelector('#add-todo').classList.remove('show');
			})
			.catch((err) => console.log(err));
	}
	handleChange(event) {
		if (event.target.id === 'todo-title') {
			this.setState({ title: event.target.value });
		} else if (event.target.id === 'todo-description') {
			this.setState({ description: event.target.value });
		} else if (event.target.id === 'todo-due-date') {
			this.setState({ due_date: event.target.value });
		}
	}
	render() {
		const { open } = this.state;
		return (
			<div style={{ fontSize: 12 }}>
				<Button
					className="btn bg-transparent border-0 text-white mb-2 d-flex justify-content-center align-items-center p-1"
					type="button"
					onClick={() => this.setState({ open: !open })}
					aria-expanded={open}
					aria-controls="add-todo"
				>
					<img width="15px" height="15px" src={plus} alt="Add Task" />
				</Button>
				<Collapse in={this.state.open}>
					<form className="collapse mb-4" id="add-todo" onSubmit={(event) => this.postTodo(event)}>
						<div className="mb-2">
							<label for="todo-description" className="form-label">
								New Task
							</label>
							<input
								style={{ fontSize: 12 }}
								type="text"
								value={this.state.description}
								onChange={this.handleChange}
								className="form-control p-1"
								id="todo-description"
							/>
						</div>
						<Button style={{ fontSize: 12 }} type="submit" className="btn btn-dark bg-dark">
							Confirm
						</Button>
					</form>
				</Collapse>
			</div>
		);
	}
}

export default AddTodo;
