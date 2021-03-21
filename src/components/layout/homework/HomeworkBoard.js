import React, { Component } from 'react';
import AddHomework from './AddHomework';
import HomeworkInfo from './HomeworkInfo';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import edit from '../../../images/edit.png';
import deleting from '../../../images/delete.png';
import tick from '../../../images/tick.png';

export class HomeworkBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			homework: [],
			loaded: false
		};
		this.editHomework = this.editHomework.bind(this);
		this.submitEdit = this.submitEdit.bind(this);
		this.deleteHomework = this.deleteHomework.bind(this);
		this.fetchData = this.fetchData.bind(this);
	}
	componentDidMount() {
		if (this.props.token) this.fetchData();
	}
	fetchData() {
		console.log(this.props.token);
		axios
			.get('https://classroom-django.herokuapp.com/api/homework', {
				headers: {
					Authorization: `token ${this.props.token}`
				}
			})
			.then((result) => {
				this.setState(() => {
					return {
						homework: result.data,
						loaded: true
					};
				});
			})
			.catch((err) => console.log('Fetching failed: ' + err));
	}
	editHomework(homework) {
		axios
			.put(
				`https://classroom-django.herokuapp.com/api/homework/${homework.id}/`,
				{
					title: homework.title,
					description: homework.description,
					due_date: homework.due_date,
					is_editing: !homework.is_editing
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
	submitEdit(homework) {
		let title = document.querySelector(`#edit-title-${homework.id}`).value;
		let description = document.querySelector(`#edit-description-${homework.id}`).value;
		let due_date = document.querySelector(`#edit-due-date-${homework.id}`).value;

		axios
			.put(
				`https://classroom-django.herokuapp.com/api/homework/${homework.id}/`,
				{
					title: title,
					description: description,
					due_date: due_date,
					is_editing: !homework.is_editing
				},
				{
					headers: {
						Authorization: `token ${this.props.token}`
					}
				}
			)
			.then(() => {
				console.log('Homework edited...');
				this.fetchData();
			})
			.catch((err) => console.log(err));
	}
	deleteHomework(id) {
		axios
			.delete(`https://classroom-django.herokuapp.com/api/homework/${id}`, {
				headers: {
					Authorization: `token ${this.props.token}`
				}
			})
			.then(() => {
				console.log('Homework deleted...');
				this.fetchData();
			})
			.catch((err) => console.log(err));
	}
	render() {
		return (
			<div style={{ borderRadius: '25px' }} className="homework-board col p-3 border shadow overflow-auto">
				<h4 className="fs-5">Homework</h4>
				{this.props.token ? <AddHomework token={this.props.token} rerenderList={this.fetchData} /> : <div />}
				{this.state.loaded ? (
					<ul className="p-0 list-group">
						{this.state.homework.slice(0).reverse().map((homework) => {
							return (
								<li
									className="list-group-item d-flex justify-content-between align-items-center px-2 py-1"
									key={homework.id}
									onDelete={this.fetchData}
								>
									<HomeworkInfo token={this.props.token} homework={homework} />
									<div style={{ width: '15%' }} className="btn-group pl-1" role="group">
										{homework.is_editing ? (
											<Button
												type="button"
												className="w-50 d-flex justify-content-center align-items-center btn btn-dark bg-dark"
												onClick={() => this.submitEdit(homework)}
											>
												<img style={{ filter: 'invert(1)' }} width="15px" height="15px" src={tick} alt="editLogo" />
											</Button>
										) : (
											<Button
												type="button"
												className="w-50 d-flex justify-content-center align-items-center btn btn-dark bg-dark"
												onClick={() => this.editHomework(homework)}
											>
												<img style={{ filter: 'invert(1)' }} width="15px" height="15px" src={edit} alt="editLogo" />
											</Button>
										)}
										<Button
											type="button"
											className="w-50 d-flex justify-content-center align-items-center btn btn-danger"
											onClick={() => this.deleteHomework(homework.id)}
										>
											<img style={{ filter: 'invert(1)' }} width="15px" height="15px" src={deleting} alt="deleteLogo" />
										</Button>
									</div>
								</li>
							);
						})}
					</ul>
				) : (
					<div>
						{' '}
						<p className="text-secondary">Please login to use the app</p>{' '}
					</div>
				)}
			</div>
		);
	}
}

export default HomeworkBoard;
