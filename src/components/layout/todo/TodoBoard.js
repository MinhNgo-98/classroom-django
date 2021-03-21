import React, { Component } from 'react';
import AddTodo from './AddTodo';
import TodoInfo from './TodoInfo';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import edit from '../../../images/edit.png';
import deleting from '../../../images/delete.png';
import tick from '../../../images/tick.png';

export class TodoBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todo: [],
			loaded: false
		};
		this.editTodo = this.editTodo.bind(this);
		this.submitEdit = this.submitEdit.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);
		this.fetchData = this.fetchData.bind(this);
	}
	componentDidMount() {
		if (this.props.token) this.fetchData();
	}
	fetchData() {
		console.log(this.props.token);
		axios
			.get('api/todo', {
				headers: {
					Authorization: `token ${this.props.token}`
				}
			})
			.then((result) => {
				this.setState(() => {
					return {
						todo: result.data,
						loaded: true
					};
				});
			})
			.catch((err) => console.log('Fetching failed: ' + err));
	}
	editTodo(todo) {
		axios
			.put(
				`api/todo/${todo.id}/`,
				{
					description: todo.description,
					is_editing: !todo.is_editing
				},
				{
					headers: {
						Authorization: `token ${this.props.token}`
					}
				}
			)
			.then(() => {
				console.log('Editing...');
				this.fetchData();
			})
			.catch((err) => console.log(err));
	}
	submitEdit(todo) {
		let description = document.querySelector(`#edit-description-${todo.id}`).value;

		axios
			.put(
				`api/todo/${todo.id}/`,
				{
					description: description,
					is_editing: !todo.is_editing
				},
				{
					headers: {
						Authorization: `token ${this.props.token}`
					}
				}
			)
			.then(() => {
				console.log('todo edited...');
				this.fetchData();
			})
			.catch((err) => console.log(err));
	}
	deleteTodo(id) {
		axios
			.delete(`api/todo/${id}`, {
				headers: {
					Authorization: `token ${this.props.token}`
				}
			})
			.then(() => {
				console.log('todo deleted...');
				this.fetchData();
			})
			.catch((err) => console.log(err));
	}
	render() {
		return (
			<div style={{ borderRadius: '25px' }} className="todo-board p-3 border shadow overflow-auto">
				<h5 className="fs-5">Todo</h5>
				{this.props.token ? <AddTodo token={this.props.token} rerenderList={this.fetchData} /> : <div />}
				{this.state.loaded ? (
					<ul className="p-0 list-group">
						{this.state.todo.slice(0).reverse().map((todo) => {
							return (
								<li
									className="list-group-item d-flex justify-content-between align-items-center px-2 py-1"
									key={todo.id}
									onDelete={this.fetchData}
								>
									<TodoInfo todo={todo} token={this.props.token} />
									<div style={{ width: '15%' }} className="btn-group pl-1" role="group">
										{todo.is_editing ? (
											<Button
												type="button"
												className="w-50 d-flex justify-content-center align-items-center btn btn-dark bg-dark"
												onClick={() => this.submitEdit(todo)}
											>
												<img style={{ filter: 'invert(1)' }} width="15px" height="15px" src={tick} alt="editLogo" />
											</Button>
										) : (
											<Button
												type="button"
												className="w-50 d-flex justify-content-center align-items-center btn btn-dark bg-dark"
												onClick={() => this.editTodo(todo)}
											>
												<img style={{ filter: 'invert(1)' }} width="15px" height="15px" src={edit} alt="editLogo" />
											</Button>
										)}
										<Button
											type="button"
											className="w-50 d-flex justify-content-center align-items-center btn btn-danger"
											onClick={() => this.deleteTodo(todo.id)}
										>
											<img style={{ filter: 'invert(1)' }} width="15px" height="15px" src={deleting} alt="deleteLogo" />
										</Button>
									</div>
								</li>
							);
						})}
					</ul>
				) : (
					<div />
				)}
			</div>
		);
	}
}

export default TodoBoard;
